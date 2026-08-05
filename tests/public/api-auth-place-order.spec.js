import { test, expect } from '@playwright/test'
import { OrderPage } from '../../page-objects/OrderPage';
import { ApiUtils } from '../../utils/ApiUtils.js'
import apiData from '../../data/apiData.json'

let response;

test.beforeAll(async ({ request }) => {

    const apiUtils = new ApiUtils(request);
    //using API to get token and create order
    response = await apiUtils.createOrder(apiData.createOrderPayload);

})

test('place order', async ({ page }) => {

    //Inject token in local storage
    //addInitScript() having 2 arguments, it takes 2nd arg 'token', inject as 'value' into 1st arg which is a function
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('#/dashboard/myorders');
    const orderPage = new OrderPage(page);
    await expect(orderPage.yourOrdersText).toBeVisible();
    await expect(orderPage.orderRowHeader(response.orderId)).toBeVisible();

    await orderPage.deleteOrder(response.orderId);
    const rowHeader = orderPage.orderIdList.filter({ hasText: response.orderId });
    await expect(rowHeader).toHaveCount(0);

})