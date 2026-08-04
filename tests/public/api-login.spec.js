import { test, expect } from '@playwright/test';


test.describe('API Authentification Tests', () => {

    test('Should successfully login with valid credentials', async ({ request }) => {
        //JS object
        const loginPayload = {
            userEmail: "Mia123@hotmail.com",
            userPassword: "Mia123@hotmail.com"
        };

        const response = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: loginPayload,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        await expect(response).toBeOK();
        await expect(response.status()).toBe(200);

        const responseBody = await response.json();
        let token = await responseBody.token;
        console.log(token);


    });

    test('Should fail login with invalid password', async ({ request }) => {
        const loginPayload = {
            userEmail: "Mia123@hotmail.com",
            userPassword: "uncorrectPassword"
        };

    
        const response = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: loginPayload,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        await expect(response.status()).toBe(400);

    });

})