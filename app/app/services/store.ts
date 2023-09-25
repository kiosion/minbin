import Store from '@ember-data/store';
import { service } from '@ember/service';

import type RequestService from 'minbin/services/request';

export default class extends Store {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @service('request') declare requestManager: RequestService;
}
