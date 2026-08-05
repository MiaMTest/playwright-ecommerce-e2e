export class CartPage {
    constructor(page) {
        this.page = page;
        this.myCartHeading = page.getByRole('heading', { name: 'My Cart' });
        this.productName = page.locator('.cartSection h3');
        this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });
    }

    async checkout() {
        await this.checkoutBtn.click();
    }
}