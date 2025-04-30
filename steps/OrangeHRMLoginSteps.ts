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
  import { OrangeHRMLoginPage } from '../pages/OrangeHRMLoginPage';
  import { OrangeHRMDashboardPage } from '../pages/OrangeHRMDashboardPage';
  import dotenv from 'dotenv';
  

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
  
  When('the user logs in with valid credentials', async () => {
    await loginPage.login(process.env.USERNAME!,   process.env.PASSWORD!);
    dashboardPage = new OrangeHRMDashboardPage(page);
  });
  
  Then('the dashboard page should be displayed', async () => {
    await dashboardPage.isVisible();
  });
  