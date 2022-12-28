import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { DEFAULT_PASTE_CONTENT } from 'minbin/utils/consts';
import { encrypt, decrypt } from 'minbin/utils/crypto';
import type StoreService from '@ember-data/store';
import type RouterService from '@ember/routing/router-service';

export type NewRouteModel = Awaited<ReturnType<NewRoute['model']>>;

export default class NewRoute extends Route {
  @service store!: StoreService;
  @service router!: RouterService;

  model() {
    const paste = this.store.createRecord('paste', {
      content: DEFAULT_PASTE_CONTENT,
      encrypted: false,
      burn: false
    });

    return paste;
  }

  @action reloadModel() {
    return this.router.refresh(this.router.currentRouteName);
  }

  @action async savePaste() {
    const paste = this.modelFor(this.routeName) as NewRouteModel;
    console.log('enc enabled:', paste.encrypted);

    if (paste.encrypted) {
      // Use util to encrypt content and get key and iv
      const { data, key, iv } = await encrypt(paste.content);
      paste.set('content', data);
      // console.log('enc data:', data, key, iv);
      // decrypt to test
      // console.log('decrypting...');
      // const decrypted = await decrypt(data, key, iv);
      // console.log('decrypted:', decrypted);

      return paste
        .save()
        .then(() => {
          this.router.transitionTo('view', paste.id, {
            queryParams: {
              key,
              iv
            }
          });
        })
        .catch((error: unknown) => {
          console.error('[Error] Failed to save paste:', error);
        });
    }

    return paste.save().then(() => {
      this.router.transitionTo('view', paste.id);
    });
  }
}
