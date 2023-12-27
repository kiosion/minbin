// @ts-expect-error @ember-data/request is not yet typed
import RequestManager from '@ember-data/request';
// @ts-expect-error CacheHandler is not yet typed
import { CacheHandler } from '@ember-data/store';
// @ts-expect-error @ember-data/request/fetch is not yet typed
import Fetch from '@ember-data/request/fetch';
// @ts-expect-error @ember-data/legacy-compat is not yet typed
import { LegacyNetworkHandler } from '@ember-data/legacy-compat';

export default class extends RequestManager {
  declare use: (fetchHandlers: unknown[]) => void;
  declare useCache: (cacheHandler: unknown) => void;

  constructor(createArgs: unknown) {
    super(createArgs);
    this.use([LegacyNetworkHandler, Fetch]);
    this.useCache(CacheHandler);
  }
}
