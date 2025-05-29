import { test, expect } from '@playwright/test';
import testdata from '../fixtures/testdata.json';
import { HomePage } from '../pages/home/home.page';

test('home', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate(testdata["validUser"]["loginUrl"])
  await page.pause();
});