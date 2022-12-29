import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { decrypt } from 'minbin/utils/crypto';
import type StoreService from '@ember-data/store';
import type RouterService from '@ember/routing/router-service';
import type Transition from '@ember/routing/transition';
import type ToastService from 'minbin/services/toast';

export type ViewRouteModel = Awaited<ReturnType<ViewRoute['model']>>;

export default class ViewRoute extends Route {
  @service store!: StoreService;
  @service router!: RouterService;
  @service toast!: ToastService;

  queryParams = {
    key: {
      refreshModel: true
    }
  };

  beforeModel(transition: Transition) {
    const { id } = transition.to.params;
    if (!id || id.length < 7) {
      transition.abort();
    }
  }

  async model(
    { id, key }: { id: string; key?: string },
    transition: Transition
  ) {
    const paste = await this.store.findRecord('paste', id).catch(async () => {
      transition.abort();
      this.toast.show('error', {
        message: `Paste not found: ${id}`
      });
      await this.router.transitionTo('home');
      return undefined;
    });

    let decrypted: boolean | undefined;

    if (paste.encrypted) {
      if (!key) {
        console.error(
          '[Warn] Paste is marked as encrypted, but no key provided. Unable to decrypt.'
        );
        this.toast.show('info', {
          message: 'Paste marked as encrypted, but no decryption key provided.'
        });
        decrypted = false;
        return { paste, decrypted };
      }
      try {
        const decryptedContent = await decrypt(paste.content, key /*, iv */);
        // TODO: Intermediary state for content instead of mutating model
        paste.set('content', decryptedContent);
        decrypted = true;
      } catch (err: unknown) {
        console.error('[Error] Unable to decrypt paste');
        this.toast.show('error', {
          message: 'Error while decrypting paste, malformed key provided.'
        });
        decrypted = false;
      }
    }

    return { paste, decrypted };
  }
}
