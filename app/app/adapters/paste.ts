import RESTAdapter from '@ember-data/adapter/rest';
import config from 'minbin/config/environment';

export default class PasteAdapter extends RESTAdapter {
  host = config.apiHost;
  namespace = config.apiVersion;

  urlForFindRecord(id: string) {
    return [this.host, this.namespace, 'get', id].join('/');
  }

  urlForCreateRecord() {
    return [this.host, this.namespace, 'save'].join('/');
  }
}
