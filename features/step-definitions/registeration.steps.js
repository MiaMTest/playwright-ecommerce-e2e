import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { expect } from '@playwright/test';
import { RegistrationPage } from '../../page-objects/RegistrationPage.js';

setDefaultTimeout(30 * 1000);

Before(async function () {
  this.browser = await chromium.launch({ headless: true });
  this.page = await this.browser.newPage();
  this.registrationPage = new RegistrationPage(this.page);
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given('I am on the registration page', async function () {
  await this.page.goto('https://rahulshettyacademy.com/client/#/auth/register');
});

When('I fill the registration form with the following details:', async function (dataTable) {
  // Convert the data table to an object
  const data = dataTable.rowsHash();
  
  this.userData = {
    firstName: data.firstName,
    lastName: data.lastName || '',
    emailPrefix: data.emailPrefix,
    phone: data.phone,
    occupation: data.occupation,
    gender: data.gender,
    password: data.password,
    isSuccess: data.isSuccess === 'true', // Convert string to boolean
  };

  await this.registrationPage.fillRegistrationForm(this.userData);
});

When('I click the Register button', async function () {
  await this.registrationPage.clickRegisterButton();
});

Then('I should see the result message {string}', async function (expectedMessage) {
  if (expectedMessage.includes("Account Created Successfully")) {
    await expect(this.registrationPage.registrationSuccessMsg).toBeVisible();
  } else {
    const actualMessage = await this.registrationPage.getAlertMessage();
    await expect(actualMessage.toLowerCase()).toContain(expectedMessage.toLowerCase());
  }
})

