import { Injectable } from '@nestjs/common';
import { MarylandItemResponse } from '../responses/maryland-item.response';
import { MarylandItemDataResponse } from '../responses/maryland-item-data.response';
import { ITEM_DATA_KEYS } from '../../../../constants';
import { MarylandItemDetailsType } from '../types/maryland-item-details.type';
import { MarylandItemDetailsResponse } from '../responses/maryland-item-details.response';

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

  static mapToItemDetailsResponse(data: MarylandItemDetailsType): MarylandItemDetailsResponse {
    const response = new MarylandItemDetailsResponse();

    response.solicitationSummary = data.solicitationSummary;
    response.attachments = data.attachments;

    return response;
  }
}
