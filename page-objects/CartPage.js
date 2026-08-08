import { expect } from '@playwright/test';
export class CartPage {
    constructor(page) {
        this.page = page;
        this.myCartHeading = page.getByRole('heading', { name: 'My Cart' });
        // Target list items representing products in the cart
        this.cartItems = page.getByRole('listitem').filter({ has: page.getByRole('heading', { level: 3 }) });
        this.productNames = this.cartItems.getByRole('heading', { level: 3 });

        // Target the standalone price paragraph (excluding "MRP")
        this.productPrices = this.cartItems.locator('p').filter({ hasText: /^\$\s*\d+/ });

        // Target specifically the listitem containing the exact word "Total"
        this.totalAmountValue = page.locator('.totalRow').filter({ hasText: /^Total/i }).locator('.value');
        this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });
    }

    async getCartItemNames() {
        await this.productNames.first().waitFor({ state: 'visible' });
        return this.productNames.allTextContents();
    }

    async getCartItemPrices() {
        // Ensure elements are present before mapping
        await expect(this.productPrices).toHaveCount(2);
        const priceTexts = await this.productPrices.allTextContents();
        return priceTexts.map((text) => parseFloat((text || '').replace(/[^0-9.]/g, '')));
    }

    async getTotalAmount() {
        const totalText = await this.totalAmountValue.textContent() || '';
        return parseFloat(totalText.replace(/[^0-9.]/g, ''));
    }

    async checkout() {
        await this.checkoutBtn.click();
    }
}
