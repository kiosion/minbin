import Controller from '@ember/controller';
import { service } from '@ember/service';

import type StoreService from '@ember-data/store';
import type RouterService from '@ember/routing/router-service';
import type { ViewRawRouteModel } from 'minbin/routes/view/raw';
import { tracked } from '@glimmer/tracking';

export default class ViewRawController extends Controller {
  @service declare store: StoreService;
  @service declare router: RouterService;

  @tracked declare model: ViewRawRouteModel;

  // TODO: Implement API route for raw display; Ember's not the best for this
}
