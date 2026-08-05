import { test, expect } from '@playwright/test'
import { OrderPage } from '../../page-objects/OrderPage';
import { ApiUtils } from '../../utils/ApiUtils.js'
import apiData from '../../data/apiData.json'

let response;
const fakePayloadOrders = { "data": [], "message": "No Orders" }; //JS object

test.beforeAll(async ({ request }) => {

    const apiUtils = new ApiUtils(request);
    //using API to get token and create order
    response = await apiUtils.createOrder(apiData.createOrderPayload);

})

test('Intercept and mock no order on the list', async ({ page }) => {

    //Inject token in local storage
    //addInitScript() having 2 arguments, it takes 2nd arg 'token', inject as 'value' into 1st arg which is a function
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.route('**/order/get-orders-for-customer/*', route =>
        route.fulfill({
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fakePayloadOrders),
        })
    );

    await page.goto('#/dashboard/myorders');
    const orderPage = new OrderPage(page);
    await expect(orderPage.noOrderMsg).toHaveText('You have No Orders to show at this time. Please Visit Back Us');


})