import {
    Given,
    When,
    Then,
    BeforeAll,
    AfterAll,
    After,
    setDefaultTimeout,
  } from '@cucumber/cucumber';
  import { chromium, Browser, BrowserContext, Page } from 'playwright';
  import { OrangeHRMLoginPage } from '../pages/LoginPage';
  import { OrangeHRMDashboardPage } from '../pages/DashboardPage';
  import dotenv from 'dotenv';

// Helper
  function getCredentials(input: string): string {
    if (input.startsWith('env:')) {
      const key = input.replace('env:', '');
      const value = process.env[key];
      if (!value) {
        throw new Error(`Environment variable ${key} is not defined`);
      }
      return value;
    }
    return input;
  }
  

  // Global objects to share between steps
  dotenv.config(); 
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  let loginPage: OrangeHRMLoginPage;
  let dashboardPage: OrangeHRMDashboardPage;
  
  // Hooks

  // increase timeout (useful for slow internet connection)
  setDefaultTimeout(10 * 1000);
  
  // Launch browser once for the entire test run
  BeforeAll(async () => {
    browser = await chromium.launch({ headless: false }); // "headless: true" for CI/CD
  });
  
  // Close the browser when all scenarios are completed
  AfterAll(async () => {
    await browser.close();
  });
  
  // Close the browser context each time a scenario is completed
  After(async () => {
    await context?.close();
  });
  

  // Step definitions

  Given('the user is on the OrangeHRM login page', async () => {
    // create new context
    context = await browser.newContext();
    page = await context.newPage();
    // go to login page
    loginPage = new OrangeHRMLoginPage(page);
    await loginPage.goto();
  });
  
  When('the user logs in with username {string} and password {string}', async (username: string, password: string) => {
    const EnvUsername = getCredentials(username);
    const EnvPassword = getCredentials(password);
    await loginPage.login(EnvUsername, EnvPassword);
  });
  
  Then('the dashboard page should be displayed', async () => {
    dashboardPage = new OrangeHRMDashboardPage(page);
    await dashboardPage.DashboardIsVisible();
  });
  