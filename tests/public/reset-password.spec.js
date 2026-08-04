import { test, expect } from '@playwright/test';
import { ResetPasswordPage } from '../../page-objects/ResetPasswordPage';

test('reset password', async ({ page }) => {
    await page.goto('#/auth/password-new');
    const resetPasswordPage = new ResetPasswordPage(page);
    await resetPasswordPage.fillResetPasswordForm('aliceH@hotmail.com', '111Oooo!');
    await resetPasswordPage.saveNewPassword();
    await expect(resetPasswordPage.passwordChangedSuccessMsg).toBeVisible();

})