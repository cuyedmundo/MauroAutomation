import { BeforeAll, AfterAll, Before, After, setDefaultTimeout, BeforeStep, AfterStep } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page, firefox } from 'playwright';
import { generateLogFile, getRequestAndResponse } from '../utils/httpLogger';
import * as path from 'path';

let browser: Browser;
let context: BrowserContext;
let page: Page;

setDefaultTimeout(30 * 1000);

BeforeAll(async () => {
  browser = await firefox.launch({ headless: false });
});

AfterAll(async () => {
  await browser.close();
  await generateLogFile();
});

Before(async function (this: any, scenario) {
  context = await browser.newContext();
  
  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
    title: scenario.pickle.name,
    name: scenario.pickle.name,
  });
  
  page = await context.newPage();
  
  // Add scenario info to page
  const featureName = path.basename(scenario.pickle.uri, '.feature');
  (page as any).scenarioInfo = {
    feature: featureName,
    scenario: scenario.pickle.name,
    currentStep: ''
  };
  
  getRequestAndResponse(page);
});

After(async function (scenario) {
  const traceName = scenario.pickle.name.replace(/ /g, '_');
  const tracePath = `reports/${traceName}.zip`;
  
  await context.tracing.stop({ path: tracePath });
  await context.close();
});

BeforeStep(function (this: any, step) {
  if (page) {
    (page as any).scenarioInfo.currentStep = step.pickleStep.text;
  }
});

AfterStep(function () {
  if (page) {
    (page as any).scenarioInfo.currentStep = '';
  }
});

export { browser, context, page };