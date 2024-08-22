import { Controller, Get, Param } from '@nestjs/common';
import { ApiSecurity, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { GetMarylandItemByCodeWithResponseUsecase } from '../../application/usecases/controllers/get-maryland-item-by-code-with-response.usecase';

@Controller('items')
@ApiTags('Items')
@ApiSecurity('ApiKey')
@ApiUnauthorizedResponse({ description: 'Server received not valid api key' })
export class ItemsController {
  constructor(private readonly getMarylandItemByCodeWithResponseUsecase: GetMarylandItemByCodeWithResponseUsecase) {}

  @Get(':code')
  async getItemsByCode(@Param('code') code: string) {
    return this.getMarylandItemByCodeWithResponseUsecase.execute(code);
  }
}
