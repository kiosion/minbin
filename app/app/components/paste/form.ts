import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';
import { countLines } from 'minbin/utils/text';

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

  // Handle any external updates to the model
  @action handleUpdate() {
    this.content = this.args.paste?.content ?? '';
    this.isNew = this.isCreate;
  }

  @action renderLineNumbers(
    element: HTMLDivElement,
    content: string | undefined
  ) {
    if (!content || !element || !this.textarea) {
      return;
    }

    let lines: number | undefined;

    if (this.isCreate) {
      lines = countLines({
        element: this.textarea as HTMLTextAreaElement,
        mode: 'create'
      });
    } else {
      lines = countLines({
        element: this.textarea as HTMLElement,
        mode: 'show'
      });
    }

    element.replaceChildren();
    for (const line of Array.from(Array(lines).keys())) {
      const ln = document.createElement('div');
      ln.classList.add('line-number');
      ln.textContent = `${line + 1}`;
      element.appendChild(ln);
    }
  }

  @action handleInput({ target, data }: InputEvent) {
    const element = target as HTMLTextAreaElement;
    if (!element) {
      return;
    }
    if (this.isNew) {
      const inputValue = data;
      element.value = inputValue || '';
      this.isNew = false;
    }
    this.args.paste && (this.args.paste.content = element.value);
    this.highlightCode();
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
