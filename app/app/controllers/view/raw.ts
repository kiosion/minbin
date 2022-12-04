import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import type StoreService from '@ember-data/store';
import type RouterService from '@ember/routing/router-service';

export default class ViewRawController extends Controller {
  @service store!: StoreService;
  @service router!: RouterService;

  // beforeModel() {

  // }
}
