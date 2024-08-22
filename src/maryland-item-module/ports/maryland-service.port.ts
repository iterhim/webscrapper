export interface MarylandServicePort {
  getItemByCode(code: string);
  getItemDetailsById(id: string);
}
export const MarylandServiceType = Symbol.for('MarylandServiceType');
