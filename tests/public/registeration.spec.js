import { test, expect } from '@playwright/test'
import { RegistrationPage } from '../../page-objects/RegistrationPage';
import testData from '../../data/registrationData.json';


//Loop through each user object in the JSON array
testData.forEach((userData) => {

    //Dynamically name the test using a property from JSON
    test(`DDT:${userData.testName}`, async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await page.goto('#/auth/register');
        await registrationPage.fillRegistrationForm(userData);
        await registrationPage.clickRegisterButton();

        //Dynamic assertion based on the dataset scenario
        if (userData.isSuccess) {
            await expect(registrationPage.registrationSuccessMsg).toBeVisible();
        } else {
            await expect(registrationPage.validationAlert).toBeVisible();
        }
    })

})


