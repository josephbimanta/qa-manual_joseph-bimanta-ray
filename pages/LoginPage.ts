import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async inputUsername(username: string) {
    await this.page.fill('#user-name', username);
  }

  async inputPassword(password: string) {
    await this.page.fill('#password', password);
  }

  async clickLogin() {
    await this.page.click('#login-button');
  }

  async login(username: string, password: string) {
    await this.inputUsername(username);
    await this.inputPassword(password);
    await this.clickLogin();
  }

  getErrorMessage() {
    return this.page.locator('[data-test="error"]');
  }
}