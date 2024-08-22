import { Inject, Injectable } from '@nestjs/common';
import { MarylandServiceType, MarylandServicePort } from '../../ports/maryland-service.port';
import { MarylandItemDetailsType } from '../data/types/maryland-item-details.type';

@Injectable()
export class GetMarylandDetailsByIdUsecase {
  constructor(
    @Inject(MarylandServiceType)
    private readonly marylandService: MarylandServicePort,
  ) {}

  async execute(id: string): Promise<MarylandItemDetailsType> {
    return this.marylandService.getItemDetailsById(id);
  }
}
