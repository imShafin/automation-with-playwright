import { test, expect } from '@playwright/test';
import testdata from '../fixtures/testdata.json';
import { HomePage } from '../pages/home/home.page';

// test.use({
//   storageState: 'fixtures/auth/auth.json' 
// });

test('home', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate(testdata['baseurl']);
  await page.pause();
});

