import { test, expect } from '@playwright/test'
import { ProductCategoryPage } from '../../page-objects/ProductCategoryPage';
import { CartPage } from '../../page-objects/CartPage';
import { LoginPage } from '../../page-objects/LoginPage';

let authenticatedContext;

//Login via API or UI,save auth session cookies and local storage items in Json
test.beforeAll('login via UI to save storage in json', async ({ browser }) => {
    const webContext = await browser.newContext();
    const page = await webContext.newPage();
    await page.goto('#/auth/login');
    const loginPage = new LoginPage(page);
    await loginPage.login('aliceH@hotmail.com', '111Oooo!');
    //wait until network changes to idle state (all services called successfully)
    await page.waitForLoadState('networkidle');
    await webContext.storageState({ path: 'auth.json' });// save storage state in json file
    //inject storageState json to the context of new browser
    authenticatedContext = await browser.newContext({ storageState: 'auth.json' });
})


//Manually inject storageState to a new page
test('Add product in Cart', async () => {

    const page = await authenticatedContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');

    const country = 'Canada';
    const searchValue = 'Can';
    const coupon = 'rahulshettyacademy';

    const productCategoryPage = new ProductCategoryPage(page);
    const productName = 'ZARA COAT 3';
    await expect(productCategoryPage.cartBadge).toBeHidden();
    await productCategoryPage.addToCart(productName);
    await expect(productCategoryPage.cartBadge).toHaveText('1');
    await productCategoryPage.gotoCart();

    const cartPage = new CartPage(page);
    await expect(cartPage.myCartHeading).toBeVisible();
    await expect(cartPage.productName).toHaveText(productName);
    await cartPage.checkout();
    await page.close();
})

test('Print product list', async () => {
    const page = await authenticatedContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');

    const productCategoryPage = new ProductCategoryPage(page);
    const productTitles = await productCategoryPage.productsList.allTextContents();
    console.log(productTitles);
    await page.close();

})


