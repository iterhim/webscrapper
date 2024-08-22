import { Inject, Injectable } from '@nestjs/common';
import { MarylandServicePort, MarylandServiceType } from '../../ports/maryland-service.port';

@Injectable()
export class GetMarylandItemByCodeUsecase {
  constructor(
    @Inject(MarylandServiceType)
    private readonly marylandService: MarylandServicePort,
  ) {}

  async execute(code: string) {
    return this.marylandService.getItemByCode(code);
  }
}
