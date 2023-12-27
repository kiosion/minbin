import Modifier, { type ArgsFor } from 'ember-modifier';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';

import type Owner from '@ember/owner';

interface ResizeObserverService {
  isEnabled: boolean;
  observe: (
    element: Element,
    callback: (arg0: ResizeObserverEntry) => void
  ) => void;
  unobserve: (
    element: Element,
    callback?: (arg0: ResizeObserverEntry) => void
  ) => void;
  clear: () => void;
}

export interface DidResizeModifierSignature {
  Args: {
    positional: [];
    named: Record<string, unknown>;
  };
  Element: Element;
}

export default class DidResizeModifier extends Modifier<DidResizeModifierSignature> {
  @service declare resizeObserver: ResizeObserverService;

  callback!: () => void;
  element!: Element;

  constructor(owner: Owner, args: ArgsFor<DidResizeModifierSignature>) {
    super(owner, args);

    registerDestructor(this, () => {
      this.resizeObserver.unobserve(this.element, this.callback);
    });
  }

  // @ts-expect-error Improperly typed in ember-modifier :(
  modify(element: Element, [callback]: [(() => void) | undefined]) {
    assert(
      `did-resize expects a function as a callback, but got ${callback}`,
      typeof callback === 'function'
    );

    this.resizeObserver.observe(element, callback);
    this.resizeObserver.unobserve(this.element, this.callback);

    this.callback = callback;
    this.element = element;
  }
}
