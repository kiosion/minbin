import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import type StoreService from '@ember-data/store';

export type HomeRouteModel = Awaited<ReturnType<HomeRoute['model']>>;

export default class HomeRoute extends Route {
  @service store!: StoreService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @service media!: any;

  model() {
    return {
      content: `Welcome to MinBin!

Use the button in the upper right 
to create a new paste to share with others,
or check out the github repo for more info:
https://github.com/kiosion/minbin

Servals will die if you abuse this service.
`,
      pasteId: null
    };
  }
}
