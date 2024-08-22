import { ApiProperty } from '@nestjs/swagger';
import { MarylandItemDataResponse } from './maryland-item-data.response';

export class MarylandItemResponse {
  @ApiProperty()
  itemId: string;

  @ApiProperty()
  itemData: MarylandItemDataResponse;
}
