import Store from '@ember-data/store';
import { service } from '@ember/service';

import type RequestService from 'minbin/services/request';

export default class extends Store {
  @service('request') declare requestManager: RequestService;
}
