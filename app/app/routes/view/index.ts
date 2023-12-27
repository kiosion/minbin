import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { decrypt } from 'minbin/utils/crypto';

import type StoreService from '@ember-data/store';
import type RouterService from '@ember/routing/router-service';
import type Transition from '@ember/routing/transition';
import type ToastService from 'minbin/services/toast';
import type ViewController from 'minbin/controllers/view';

export type ViewRouteModel = Awaited<ReturnType<ViewRoute['model']>>;

export default class ViewRoute extends Route {
  @service declare store: StoreService;
  @service declare router: RouterService;
  @service declare toast: ToastService;

  declare controller: ViewController;

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

  async notFound(transition: Transition, id: string) {
    transition.abort();
    this.toast.show('error', {
      message: `Paste not found: ${id}`
    });
    await this.router.transitionTo('home');
    return undefined;
  }

  async model(
    { id, key }: { id: string; key?: string },
    transition: Transition
  ) {
    const paste = await this.store
      .findRecord('paste', id)
      .catch(() => undefined);

    if (!paste) {
      return await this.notFound(transition, id);
    }

    if (paste.encrypted && !paste.decrypted) {
      if (!key) {
        console.error(
          '[Warn] Paste is marked as encrypted, but no key provided. Unable to decrypt.'
        );
        this.toast.show('info', {
          message: 'Paste marked as encrypted, but no decryption key provided.'
        });
        paste.decrypted = false;
        return { paste };
      }
      try {
        const decryptedContent = await decrypt(paste.content, key /*, iv */);
        // TODO: Intermediary state for content instead of mutating model
        paste.content = decryptedContent;
        paste.decrypted = true;
      } catch (err: unknown) {
        console.error('[Error] Unable to decrypt paste');
        this.toast.show('error', {
          message: 'Error while decrypting paste, malformed key provided.'
        });
        paste.decrypted = false;
      }
    }

    return { paste };
  }
}
