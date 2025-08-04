import { test, expect } from '@playwright/test';
import { LogoutPage } from '../../pages/beza/logout/logout.page';

test.describe('LogOut Test', () => {
    let logoutPage: LogoutPage;

    test.describe('Logout', () => {
        test.beforeEach(({ page }) => {
            logoutPage = new LogoutPage(page);
            page.goto(process.env.BASE_URL!);

        });

        test('should logout successfully', async ({ page }) => {
            await logoutPage.logout();
        });
    });
});