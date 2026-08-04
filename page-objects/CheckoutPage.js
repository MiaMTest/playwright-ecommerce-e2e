import {expect} from '@playwright/test'

export class CheckoutPage{
    constructor(page){
        this.page = page;
        this.userName = page.locator('.user__name label');
        this.countryInput = page.getByPlaceholder('Select Country');
        this.dropdownList = page.locator('button.ta-item');
        this.placeOrderBtn = page.locator('.action__submit');
        this.couponInput = page.locator('[name="coupon"]');
        this.applycouponBtn = page.getByRole('button',{name:'Apply Coupon'});
        this.couponAppliedText = page.locator('[name="coupon"]+p');


    }

    async selectCountry(searchValue,countryName){
        await this.countryInput.pressSequentially(searchValue);
        const option = this.dropdownList.getByText(countryName);
        await option.waitFor({state:'visible'});
        await option.click();
    
    
    }


    async placeOrder(){
        await this.placeOrderBtn.click();
    }

    async applyCoupon(coupon){
        this.couponInput.fill(coupon);
        this.applycouponBtn.click();

    }


    
}