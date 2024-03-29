import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type RouterService from '@ember/routing/router-service';
import type StoreService from '@ember-data/store';
import type Transition from '@ember/routing/transition';
import type { NewRouteModel } from 'minbin/routes/new';

export default class NewController extends Controller {
  @service declare router: RouterService;
  @service declare store: StoreService;

  @tracked declare model: NewRouteModel;

  constructor(properties?: object) {
    super(properties);

    this.router.on('routeWillChange', (transition: Transition) => {
      if (this.model.hasActualDirtyAttributes) {
        if (transition.to.name !== this.router.currentRouteName) {
          if (!confirm('Are you sure you want to leave?')) {
            return transition.abort();
          }
          this.model.rollbackAttributes();
          this.store.unloadRecord(this.model);
        }
      }
    });
  }

  transitionTo = (route: string) => {
    return this.router.transitionTo(route);
  };

  refresh = () => {
    if (this.model.hasActualDirtyAttributes) {
      if (!confirm('Are you sure you want to leave?')) {
        return;
      }
      this.router.refresh();
    }
  };

  save = () => {
    this.send('savePaste');
  };
}
