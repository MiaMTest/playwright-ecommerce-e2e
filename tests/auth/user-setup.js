import { test as setup } from '@playwright/test';
import { ApiUtils } from '../../utils/ApiUtils';
import apiData from '../../data/apiData.json'
//import Nodes's fs module to format the file exactly expect
import fs from 'fs';
import { LoginPage } from '../../page-objects/LoginPage';

//Define where the session token/cookies should be saved locally
const STORAGE_STATE = 'playwright/.auth/user.json';

//API authentication
setup('Authenticate User',async ({request}) =>{
    const apiUtils = new ApiUtils(request);
    const token = await apiUtils.getToken(apiData.loginPayload);

    //request can NOT capture local storage
    //Manually construct the extact JSON format Playwright reads
    const statePayload = {
        cookies: [],
        origins: [
            {
                origin: 'https://rahulshettyacademy.com',
                localStorage: [
                    { name: 'token', value: token }
                ]
            }
        ]
    };

    // Write it directly to the disk
    fs.writeFileSync(STORAGE_STATE, JSON.stringify(statePayload, null,2));
})

//UI Authentication
/*setup('Autheticate user', async({browser}) =>{
    const webContext = await browser.newContext();
    const page = await webContext.newPage();

    await page.goto('#/auth/login');
    const loginPage = new LoginPage(page);
    await loginPage.login('aliceH@hotmail.com', '111Oooo!');
    //wait until network changes to idle state (all services called successfully)
    await page.waitForLoadState('networkidle');
    await webContext.storageState({ path: STORAGE_STATE });// save storage state in json file

    
})*/








