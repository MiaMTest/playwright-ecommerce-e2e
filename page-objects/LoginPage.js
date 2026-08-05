
export class LoginPage {
    constructor(page) {
        this.page = page;
        this.registerLink = page.getByText('Register here');
        this.emailInput = page.locator('#userEmail');
        this.passwordInput = page.locator('#userPassword');
        this.loginBtn = page.locator('#login');
    }

    async clickRegisterLink() {
        await this.registerLink.click();
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }
}
