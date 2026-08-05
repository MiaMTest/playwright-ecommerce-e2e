export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator('.user__name label');
        this.countryInput = page.getByPlaceholder('Select Country');
        this.placeOrderBtn = page.locator('.action__submit');
        this.couponInput = page.locator('[name="coupon"]');
        this.applyCouponBtn = page.getByRole('button', { name: 'Apply Coupon' });
        this.couponAppliedText = page.locator('[name="coupon"] + p');
    }

    getCountryOption(countryName) {
        return this.page.locator('button.ta-item', { hasText: countryName });
    }

    async selectCountry(searchValue, countryName) {
        await this.countryInput.fill(searchValue);
        const option = this.getCountryOption(countryName);
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async placeOrder() {
        await this.placeOrderBtn.click();
    }

    async applyCoupon(coupon) {
        await this.couponInput.fill(coupon);
        await this.applyCouponBtn.click();
        await this.couponAppliedText.waitFor({ state: 'visible' });
    }
}
