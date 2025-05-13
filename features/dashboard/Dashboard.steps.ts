import {
    Given,
    When,
    Then,
  } from '@cucumber/cucumber';
  import { DashboardPage } from '../../src/pages/DashboardPage';
  import { page } from '../../src/hooks/setup';


  // Global objects to share between steps
  let dashboardPage: DashboardPage;


  // Step definitions

  Then('the dashboard page should be displayed', async () => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.DashboardIsVisible();
  });
  