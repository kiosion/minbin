import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class LoaderService extends Service {
  @tracked loading = true;

  get isLoading() {
    return this.loading;
  }
  set isLoading(value: boolean) {
    this.loading = value;
  }
}
