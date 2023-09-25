import Model, { attr } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';
import { DEFAULT_PASTE_CONTENT } from 'minbin/utils/consts';

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    paste: PasteModel;
  }
}

export default class PasteModel extends Model {
  @attr('string') pasteId!: string | null;

  @attr('string') content!: string;

  @attr('boolean') encrypted!: boolean;

  @attr('boolean') burn!: boolean;

  @attr('number') views!: number | null;

  @tracked _decrypted = false;

  get decrypted() {
    return this.encrypted && this._decrypted;
  }
  set decrypted(value: boolean) {
    this._decrypted = value;
  }

  get hasDefaultContent() {
    return this.content === DEFAULT_PASTE_CONTENT;
  }

  get hasActualDirtyAttributes() {
    const changedAttributes = this.changedAttributes();

    if (!changedAttributes) {
      return false;
    }
    if (changedAttributes?.['burn']) {
      if (
        changedAttributes['burn'][0] === undefined &&
        changedAttributes['burn'][1] !== false
      ) {
        return true;
      }
    }
    if (changedAttributes?.['encrypted']) {
      if (
        changedAttributes['encrypted'][0] === undefined &&
        changedAttributes['encrypted'][1] !== false
      ) {
        return true;
      }
    }
    if (changedAttributes?.['content']) {
      if (
        changedAttributes['content'][0] === undefined &&
        changedAttributes['content'][1] !== DEFAULT_PASTE_CONTENT
      ) {
        return true;
      }
    }
    return false;
  }
}
