import { Injectable } from '@nestjs/common';
import { MarylandItemResponse } from '../responses/maryland-item.response';
import { MarylandItemDataResponse } from '../responses/maryland-item-data.response';
import { ITEM_DATA_KEYS } from '../../../../constants';

@Injectable()
export class MarylandItemMapper {
  static mapToItemDataResponse(itemData: string[]): MarylandItemDataResponse {
    const response = ITEM_DATA_KEYS.reduce((acc, key, index) => {
      acc[key] = itemData[index] || '';

      return acc;
    }, {} as MarylandItemDataResponse);

    return response;
  }

  static mapToItemResponse(itemId: string, itemData: MarylandItemDataResponse): MarylandItemResponse {
    const response = new MarylandItemResponse();

    response.itemData = itemData;
    response.itemId = itemId;

    return response;
  }
}
