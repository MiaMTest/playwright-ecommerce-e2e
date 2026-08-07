import { test, expect } from '@playwright/test';
import { LoginPagePractisePage } from '../../page-objects/LoginPagePractisePage.js';

test('login practise flow and verify iphone X product', async ({ page }) => {
    const loginPage = new LoginPagePractisePage(page);

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await loginPage.login('rahulshettyacademy', 'Learning@830$3mK2', 'Teacher');
    await loginPage.clickSignIn();

    await page.waitForURL(/angularpractice\/shop/);
    await expect(page.getByText('iphone X', { exact: false })).toBeVisible();
});

