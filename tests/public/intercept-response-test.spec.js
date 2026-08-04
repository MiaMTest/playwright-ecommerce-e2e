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

    //Intercept network response call
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
        async route => {

           /*Intercepted Flow 1: 
            Browser attempts to send request ->Playwright catches it->Playwright delivers fack JSON back 
            The reall server never even knows a request was attempted*/

            /*await route.fulfill({          //Fulfill the request with custom mock response
                  body:JSON.stringify({         //Convert JS object to Json formatted string
                    fakePayloadOrders
                })
            })*/


            //Intercepted Flow 2:request hit the real server, get the real response, and then modify it 
            const response = await route.fetch(); //fetch the live response data 
            await route.fulfill({ response, json:fakePayloadOrders });//send mock response json payload to browser
        })

    await page.goto('#/dashboard/myorders');
    const orderPage = new OrderPage(page);
    await expect(orderPage.noOrderMsg).toHaveText('You have No Orders to show at this time. Please Visit Back Us');


})