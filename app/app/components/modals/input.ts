import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import type { ModalContent } from 'minbin/services/modal';

export interface ModalInputInterface {
  Args: {
    content: ModalContent;
    label: string;
    placeholder?: string;
    cancelLabel?: string;
    doneLabel?: string;
    updateValue: (value: string) => void;
  };
}

export default class ModalInput extends Component<ModalInputInterface['Args']> {
  get id() {
    return guidFor(this);
  }

  get cancelLabel() {
    return this.args.cancelLabel ?? 'Cancel';
  }

  get doneLabel() {
    return this.args.doneLabel ?? 'Done';
  }
}
