// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import RequestManager from '@ember-data/request';
import { CacheHandler } from '@ember-data/store';
import Fetch from '@ember-data/request/fetch';
import { LegacyNetworkHandler } from '@ember-data/legacy-compat';

export default class extends RequestManager {
  constructor(createArgs) {
    super(createArgs);
    this.use([LegacyNetworkHandler, Fetch]);
    this.useCache(CacheHandler);
  }
}
