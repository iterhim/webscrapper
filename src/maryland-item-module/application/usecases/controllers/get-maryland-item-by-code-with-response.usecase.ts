import { Injectable } from '@nestjs/common';
import { MarylandItemMapper } from '../../data/mappers/maryland-item.mapper';
import { MarylandItemResponse } from '../../data/responses/maryland-item.response';
import { GetMarylandItemByCodeUsecase } from '../get-maryland-item-by-code.usecase';

@Injectable()
export class GetMarylandItemByCodeWithResponseUsecase {
  constructor(private readonly getMarylandItemByCodeUsecase: GetMarylandItemByCodeUsecase) {}

  async execute(code: string): Promise<MarylandItemResponse> {
    const { itemId, itemDataValues } = await this.getMarylandItemByCodeUsecase.execute(code);

    const itemData = MarylandItemMapper.mapToItemDataResponse(itemDataValues);

    const response = MarylandItemMapper.mapToItemResponse(itemId, itemData);

    return response;
  }
}
