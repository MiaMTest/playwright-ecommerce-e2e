import { test, expect } from '@playwright/test';
import { OrderPage } from '../../page-objects/OrderPage';
import { ApiUtils } from '../../utils/ApiUtils';
import apiData from '../../data/apiData.json';

test.beforeAll(async ({ request }) => {

    const apiUtils = new ApiUtils(request);
    //using API to get token and create order
  await apiUtils.createOrder(apiData.createOrderPayload);

})
test('Security test of intercepting an outgoing API request', async ({ page }) => {
    await page.goto('#/dashboard/myorders');
    const orderPage = new OrderPage(page);
    await page.locator('[routerlink="/dashboard/myorders"]').click();


    await page.route(/.*\/get-orders-details.*/,
        async route => {
            const modifiedUrl = 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=b6a4d9e5885886a4e3a1385b8849b49d5ebdf';
            console.log("SUCCESS: Interceptor hit! Injecting hacked URL.");
            //Forward the modified request to the real server
            await route.continue({
                url: modifiedUrl
            })

        }
    )

    //Trigger action that makes the network request
    await orderPage.viewOrder();
    await expect(orderPage.notAuthorizedText).toHaveText('You are not authorize to view this order');

})

