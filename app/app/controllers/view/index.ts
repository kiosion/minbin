import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';
import type { ViewRouteModel } from 'minbin/routes/view';

export default class ViewController extends Controller {
  @service router!: RouterService;

  model!: ViewRouteModel;

  queryParams = [
    {
      key: { type: 'string' as const },
      iv: { type: 'string' as const }
    }
  ];

  @action create() {
    return this.router.transitionTo('new');
  }

  @action duplicate() {
    return this.router.transitionTo('new', {
      queryParams: { copyFrom: this.model.pasteId }
    });
  }

  @action viewRaw() {
    return this.router.transitionTo('view.raw', this.model.pasteId);
  }
}
