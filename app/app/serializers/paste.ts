import JSONSerializer from '@ember-data/serializer/json';
import type Store from '@ember-data/store';
import type Model from '@ember-data/model';
import { NotFoundError } from '@ember-data/adapter/error';

type ExpectedResponse =
  | {
      status: 200;
      data: {
        id: string;
        content: string;
        encrypted?: boolean;
        burn?: boolean;
      };
      message: never;
    }
  | {
      status: 404 | 500;
      data: never;
      message: string;
    };

type NormalizedResponse =
  | {
      pasteId: string;
      content: string;
      encrypted: boolean;
      burn: boolean;
    }
  | undefined;

export default class PasteSerializer extends JSONSerializer {
  primaryKey = 'pasteId';

  normalizeResponse(
    store: Store,
    primaryModelClass: Model,
    payload: ExpectedResponse,
    id: string | number,
    requestType: string
  ) {
    console.log('normalizing response', payload);
    let normalized: NormalizedResponse;

    if (requestType === 'findRecord') {
      const { status, data, message } = payload || {};

      if (status !== 200) {
        throw new NotFoundError(message ?? 'Paste not found');
      }

      const { id, content, encrypted, burn } = data;
      normalized = {
        pasteId: id,
        content,
        encrypted: encrypted ?? false,
        burn: burn ?? false
      };
    }

    console.log('returning normalized response', normalized);

    return super.normalizeResponse(
      store,
      primaryModelClass,
      // @ts-expect-error This isnt typed right for some reason and I can't be fucked to fix it so for now I guess it's just gonna stay broken with this comment here to make the error go the fuck away
      normalized,
      id,
      requestType
    );
  }
}
