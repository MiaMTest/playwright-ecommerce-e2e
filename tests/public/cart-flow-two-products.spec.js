import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { ProductCategoryPage } from '../../page-objects/ProductCategoryPage';
import { CartPage } from '../../page-objects/CartPage';

test.only('login, add two products, verify cart and total summary', async ({ page }) => {
    await page.goto('#/auth/login');

    const loginPage = new LoginPage(page);
    await loginPage.login('Amail@example.com', 'Amail@example.com');
    await page.waitForLoadState('networkidle');
    await page.waitForURL('#/dashboard/dash');

    const productCategoryPage = new ProductCategoryPage(page);
    const firstProduct = 'ZARA COAT 3';
    const secondProduct = 'iphone 13 pro';

    await productCategoryPage.addToCart(firstProduct);
    await productCategoryPage.addToCart(secondProduct);
    await productCategoryPage.gotoCart();

    const cartPage = new CartPage(page);
    await expect(cartPage.myCartHeading).toBeVisible();
    // Web-first assertion auto-retries until 2 items appear
    await expect(cartPage.productPrices).toHaveCount(2);

    const productNames = await cartPage.getCartItemNames();
    expect(productNames).toEqual([firstProduct, secondProduct]);

    const prices = await cartPage.getCartItemPrices();
    console.log(prices.length);
    expect(prices.length).toBe(2);

    const total = await cartPage.getTotalAmount();
    const expectedTotal = prices.reduce((sum, price) => sum + price, 0);
    expect(total).toBeCloseTo(expectedTotal, 2);
});
