import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/beza/login/login.page';
import testdata from '../../fixtures/testdata.json';

setup('login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate(process.env.BASE_URL! + '/login');
  await loginPage.login(
    testdata["validUser"]["email"], 
    testdata["validUser"]["password"]
  );
  
  await page.waitForURL(process.env.BASE_URL!);
  await page.context().storageState({ path: 'fixtures/auth/auth.json' });
  await page.pause();
});



