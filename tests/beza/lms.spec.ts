// tests/sop-creation.spec.ts
import { test, expect } from '@playwright/test';
import { LmsCreationPage } from '../../pages/beza/home/sops/lms.page';
import testdata from '../../fixtures/lmstestdata.json';

test.describe('LMS Creation Tests', () => {
    let lmsCreationPage: LmsCreationPage;

    test.beforeEach(async ({ page }) => {
        lmsCreationPage = new LmsCreationPage(page);
        await lmsCreationPage.navigate(testdata['lmsCreation']['url']);
    });

    test('should create new SOP successfully', async () => {
        await lmsCreationPage.completeSopCreation(
            testdata['lmsCreation']['application'],
            testdata['lmsCreation']['files']
        );
    
    });

});