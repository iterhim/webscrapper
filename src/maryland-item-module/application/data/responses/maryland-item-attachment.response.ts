import { ApiProperty } from '@nestjs/swagger';

export class MarylandItemAttachmentResponse {
  @ApiProperty()
  textContent: string;

  @ApiProperty()
  href: string;
}
