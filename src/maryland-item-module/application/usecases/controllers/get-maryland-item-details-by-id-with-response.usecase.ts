import { Injectable } from '@nestjs/common';
import { MarylandItemDetailsResponse } from '../../data/responses/maryland-item-details.response';
import { MarylandItemMapper } from '../../data/mappers/maryland-item.mapper';
import { GetMarylandDetailsByIdUsecase } from '../get-maryland-details-by-id.usecase';

@Injectable()
export class GetMarylandItemDetailsByIdWithResponseUsecase {
  constructor(private readonly getMarylandDetailsByIdUsecase: GetMarylandDetailsByIdUsecase) {}

  async execute(code: string): Promise<MarylandItemDetailsResponse> {
    const data = await this.getMarylandDetailsByIdUsecase.execute(code);

    const response = MarylandItemMapper.mapToItemDetailsResponse(data);

    return response;
  }
}
