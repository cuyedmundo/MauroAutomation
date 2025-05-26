import {
  Given,
  When,
  Then,
} from '@cucumber/cucumber';
import { LoginPage } from '../../src/pages/LoginPage';
import { page } from '../../src/hooks/setup';
import { getCredentials } from '../../src/utils/getCredentials'
import { log } from 'console';


// Global objects to share between steps
let loginPage: LoginPage;


// Step definitions

Given('the user is on the login page', async () => {
  // create new context
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

When('the user logs in with username {string} and password {string}', async (username: string, password: string) => {
  await loginPage.login(username, password);
});

When('the user logs in with the stored user {string}', async (username: string) => {
  const credentials = getCredentials(username);
  await loginPage.login(credentials.email, credentials.password);
});


Then('the login page display a login error', async () => {
  await loginPage.loginFailed();
});

