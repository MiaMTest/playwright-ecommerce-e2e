export class LoginPagePractisePage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByLabel('Username');
        this.passwordInput = page.getByLabel('Password');
        this.userTypeRadio = page.getByRole('radio', { name: 'User' });
        this.roleDropdown = page.getByRole('combobox');
        this.termsCheckbox = page.getByLabel('I Agree to the terms and conditions');
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
    }

    async login(username, password, role) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.roleDropdown.selectOption({ label: role });
    }

    async clickSignIn() {
        await this.termsCheckbox.check();
        await this.signInButton.click();
    }
}
