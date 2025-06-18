import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/beza/login/login.page.ts';
import testdata from '../../../fixtures/testdata.json';
import fs from 'fs/promises';
import path from 'path';

setup('login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate(testdata["validUser"]["loginUrl"]);
  await loginPage.login(
    testdata["validUser"]["email"], 
    testdata["validUser"]["password"]
  );

    // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL(testdata['baseurl']);
  await page.context().storageState({ path: 'fixtures/auth/auth.json' });
  await page.pause();
});



