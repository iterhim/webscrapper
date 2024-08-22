import { ApiProperty } from '@nestjs/swagger';
import { MarylandItemAttachmentResponse } from './maryland-item-attachment.response';

export class MarylandItemDetailsResponse {
  @ApiProperty()
  solicitationSummary: string;

  @ApiProperty({ type: MarylandItemAttachmentResponse, isArray: true })
  attachments: MarylandItemAttachmentResponse[];
}
