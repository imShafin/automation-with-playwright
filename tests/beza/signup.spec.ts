// tests/registration.spec.ts
import { test, expect } from '@playwright/test';
import { SignUpPage } from '../../pages/beza/signup/signup.page';
import testdata from '../../fixtures/registrationtestdata.json';

test.describe('Registration Tests', () => {
    let registrationPage: SignUpPage;

    test.beforeEach(async ({ page }) => {
        registrationPage = new SignUpPage(page);
        await registrationPage.navigate(process.env.BASE_URL! + '/registration');
    });

    test('should complete registration successfully', async () => {
        await registrationPage.completeRegistration(
            testdata['user'],
            testdata['files']
        );
    });
});