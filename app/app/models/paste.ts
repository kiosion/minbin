import Model, { attr } from '@ember-data/model';

export default class PasteModel extends Model {
  @attr('string') pasteId!: string | null;
  @attr('string') content!: string;
  @attr('boolean') encrypted!: boolean;
  @attr('boolean') burn!: boolean;
  @attr('number') views!: number | null;
}
