import Component from '@glimmer/component';
import { action } from '@ember/object';

export interface ActionsSwitchSignature {
  Args: {
    value: boolean;
    setValue: (value: boolean) => void;
    label: string;
    icon: string;
  };
}

export default class ActionsSwitch extends Component<
  ActionsSwitchSignature['Args']
> {
  @action handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.args.setValue(target.checked);
  }
}
