import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { HOMEPAGE_CONTENT } from 'minbin/utils/consts';

import type StoreService from '@ember-data/store';

export type HomeRouteModel = Awaited<ReturnType<HomeRoute['model']>>;

export default class HomeRoute extends Route {
  @service store!: StoreService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @service media!: any;

  model() {
    return {
      content: HOMEPAGE_CONTENT,
      pasteId: null
    };
  }
}
