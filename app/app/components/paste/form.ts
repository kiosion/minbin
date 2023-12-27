import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';
import { getLineNumbers } from 'minbin/utils/text';

export interface PasteFormSignature {
  Args:
    | {
        mode: 'show';
        paste: {
          id: string;
          title: string;
          content: string;
          encrypted: boolean;
          burn: boolean;
          views: number;
        };
        inputClass?: string;
        plaintext?: boolean;
      }
    | {
        mode: 'create';
        paste: undefined;
      };
}

export default class PasteForm extends Component<PasteFormSignature['Args']> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @service hljs!: any;

  @tracked content: string | undefined = undefined;
  @tracked isNew = false;

  redoStack: string[] = [];
  undoStack: string[] = [];

  constructor(owner: unknown, args: PasteFormSignature['Args']) {
    super(owner, args);

    this.handleUpdate();
  }

  get isCreate() {
    return this.args.mode === 'create';
  }

  get id() {
    return guidFor(this);
  }

  get wrapper() {
    return document.querySelector(`#${this.id}`) as HTMLDivElement | undefined;
  }

  get textarea() {
    return document.querySelector(`#${this.id}-content`) as
      | HTMLTextAreaElement
      | HTMLElement
      | null;
  }

  get lines() {
    return document.querySelector(`#${this.id}-lns`) as HTMLDivElement | null;
  }

  undo() {
    if (!this.undoStack.length || !this.args.paste) {
      return;
    }

    const state = this.undoStack.pop();
    this.redoStack.push(this.args.paste.content);
    this.args.paste.content = state || '';
  }

  redo() {
    if (!this.redoStack.length || !this.args.paste) {
      return;
    }

    const state = this.redoStack.pop();
    this.undoStack.push(this.args.paste.content);
    this.args.paste.content = state || '';
  }

  updateHistory(val: string) {
    this.redoStack = [];
    this.undoStack.push(val);
  }

  updateHistoryTimeout: number | undefined = undefined;

  // Handle any external updates to the model
  @action handleUpdate() {
    this.content = this.args.paste?.content ?? '';
    this.renderLineNumbers(this.lines as HTMLDivElement, this.content);
    this.isNew = this.isCreate;
  }

  @action renderLineNumbers(
    element: HTMLDivElement,
    content: string | undefined
  ) {
    if (!content || !element || !this.textarea) {
      return;
    }

    let linesArr: (string | number)[] = [];

    if (this.isCreate) {
      linesArr = getLineNumbers({
        element: this.textarea as HTMLTextAreaElement,
        mode: 'create'
      });
    } else {
      linesArr = getLineNumbers({
        element: this.textarea as HTMLElement,
        mode: 'show'
      });
    }

    element.replaceChildren();
    for (const line of linesArr) {
      const ln = document.createElement('div');
      ln.classList.add('line-number');
      if (typeof line === 'number') {
        ln.textContent = line.toString();
        ln.ariaLabel = `Line ${line}`;
      } else {
        ln.classList.add('line-number--empty');
        ln.ariaHidden = 'true';
        ln.innerText = '';
      }
      element.appendChild(ln);
    }
  }

  @action handleInput({ target, data }: InputEvent) {
    const element = target as HTMLTextAreaElement | null;

    if (!element) {
      return;
    }

    if (this.isNew) {
      const inputValue = data;
      element.value = inputValue || '';
      this.updateHistory('');
      this.isNew = false;
    }

    if (this.updateHistoryTimeout) {
      clearTimeout(this.updateHistoryTimeout);
    }

    this.updateHistoryTimeout = setTimeout(() => {
      this.updateHistory(element.value);
    }, 100);

    this.args.paste && (this.args.paste.content = element.value);
  }

  @action handleKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case 'Tab': {
        event.preventDefault();

        const element = event.target as HTMLTextAreaElement | null;

        if (!element) {
          return;
        }

        const { selectionStart, selectionEnd, value } = element,
          allLines = value.split('\n');

        let startLine = 0,
          endLine = allLines.length - 1;

        // Find the start and end lines of the selection
        for (let i = 0, pos = 0; i < allLines.length; ++i) {
          const lineLength = allLines[i]!.length + 1; // +1 for newline character

          if (selectionStart === pos + lineLength) {
            startLine = i + 1;

            if (selectionStart === selectionEnd) {
              endLine = i + 1;
              break;
            }
          } else if (
            pos <= selectionStart &&
            pos + lineLength > selectionStart
          ) {
            startLine = i;
          }

          if (pos < selectionEnd && pos + lineLength >= selectionEnd) {
            endLine = i;
            break;
          }

          pos += lineLength;
        }

        // Proccess each line for indent/unindent
        let adjustedSelectionStart = selectionStart,
          adjustedSelectionEnd = selectionEnd;

        for (let i = startLine; i <= endLine; i++) {
          if (event.shiftKey) {
            // Unindent (Shift + Tab)
            const removed = allLines[i]!.startsWith('  ')
              ? 2
              : allLines[i]!.startsWith(' ')
                ? 1
                : 0;
            allLines[i] = allLines[i]!.substring(removed);
            if (i === startLine) {
              adjustedSelectionStart -= removed;
            }
            adjustedSelectionEnd -= removed;
          } else {
            // Indent (Tab)
            // TODO: Don't indent if selection is not in whitespace at start of line
            allLines[i] = '  ' + allLines[i];
            if (i === startLine) {
              adjustedSelectionStart += 2;
            }
            adjustedSelectionEnd += 2;
          }
        }

        element.value = allLines.join('\n');

        // Adjust the selection range after indentation or unindentation
        element.setSelectionRange(adjustedSelectionStart, adjustedSelectionEnd);

        this.args.paste && (this.args.paste.content = element.value);
        this.renderLineNumbers(this.lines as HTMLDivElement, element.value);

        break;
      }
      case 'KeyZ': {
        if (!event.ctrlKey) {
          return;
        }

        event.preventDefault();

        event.shiftKey ? this.redo() : this.undo();

        break;
      }
    }
  }

  @action handlePaste() {
    // TODO: Finish
    this.renderLineNumbers(
      this.lines as HTMLDivElement,
      this.args.paste?.content ?? ''
    );
    return;
  }

  @action handleResize() {
    if (this.lines) {
      if (this.isCreate) {
        this.renderLineNumbers(
          this.lines,
          (this.textarea as HTMLTextAreaElement).value
        );
      } else {
        this.renderLineNumbers(
          this.lines,
          (this.textarea as HTMLElement)?.textContent ?? ''
        );
      }
    }
  }

  @action highlightCode() {
    if (!this.isCreate && this.textarea) {
      const result = this.hljs.highlightAuto(this.textarea.textContent);
      this.textarea.innerHTML = result?.value || this.textarea.innerHTML;
    }
  }
}
