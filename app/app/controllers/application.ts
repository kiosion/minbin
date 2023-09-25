import Controller from '@ember/controller';
import breakpoints from 'minbin/breakpoints';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import type LoaderService from 'minbin/services/loader';
import type ModalService from 'minbin/services/modal';
import type ToastService from 'minbin/services/toast';
import type { ApplicationRouteModel } from 'minbin/routes/application';

export default class ApplicationController extends Controller {
  @service loader!: LoaderService;
  @service toast!: ToastService;
  @service modal!: ModalService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @service media!: any;

  @tracked declare model: ApplicationRouteModel;

  allBreakpoints: string[];

  constructor(properties: object | undefined) {
    super(properties);

    this.allBreakpoints = Object.keys(breakpoints).map((key) => `media-${key}`);

    this.setClassNames();

    this.media.on('mediaChanged', () => {
      this.setClassNames();
    });
  }

  setClassNames() {
    const body = document.querySelector('body');

    this.allBreakpoints.forEach((breakpoint) => {
      body?.classList.remove(breakpoint);
    });

    this.media.classNames?.length &&
      this.media.classNames
        .split(' ')
        .forEach((className: string) => body?.classList.add(className));
  }

  get isLoading() {
    return this.loader.isLoading;
  }
}
