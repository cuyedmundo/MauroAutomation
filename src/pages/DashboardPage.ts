import { Page, Locator} from 'playwright';
import { expect } from '@playwright/test';

export class DashboardPage {
  private page: Page;
  private  header: Locator;


  constructor(page: Page) {
    this.page = page;
    // locators
    this.header = page.getByRole('heading', { name: 'Dashboard' });
  }

  async DashboardIsVisible(): Promise<void> {
    await expect(this.header).toBeVisible();
}
};
