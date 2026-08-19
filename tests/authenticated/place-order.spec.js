import { test, expect } from '@playwright/test'
import { ProductCategoryPage } from '../../page-objects/ProductCategoryPage.js';
import { CartPage } from '../../page-objects/CartPage.js';
import { CheckoutPage } from '../../page-objects/CheckoutPage.js';
import { OrderConfirmationPage } from '../../page-objects/OrderConfirmationPage.js';
import { OrderPage } from '../../page-objects/OrderPage.js';
import apiData from '../../data/apiData.json' with { type: 'json' };

test('place order', async ({ page }) => {
    await page.goto('#/auth/login');
    const country = 'Canada';
    const searchValue = 'Can';
    const coupon = 'rahulshettyacademy';
    const productName = 'ZARA COAT 3';

    const productCategoryPage = new ProductCategoryPage(page);
    await expect(productCategoryPage.cartBadge).toBeHidden();
    await productCategoryPage.addToCart(productName);
    await expect(productCategoryPage.cartBadge).toHaveText('1');
    await productCategoryPage.gotoCart();

    const cartPage = new CartPage(page);
    await expect(cartPage.myCartHeading).toBeVisible();
    await expect(cartPage.productNames).toHaveText(productName);
    await cartPage.checkout();

    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.userName).toHaveText(apiData.loginPayload.userEmail);
    await checkoutPage.selectCountry(searchValue, country);
    await expect(checkoutPage.countryInput).toHaveValue(country);
    await checkoutPage.applyCoupon(coupon);
    await expect(checkoutPage.couponAppliedText).toContainText('Coupon Applied');
    await checkoutPage.placeOrder();

    const orderConfirmationPage = new OrderConfirmationPage(page);
    await expect(orderConfirmationPage.orderConfirmationText).toHaveText(' Thankyou for the order. ');
    const orderId = await orderConfirmationPage.getOrderId();
    await orderConfirmationPage.goToOrderPage();

    const orderPage = new OrderPage(page);
    await expect(orderPage.yourOrdersText).toBeVisible();
    await expect(orderPage.orderRowHeader(orderId)).toBeVisible();

    await orderPage.deleteOrder(orderId);
    const rowHeader = orderPage.orderIdList.filter({ hasText: orderId });
    await expect(rowHeader).toHaveCount(0);
});
