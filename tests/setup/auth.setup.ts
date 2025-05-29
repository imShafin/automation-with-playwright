import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/login.page';
import testdata from '../../fixtures/testdata.json';
import fs from 'fs/promises';
import path from 'path';

setup('login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate(testdata["validUser"]["loginUrl"]);
  await loginPage.login(
    testdata["validUser"]["email"], 
    testdata["validUser"]["password"]
  );
  const authPath = path.join(process.cwd(), 'fixtures', 'auth', 'auth.json');
  await fs.mkdir(path.dirname(authPath), { recursive: true });
  
  //await page.waitForURL(/);

  await page.context().storageState({ path: authPath });
  await page.pause();
});



