import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
// import { action } from '@ember/object';

export interface ActionButtonSignature {
  Args: {
    fn: () => void;
    icon: string;
    label: string;
    buttonClass?: string;
  };
}

export default class ActionButton extends Component<
  ActionButtonSignature['Args']
> {
  get id() {
    return guidFor(this);
  }

  get dashifiedLabel() {
    return this.args.label.replace(/\s/g, '-').toLowerCase();
  }

  get buttonClass() {
    return this.args.buttonClass ?? `button-${this.dashifiedLabel}`;
  }

  handleClick = () => {
    this.args.fn();
  };

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      this.handleClick();
    }
  };
}
