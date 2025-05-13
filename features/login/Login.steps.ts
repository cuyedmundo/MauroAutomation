import {
    Given,
    When,
    Then,
  } from '@cucumber/cucumber';
  import { LoginPage } from '../../src/pages/LoginPage';
  import { page } from '../../src/hooks/setup';
  import { getCredentials } from '../../src/utils/getCredentials'


  // Global objects to share between steps
  let loginPage: LoginPage;


  // Step definitions

  Given('the user is on the OrangeHRM login page', async () => {
    // create new context
    loginPage = new LoginPage(page);
    await loginPage.goto();  
  });
  
  When('the user logs in with username {string} and password {string}', async (username: string, password: string) => {
    const EnvUsername = getCredentials(username);
    const EnvPassword = getCredentials(password);
    await loginPage.login(EnvUsername, EnvPassword);
  });
