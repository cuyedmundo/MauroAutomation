import { Page, Locator } from 'playwright';  // Import Playwright types
import dotenv from 'dotenv';
dotenv.config(); 

export class OrangeHRMLoginPage {
  private page: Page;
  // define locators
  private usernameField: Locator;
  private passwordField: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // instantiate locators
    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.loginButton  = page.locator('button[type="submit"]');
  }

  // navigate to login page
  async goto() {
    await this.page.goto(process.env.BASE_URL!);
  }

  // fill username, password. and click on login button
  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
