import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/admin/login.page';
import testdata from '../fixtures/testdata.json';

test('has title', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(testdata["validUser"]["email"], testdata["validUser"]["password"]);
  await page.pause();
});


