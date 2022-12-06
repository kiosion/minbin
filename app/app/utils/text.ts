let buffer: HTMLTextAreaElement | null = null;

type CountLinesArgs =
  | {
      element: HTMLTextAreaElement;
      mode: 'create';
    }
  | {
      element: HTMLElement;
      mode: 'show';
    };

const getLineNumbers = ({ element, mode }: CountLinesArgs) => {
  if (buffer === null) {
    buffer = document.createElement('textarea');
    buffer.style.border = 'none';
    buffer.style.height = '0';
    buffer.style.overflow = 'hidden';
    buffer.style.padding = '0';
    buffer.style.position = 'absolute';
    buffer.style.left = '0';
    buffer.style.top = '0';
    buffer.style.zIndex = '-1';
    buffer.tabIndex = -1;
    buffer.ariaHidden = 'true';
    (document.querySelector('.route-wrapper') ?? document.body).appendChild(
      buffer
    );
  }

  const cs = window.getComputedStyle(element),
    pl = parseInt(cs.paddingLeft),
    pr = parseInt(cs.paddingRight);
  let lh = parseInt(cs.lineHeight);

  // Line-height may be 'normal' - in this case, it's the font size
  if (isNaN(lh)) {
    lh = parseInt(cs.fontSize);
  }

  // Copy content width
  buffer.style.width = `${element.clientWidth - pl - pr}px`;

  // Copy text props
  buffer.style.font = cs.font;
  buffer.style.letterSpacing = cs.letterSpacing;
  buffer.style.whiteSpace = cs.whiteSpace;
  buffer.style.wordBreak = cs.wordBreak;
  buffer.style.wordSpacing = cs.wordSpacing;

  let lines: string[] = [];

  if (mode === 'create') {
    buffer.value = element.value ?? '';
    lines = element.value.split('\n') ?? [];
  } else {
    buffer.value = element.textContent ?? '';
    lines = element.textContent?.split('\n') ?? [];
  }

  const lineNumbers: (string | number)[] = [];

  let lineCount = 0;
  for (const line of lines) {
    lineCount += 1;
    lineNumbers.push(lineCount);

    const before = buffer.scrollHeight,
      lineIndex = buffer.value.indexOf(line);
    buffer.value =
      buffer.value.slice(0, lineIndex) +
      buffer.value.slice(lineIndex + line.length);
    const after = buffer.scrollHeight,
      diff = Math.floor((before - after) / lh);

    for (const _ of Array(diff)) {
      lineNumbers.push(' ');
    }
  }

  return lineNumbers;
};

export { getLineNumbers };
