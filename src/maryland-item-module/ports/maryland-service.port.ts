import { MarylandItemDetailsType } from '../application/data/types/maryland-item-details.type';
import { MarylandItemValuesWithIdType } from '../application/data/types/maryland-item-values-with-id.type';

export interface MarylandServicePort {
  getItemByCode(code: string): Promise<MarylandItemValuesWithIdType>;
  getItemDetailsById(id: string): Promise<MarylandItemDetailsType>;
}
export const MarylandServiceType = Symbol.for('MarylandServiceType');
