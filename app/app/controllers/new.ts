import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';
import type Transition from '@ember/routing/transition';
import type { NewRouteModel } from 'minbin/routes/new';

export default class NewController extends Controller {
  @service router!: RouterService;
  // @service store!: StoreService;

  model!: NewRouteModel;

  constructor(properties?: object) {
    super(properties);
    console.log('new controller constructor...');

    this.router.on('routeWillChange', (transition: Transition) => {
      console.log('route will change...', transition);
      if (this.model.hasDirtyAttributes) {
        // list of dirty attributes
        console.log(this.model.changedAttributes());
        // TODO: show modal
        console.log('model is dirty...');
        if (
          !confirm(
            'Your changes have not been saved. Would you like to leave this page?'
          ) &&
          !transition.to.find(
            (route) => route.name === this.router.currentRouteName
          )
        ) {
          console.log('aborting transition...');
          transition.abort();
        }
        console.log('rolling back attributes...');
        this.model.rollbackAttributes();
        transition.retry();
        // this.store.destroyRecord(this.model);
      }
    });
  }

  @action transitionTo(route: string) {
    return this.router.transitionTo(route);
  }

  @action refresh() {
    this.router.refresh();
  }

  @action savePaste({
    value,
    encrypt = false,
    burn = false
  }: {
    value: string;
    encrypt: boolean;
    burn: boolean;
  }) {
    console.log('saving paste...', value, encrypt, burn);
  }
}
