import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('TC-01 - Login Success_Valid Credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
});

test('TC-LOG-02 - Login Failed_Invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login('standard_user', 'pastieror');

  await expect(loginPage.getErrorMessage()).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
  );
});

test('TC-LOG-03 - Login Failed_Locked account', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login('locked_out_user', 'secret_sauce');

  await expect(loginPage.getErrorMessage()).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.'
  );
});