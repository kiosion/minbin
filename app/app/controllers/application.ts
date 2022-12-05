import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import type LoaderService from 'minbin/services/loader';
import type ToastService from 'minbin/services/toast';

export default class ApplicationController extends Controller {
  @service loader!: LoaderService;
  @service toast!: ToastService;

  get isLoading() {
    return this.loader.isLoading;
  }
}
