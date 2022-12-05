import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import type ToastService from 'minbin/services/toast';

export default class ToastComponent extends Component {
  @service toast!: ToastService;

  @tracked classes = '';
  @tracked isRaised = false;

  @action onClose() {
    this.classes = 'toast-wrapper__closing';
    setTimeout(() => {
      this.toast.hide();
    }, 250);
  }
}
