let _buffer: HTMLTextAreaElement | null = null;

type CountLinesArgs =
  | {
      element: HTMLTextAreaElement;
      mode: 'create';
    }
  | {
      element: HTMLElement;
      mode: 'show';
    };

const countLines = ({ element, mode }: CountLinesArgs) => {
  if (_buffer === null) {
    _buffer = document.createElement('textarea');
    _buffer.style.border = 'none';
    _buffer.style.height = '0';
    _buffer.style.overflow = 'hidden';
    _buffer.style.padding = '0';
    _buffer.style.position = 'absolute';
    _buffer.style.left = '0';
    _buffer.style.top = '0';
    _buffer.style.zIndex = '-1';
    _buffer.tabIndex = -1;
    _buffer.ariaHidden = 'true';
    document.body.appendChild(_buffer);
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
  _buffer.style.width = `${element.clientWidth - pl - pr}px`;

  // Copy text props
  _buffer.style.font = cs.font;
  _buffer.style.letterSpacing = cs.letterSpacing;
  _buffer.style.whiteSpace = cs.whiteSpace;
  _buffer.style.wordBreak = cs.wordBreak;
  _buffer.style.wordSpacing = cs.wordSpacing;
  _buffer.style.wordWrap = cs.wordWrap;

  // Copy value
  if (mode === 'create') {
    _buffer.value = element.value;
  } else {
    _buffer.value = element.textContent || '';
  }

  // Calculate height
  const result = Math.floor(_buffer.scrollHeight / lh);
  return result > 0 ? result : 1;
};

export { countLines };
