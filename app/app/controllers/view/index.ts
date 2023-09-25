import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';
import type { ViewRouteModel } from 'minbin/routes/view';
import type ToastService from 'minbin/services/toast';

export default class ViewController extends Controller {
  @service declare router: RouterService;
  @service declare toast: ToastService;

  @tracked declare model: NonNullable<ViewRouteModel>;

  queryParams = [
    {
      key: { type: ('string' as const) || ('null' as const) }
    }
  ];

  key = null;

  get paste() {
    return this.model.paste;
  }

  @action create() {
    return this.router.transitionTo('new');
  }

  @action duplicate() {
    return this.router.transitionTo('new', {
      queryParams: {
        from: this.paste.pasteId,
        key: this.paste.encrypted ? this.key : undefined
      }
    });
  }

  @action copy() {
    navigator.clipboard.writeText(this.paste.content).then(() => {
      this.toast.show('success', {
        message: 'Copied to clipboard',
        duration: 6000
      });
    });
  }
}
