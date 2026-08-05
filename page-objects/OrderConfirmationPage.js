export class OrderConfirmationPage {
    constructor(page) {
        this.page = page;
        this.orderConfirmationText = page.locator('.hero-primary');
        this.orderIdLabel = page.locator('label.ng-star-inserted');
        this.orderHistoryLink = page.getByText('Orders History Page');
    }

    async getOrderId() {
        const rawOrderId = await this.orderIdLabel.textContent();
        return rawOrderId?.trim().split(' ')[1] ?? '';
    }

    async goToOrderPage() {
        await this.orderHistoryLink.click();
    }
}
