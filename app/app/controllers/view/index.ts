import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';
import type { ViewRouteModel } from 'minbin/routes/view';

export default class ViewController extends Controller {
  @service router!: RouterService;

  @tracked model!: ViewRouteModel;

  queryParams = [
    {
      key: { type: 'string' as const },
      iv: { type: 'string' as const }
    }
  ];

  get paste() {
    return this.model.paste;
  }

  @action create() {
    return this.router.transitionTo('new');
  }

  @action duplicate() {
    return this.router.transitionTo('new', {
      queryParams: { from: this.paste.pasteId }
    });
  }

  @action viewRaw() {
    return this.router.transitionTo('view.raw', this.paste.pasteId);
  }
}
