import { test, expect, Page } from '@playwright/test';

async function fillDateField(page: Page, fieldName: string, value: string) {
  const selector = `input[name="data[${fieldName}]"] + input[type="text"]`;
  await page.locator(selector).fill(value);
}

// Usage:

test('test', async ({ page }) => {
  await page.goto('http://192.168.1.125:31710/');

  
  await page.getByText('Inspection Request', { exact: true }).click();
  await page.getByText('Other Work').click();
  await page.getByText('Other Work information').click();
  await page.getByRole('textbox', { name: 'Other Work information *' }).fill('demo');
  await page.getByText('Select OneRemove item').click();
  await page.getByText('No choices to choose from').click();
  
  await page.getByText('Approval No. of Fire Fighting').click();
  await page.getByRole('textbox', { name: 'Approval No. of Fire Fighting' }).fill('445');
  await page.getByText('Approval No. of EIA/ECC').click();
  await page.getByRole('textbox', { name: 'Approval No. of EIA/ECC *' }).fill('1234');
  await page.getByText('Building ID').click();
  await page.getByRole('textbox', { name: 'Building ID *' }).fill('12345');
  await page.getByRole('link', { name: 'browse Browse to attach file for 1. As-built drawing. File size maximum 10 MB,' }).click();
  await page.getByRole('link', { name: 'browse Browse to attach file for 1. As-built drawing. File size maximum 10 MB,' }).setInputFiles('demo.pdf');
  
  await page.getByText('Select OneSelect OneRemove').click();
  await page.getByText('No choices to choose from').click();
    
  await fillDateField(page, 'dateOfBuildingPermitApproval', '29-Mar-2025');
  await fillDateField(page, 'requestDateAndTimeForInspection', '29-Mar-2025');
  await fillDateField(page, 'dateOfFireFightingFloorPlanApproval', '29-Mar-2025');
  await fillDateField(page, 'dateOfTorForEiaEcc', '29-Mar-2025');

  
  await page.getByText('Select OneSelect OneRemove').click();
});