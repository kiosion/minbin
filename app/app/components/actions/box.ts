import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export interface ActionsBoxSignature {
  Args: {
    mode: 'show' | 'create' | 'home';
    fns: {
      create?: () => void;
      save?: () => void;
      duplicate?: () => void;
      viewRaw?: () => void;
    };
    options?: {
      encrypted?: boolean;
      burn?: boolean;
    };
  };
}

export default class ActionsBox extends Component<ActionsBoxSignature['Args']> {
  @tracked isRaised = false;

  get mode() {
    return this.args.mode;
  }

  updateEncrypted = (value: boolean) => {
    this.args.options && (this.args.options.encrypted = value);
  };
}
