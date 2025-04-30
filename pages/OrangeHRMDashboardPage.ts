import { Page, Locator } from 'playwright';

export class OrangeHRMDashboardPage {
  private page: Page;
  // define locators
  private  header: Locator;


  constructor(page: Page) {
    this.page = page;
    // instantiate locators
    this.header = page.getByRole('heading', { name: 'Dashboard' });
  }

  async isVisible(): Promise<boolean> {
    return this.header.isVisible();
  }
}
