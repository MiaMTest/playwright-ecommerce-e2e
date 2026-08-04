import { expect } from '@playwright/test';
import apiData from '../data/apiData.json'


export class ApiUtils {

    /**
     * @param {import("@playwright/test").APIRequestContext} request
     */
    constructor(request) {
        this.request = request;
    }

  
    async getToken(payload) {
        const loginResponse = await this.request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        await expect(loginResponse).toBeOK();
        const loginResponseBody = await loginResponse.json();
        return loginResponseBody.token;

    }


    async createOrder(payload) {

        let response = {}; //delcare an object to store properties: token and orderId
        response.token = await this.getToken(apiData.loginPayload);

        const createOrderResponse = await this.request.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: payload,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                }
            });

        await expect(createOrderResponse).toBeOK();

        const orderBody = await createOrderResponse.json();
        const orderId = orderBody.orders[0];
        response.orderId = orderId;
        return response;

    }
}