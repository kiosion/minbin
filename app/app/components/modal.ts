import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import type ModalService from 'minbin/services/modal';

export default class ModalComponent extends Component {
  @service modal!: ModalService;

  get content() {
    return this.modal.modalContent;
  }
}
