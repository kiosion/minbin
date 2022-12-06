import Modifier, { ArgsFor } from 'ember-modifier';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';

export interface OnFocusModifierSignature {
  Args: {
    positional: [];
    named: Record<string, unknown>;
  };
  Element: Element;
}

function teardown(ctx: OnFocusModifier) {
  const { element, handleCallback } = ctx;

  if (!element) {
    return;
  }

  element.removeEventListener('focusin', handleCallback);
  element.removeEventListener('focusout', handleCallback);
  element.removeEventListener('blur', handleCallback);
  element.removeEventListener('mouseenter', handleCallback);
  element.removeEventListener('mouseleave', handleCallback);
}

export default class OnFocusModifier extends Modifier<OnFocusModifierSignature> {
  callback!: (state: boolean) => void;
  element!: Element;

  constructor(owner: unknown, args: ArgsFor<OnFocusModifierSignature>) {
    super(owner, args);

    registerDestructor(this, teardown);
  }

  // @ts-expect-error Improperly typed in ember-modifier :(
  modify(
    element: Element,
    [callback]: [((state: boolean) => void) | undefined]
  ) {
    assert(
      `on-focus expects a function as a callback, but got ${callback}`,
      typeof callback === 'function'
    );

    this.element = element;
    this.callback = callback;

    element.addEventListener('focusin', this.handleCallback.bind(this));
    element.addEventListener('focusout', this.handleCallback.bind(this));
    element.addEventListener('blur', this.handleCallback.bind(this));
    element.addEventListener('mouseenter', this.handleCallback.bind(this));
    element.addEventListener('mouseleave', this.handleCallback.bind(this));
  }

  handleCallback(event: Event) {
    const { callback } = this;

    if (!callback) {
      return;
    }

    switch (event.type) {
      case 'focusin':
        return callback(true);
      case 'focusout':
        return callback(false);
      case 'mouseenter':
        return callback(true);
      case 'mouseleave':
        return callback(false);
      case 'blur':
        return callback(false);
    }
  }
}
