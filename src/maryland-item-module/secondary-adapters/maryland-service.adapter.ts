import { launch } from 'puppeteer';
import { MarylandServicePort } from '../ports/maryland-service.port';
import { MARYLAND_BASE_URL } from '../../constants';
import { MarylandItemValuesWithIdType } from '../application/data/types/maryland-item-values-with-id.type';

export class MarylandServiceAdapter implements MarylandServicePort {
  constructor() {}

  async getItemByCode(code: string): Promise<MarylandItemValuesWithIdType> {
    const browser = await launch();
    const page = await browser.newPage();

    await page.goto(`${MARYLAND_BASE_URL}/rfp/request_browse_public`);

    await page.type('#body_x_txtBpmCodeCalculated_3', code);

    await Promise.all([page.click('#body_x_prxFilterBar_x_cmdSearchBtn'), page.waitForNavigation({ waitUntil: 'networkidle0' })]);

    const { itemId, itemDataValues } = await page.$eval('#body_x_grid_grd tbody tr', (tr) => {
      const itemId: string = tr.getAttribute('data-id');

      const itemDataValues: string[] = Array.from(tr.querySelectorAll('td'))
        .map((td) => (td as any).textContent)
        .splice(1, 8);

      return { itemId, itemDataValues };
    });

    return { itemDataValues, itemId };
  }

  async getItemDetailsById(id: string) {
    const browser = await launch();
    const page = await browser.newPage();

    await page.goto(`${MARYLAND_BASE_URL}/bpm/process_manage_extranet/${id}`);
  }
}
