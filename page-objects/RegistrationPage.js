

export class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.registerHeader = page.locator('.login-title');
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.emailInput = page.locator('#userEmail');
        this.phoneInput = page.locator('#userMobile');
        this.occupationDropdown = page.locator('[formcontrolname="occupation"]');
        //this.gender = page.getByLabel('gender');
        this.passwordInput = page.locator('#userPassword');
        this.confirmPassword = page.locator('#confirmPassword');
        this.ageCheckbox = page.locator('input[type="checkbox"]');
        this.registerBtn = page.locator('input[value="Register"]');
        this.registrationSuccessMsg = page.getByRole('heading', { name: 'Account Created Successfully' });
        this.validationAlert = page.locator('[aria-label="Last Name is required!"]')
        this.alertMessage = page.locator('div[role="alert"]');
        //div[role="alert"]

    }
    async getAlertMessage() {
        await this.alertMessage.waitFor({ state: 'visible' });
        const text = await this.alertMessage.first().innerText();
        return text.trim();
    }

    async getRegisterHeader() {
        return this.registerHeader;
    }

    async fillRegistrationForm({ firstName, lastName, emailPrefix, phone, occupation, gender, password }) {
        const email = `${emailPrefix}_${Date.now()}@example.com`;

        await this.firstNameInput.fill(firstName);
        //Use OR (|| "") to ensure Playwright always get a string, even if data is missing
        await this.lastNameInput.fill(lastName || "");
        await this.emailInput.fill(email);
        await this.phoneInput.fill(phone);
        await this.occupationDropdown.selectOption(occupation);
        await this.page.locator(`input[value="${gender}"]`).click();
        await this.passwordInput.fill(password);
        await this.confirmPassword.fill(password);
        await this.ageCheckbox.check();
    }

    async clickRegisterButton() {
        await this.registerBtn.click();
    }


}
