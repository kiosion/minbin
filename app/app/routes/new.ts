import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { DEFAULT_PASTE_CONTENT } from 'minbin/utils/consts';
import { encrypt, decrypt } from 'minbin/utils/crypto';
import type StoreService from '@ember-data/store';
import type RouterService from '@ember/routing/router-service';
import type Transition from '@ember/routing/transition';
import type ToastService from 'minbin/services/toast';

export type NewRouteModel = Awaited<ReturnType<NewRoute['model']>>;

export default class NewRoute extends Route {
  @service store!: StoreService;
  @service router!: RouterService;
  @service toast!: ToastService;

  queryParams = {
    from: {
      refreshModel: true
    },
    key: {
      refreshModel: true
    }
  };

  async model(
    { from, key }: { from?: string; key?: string },
    transition: Transition
  ) {
    let content = DEFAULT_PASTE_CONTENT;

    if (from) {
      const fromPaste = await this.store
        .findRecord('paste', from)
        .catch(async () => {
          transition.abort();
          this.toast.show('error', {
            message: `Paste not found: ${from}`
          });
          await this.router.transitionTo('home');
          return undefined;
        });

      if (fromPaste) {
        if (!fromPaste.encrypted) {
          content = fromPaste.content;
        } else {
          if (!key) {
            console.error(
              '[Warn] Parent paste is marked as encrypted, but no key provided. Unable to decrypt.'
            );
            this.toast.show('info', {
              message:
                'Parent paste is marked as encrypted, but no decryption key provided.'
            });
          }
          try {
            // For now this will always throw when transitioned to rather than hard loaded
            // since the model's content is mutated on decryption, but in the future
            // this should be changed to use a separate intermediary state
            content = await decrypt(fromPaste.content, key as string);
          } catch {
            content = fromPaste.content;
          }
        }
      }
    }

    const paste = this.store.createRecord('paste', {
      content,
      encrypted: false,
      burn: false
    });

    return paste;
  }

  @action reloadModel() {
    return this.router.refresh(this.router.currentRouteName);
  }

  @action async savePaste() {
    const paste = this.modelFor(this.routeName) as NewRouteModel,
      content = paste.content?.trim();

    if (!content || content === DEFAULT_PASTE_CONTENT) {
      this.toast.show('info', {
        message: 'Cannot save an empty paste.'
      });
      return;
    }

    if (paste.encrypted) {
      const { data, key } = await encrypt(paste.content);
      paste.set('content', data);

      return paste
        .save()
        .then(() => {
          this.router.transitionTo('view', paste.id, {
            queryParams: {
              key
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
