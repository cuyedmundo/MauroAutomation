import { Page, Locator} from 'playwright';
import { expect } from '@playwright/test';

export class HeaderPage {
  private page: Page;
  private  header: Locator;


  constructor(page: Page) {
    this.page = page;
    // locators
    this.header = page.getByRole('heading', { name: 'Inicio' });
  }

  async HeaderIsVisible(): Promise<void> {
    await expect(this.header).toBeVisible();
}
};
