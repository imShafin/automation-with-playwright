import { test, expect } from '@playwright/test';
import { SignUpPage } from '../../pages/beza/signup/signup.page';
import testdata from '../../fixtures/registrationtestdata.json';

test.describe('Registration Tests', () => {
    let registrationPage: SignUpPage;

    test.beforeEach(async ({ page }) => {
        registrationPage = new SignUpPage(page);
        await registrationPage.navigate(process.env.BASE_URL! + '/registration');
    });

    testdata.forEach( data => {
        test(`should complete registration successfully for ${data.user.name}`, async () => {
            await registrationPage.completeRegistration(
                data.user,
                data.files
            );
        });
    });

    test.afterEach(async ({ page }) => {
        await expect(
            page.getByText('Your account has been created successfully. A verification email will be sent')
        ).toBeVisible();
    });
});