export class OrderPage {
    constructor(page) {

        this.page = page;
        this.yourOrdersText = page.getByText('Your Orders');
        this.orderList = page.locator('tr');
        this.orderIdList = page.locator('th[scope="row"]')
        this.noOrderMsg = page.locator('.mt-4');
        this.viewBtn = page.getByRole('button', { name: 'view' });
        this.notAuthorizedText = page.locator('p').last();
  


    }

    orderRowHeader(orderId) {
        return this.page.getByRole('rowheader', { name: orderId });

    }

    async deleteOrder(orderId) {
        const deleteBtn = await this.orderList.filter({ hasText: orderId }).getByRole('button', { name: 'Delete' });
        await deleteBtn.click();
    }

    async viewOrder(orderId) {
        if (orderId === undefined) {
            await this.viewBtn.first().click();
            return; //exit the function
        } 
        const viewOrderBtn = await this.orderList.filter({ hasText: orderId }).getByRole('button', { name: 'view' });
        await viewOrderBtn.click();
       
    }



}