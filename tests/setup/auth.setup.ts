import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/beza/login/login.page';
import testdata from '../../fixtures/testdata.json';

setup('login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate(testdata["validUser"]["loginUrl"]);
  await loginPage.login(
    testdata["validUser"]["email"], 
    testdata["validUser"]["password"]
  );
  
  await page.waitForURL(testdata['baseurl']);
  await page.context().storageState({ path: 'fixtures/auth/auth.json' });
  await page.pause();
});



