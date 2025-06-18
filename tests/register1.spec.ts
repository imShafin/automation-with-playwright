import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register1/register.page.ts';
import testData from '../fixtures/testData';

test('test registration with male user', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.navigate(testData["registration"]["registerUrl"]);
  await registerPage.register(testData["registration"]["maleUser"]);
  await expect(page.getByText('Your registration completed')).toBeVisible();
});

test('test registration with female user', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.navigate(testData["registration"]["registerUrl"]);
  await registerPage.register(testData["registration"]["femaleUser"]);
  await expect(page.getByText('Your registration completed')).toBeVisible();
});