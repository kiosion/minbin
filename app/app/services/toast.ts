import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

interface showProps {
  message: string;
  icon?: string;
  duration?: number;
}

export default class ToastService extends Service {
  @tracked isVisible = false;

  declare message: string;
  declare type: 'success' | 'error' | 'info';
  declare icon: string;

  @action show(type: typeof this.type, { message, icon, duration }: showProps) {
    this.isVisible = true;
    this.type = type;
    this.message = message;
    this.icon =
      icon ||
      (() => {
        switch (type) {
          case 'success':
            return 'check';
          case 'error':
            return 'exclamation-circle';
          case 'info':
            return 'info-circle';
        }
      })();

    if (duration) {
      this.setTimeout(duration);
    }
  }

  @action hide() {
    this.isVisible = false;
    this.message = '';
  }

  setTimeout(duration: number) {
    setTimeout(() => {
      this.hide();
    }, duration);
  }
}
