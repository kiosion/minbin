import JSONSerializer from '@ember-data/serializer/json';
import type Store from '@ember-data/store';
import { NotFoundError, InvalidError } from '@ember-data/adapter/error';
// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import type { ModelSchema } from 'ember-data';

declare module 'ember-data/types/registries/serializer' {
  export default interface SerializerRegistry {
    paste: PasteSerializer;
  }
}

type ExpectedResponse =
  | {
      status: 200;
      data: {
        id: string;
        content: string;
        encrypted?: boolean;
        burn?: boolean;
        views: number;
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
      views: number;
    }
  | undefined;

export default class PasteSerializer extends JSONSerializer {
  primaryKey = 'pasteId';

  normalizeResponse(
    store: Store,
    primaryModelClass: ModelSchema<string | number>,
    payload: ExpectedResponse,
    id: string | number,
    requestType: string
  ) {
    let normalized: NormalizedResponse;

    switch (requestType) {
      case 'findRecord': {
        const { status, data, message } = payload || {};

        if (status !== 200) {
          throw new NotFoundError(message ?? 'Paste not found');
        }

        const { id, content, encrypted, burn, views } = data;
        normalized = {
          pasteId: id,
          content,
          encrypted: encrypted ?? false,
          burn: burn ?? false,
          views
        };
        break;
      }
      case 'createRecord': {
        const { status, data, message } = payload || {};

        if (status !== 200) {
          throw new InvalidError([
            message ?? 'There was an error saving the paste'
          ]);
        }

        const { id, content, encrypted, burn, views } = data as Omit<
          ExpectedResponse['data'],
          'encrypted' | 'burn'
        > & { encrypted: boolean; burn: boolean };
        normalized = {
          pasteId: id,
          content,
          encrypted,
          burn,
          views
        };
        break;
      }
    }

    return super.normalizeResponse(
      store,
      primaryModelClass,
      normalized || payload,
      id,
      requestType
    );
  }
}
