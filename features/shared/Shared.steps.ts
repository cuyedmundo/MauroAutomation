import {
    Given,
    When,
    Then,
  } from '@cucumber/cucumber';
  import { HeaderPage } from '../../src/pages/HeaderPage';
  import { page } from '../../src/hooks/setup';


  // Global objects to share between steps
  let headerPage: HeaderPage;


  // Step definitions

  Then('the header should be displayed', async () => {
    headerPage = new HeaderPage(page);
    await headerPage.HeaderIsVisible();
  });
  