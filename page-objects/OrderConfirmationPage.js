export class OrderConfirmationPage {
    constructor(page) {
        this.page = page;
        this.orderConfirmationText = page.locator('.hero-primary');
        this.OrderId = page.locator('label.ng-star-inserted');
        this.orderHistoryLink = page.getByText(' Orders History Page ');

    }

    async getOrderId() {
        const rawOrderId = await this.OrderId.textContent();
        console.log(rawOrderId);
        return rawOrderId.trim().split(' ')[1];
        /*
        //using regex extracts any alphanumric string that is 24 characters long
        const match = rawOrderId.match(/[a-z0-9]{24}/i);
        //If a match is found, return it; otherwise return an empty string
        const orderId = match ? match[0] : '';
        */

    }

    async goToOrderPage() {
        this.orderHistoryLink.click();
    }
}