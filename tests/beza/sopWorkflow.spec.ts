import { test, expect } from '@playwright/test';
import { SopProcessingPage } from '../../pages/beza/sopProcessing.page';
import * as fs from 'fs';
import * as path from 'path';

// Type definitions (consider moving to separate types file)
interface Process {
  companyName: string;
  trackingId: string;
  action: 'FORWARD' | 'REJECT' | 'SHORTFALL';
}

interface SopTestData {
  sopName: string;
  processes: Process[];
}

// Main test suite
test.describe('SOP Processing Workflow', () => {
  let sopProcessingPage: SopProcessingPage;

  test.beforeEach(async ({ page }) => {
    sopProcessingPage = new SopProcessingPage(page);
    await page.goto(process.env.BEZA_URL || '');
    await page.waitForLoadState('networkidle');
  });

  // Load test data
  const testDataPath = path.join(__dirname, '../../fixtures/rd1_sop_flow.json');
  const testData: SopTestData[] = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

  // Process each SOP in the test data
  testData.forEach(sopData => {
    test.describe(`Processing ${sopData.sopName}`, () => {
      sopData.processes.forEach((process, index) => {
        const testName = process.companyName 
          ? `${process.action} for ${process.companyName}`
          : `${process.action} for tracking ID ${process.trackingId}`;

        test(testName, async ({ page }) => {
          // Navigate to the specific SOP
          await sopProcessingPage.navigateToSop(sopData.sopName);
          
          // Perform search and execute action
          await sopProcessingPage.performSearch(process);
          await sopProcessingPage.executeAction(process.action);
          
          // Verify the action was processed
          //await sopProcessingPage.verifyActionCompleted(process);
        });
      });
    });
  });
});