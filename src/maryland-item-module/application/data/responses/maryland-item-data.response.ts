import { ApiProperty } from '@nestjs/swagger';

export class MarylandItemDataResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  close_date: string;

  @ApiProperty()
  publish_date: string;

  @ApiProperty()
  main_category: string;

  @ApiProperty()
  solicitation_type: string;

  @ApiProperty()
  issuing_agency: string;

  @ApiProperty()
  bid_holders_list: string;

  @ApiProperty()
  emm_id: string;

  [key: string]: string;
}
