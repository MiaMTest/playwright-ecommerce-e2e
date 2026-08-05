export class ResetPasswordPage {
    constructor(page) {
        this.page = page;
        this.email = page.getByRole('textbox', { name: 'Enter your email address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.confirmPassword = page.getByRole('textbox', { name: 'Confirm Password' });
        this.saveNewPasswordBtn = page.getByRole('button', { name: 'Save New Password' });
        this.passwordChangedSuccessMsg = page.getByText('Password Changed Successfully');
    }

    async fillResetPasswordForm(email, password) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.confirmPassword.fill(password);
    }

    async saveNewPassword() {
        await this.saveNewPasswordBtn.click();
    }
}
