export class OrderPage {
    constructor(page) {
        this.page = page;
        this.yourOrdersText = page.getByText('Your Orders');
        this.orderList = page.locator('tr');
        this.orderIdList = page.locator('th[scope="row"]');
        this.noOrderMsg = page.locator('.mt-4');
        this.notAuthorizedText = page.locator('p').last();
    }

    orderRowHeader(orderId) {
        return this.page.getByRole('rowheader', { name: orderId });
    }

    async deleteOrder(orderId) {
        const deleteBtn = this.orderList.filter({ hasText: orderId }).getByRole('button', { name: 'Delete' });
        await deleteBtn.click();
    }

    async viewOrder(orderId) {
        const viewButton = orderId
            ? this.orderList.filter({ hasText: orderId }).getByRole('button', { name: 'view' })
            : this.page.getByRole('button', { name: 'view' }).first();
        await viewButton.click();
    }
}
