import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import type Component from '@glimmer/component';

export interface ModalContent {
  title: string;
  body: Component;
  cancel: (value: unknown) => void;
  done: (value: unknown) => void;
}

export default class ModalService extends Service {
  @tracked isShowingModal = false;

  declare modalContent: ModalContent;

  @action open(content: Omit<ModalContent, 'cancel' | 'done'>) {
    (this.modalContent as Partial<ModalContent>) = content;
    this.isShowingModal = true;
    return new Promise((resolve, reject) => {
      this.modalContent.done = (value: unknown) => {
        this.close();
        resolve(value);
      };
      this.modalContent.cancel = (value: unknown) => {
        this.close();
        reject(value);
      };
    });
  }

  @action close() {
    this.isShowingModal = false;
  }
}
