import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiSecurity, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { GetMarylandItemByCodeWithResponseUsecase } from '../../application/usecases/controllers/get-maryland-item-by-code-with-response.usecase';
import { GetMarylandItemDetailsByIdWithResponseUsecase } from '../../application/usecases/controllers/get-maryland-item-details-by-id-with-response.usecase';
import { MarylandItemResponse } from '../../application/data/responses/maryland-item.response';
import { MarylandItemDetailsResponse } from '../../application/data/responses/maryland-item-details.response';

@Controller('items')
@ApiTags('Items')
@ApiSecurity('ApiKey')
@ApiUnauthorizedResponse({ description: 'Server received not valid api key' })
export class ItemsController {
  constructor(
    private readonly getMarylandItemByCodeWithResponseUsecase: GetMarylandItemByCodeWithResponseUsecase,
    private readonly getMarylandItemDetailsByIdWithResponseUsecase: GetMarylandItemDetailsByIdWithResponseUsecase,
  ) {}

  @Get(':code')
  @ApiOkResponse({ type: MarylandItemResponse })
  async getItemsByCode(@Param('code') code: string) {
    return this.getMarylandItemByCodeWithResponseUsecase.execute(code);
  }

  @Get('details/:id')
  @ApiOkResponse({ type: MarylandItemDetailsResponse })
  async getItemsById(@Param('id') code: string): Promise<MarylandItemDetailsResponse> {
    return this.getMarylandItemDetailsByIdWithResponseUsecase.execute(code);
  }
}
