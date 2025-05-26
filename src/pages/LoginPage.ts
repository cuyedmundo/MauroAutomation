import { Page, Locator } from 'playwright';
import dotenv from 'dotenv';
import { expect } from 'playwright/test';
dotenv.config(); 

export class LoginPage {
  private page: Page;
  private usernameField: Locator;
  private passwordField: Locator;
  private loginButton: Locator;
  private invalidCredentials: Locator;

  constructor(page: Page) {
    this.page = page;
    // locators
    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.loginButton  = page.locator('button[type="submit"]');
    this.invalidCredentials = page.getByText('Invalid credentials');
  };

  async goto() {
    await this.page.goto(process.env.BASE_URL!);
  };

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  };

  async loginFailed(){
    await expect(this.invalidCredentials).toBeVisible();
  };

};
