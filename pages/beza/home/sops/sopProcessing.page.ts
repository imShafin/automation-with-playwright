import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../../base.page';

export interface Process {
  companyName: string;
  trackingId: string;
  action: 'FORWARD' | 'REJECT' | 'SHORTFALL';
}

export class SopProcessingPage extends BasePage {
  readonly sopCard = (sopName: string) => this.page.locator('#card-layout').getByText(sopName);
  readonly searchButton = this.page.locator('#search-button');
  readonly companyNameInput = this.page.getByRole('textbox', { name: 'Search by Company Name' });
  readonly trackingIdInput = this.page.getByRole('textbox', { name: 'Search by Tracking Id' });
  readonly searchSubmitButton = this.page.getByRole('button', { name: 'Search' });
  readonly viewLink = this.page.getByRole('link', { name: 'VIEW' });
  readonly forwardButton = this.page.getByRole('button', { name: 'FORWARD' });
  readonly rejectButton = this.page.getByRole('button', { name: 'REJECT' });
  readonly shortfallButton = this.page.getByText('SHORTFALL', { exact: true });
  readonly commentBox = this.page.getByRole('textbox', { name: 'Write comment here' });

  constructor(page: Page) {
    super(page);
  }

  async navigateToSop(sopName: string) {
    await this.sopCard(sopName).click();
    await this.page.waitForLoadState('networkidle');
  }

  async performSearch(process: Process) {
    await this.searchButton.click();
    
    if (process.companyName) {
      await this.companyNameInput.fill(process.companyName);
    }
    
    if (process.trackingId) {
      await this.trackingIdInput.fill(process.trackingId);
    }
    
    await this.searchSubmitButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async executeAction(action: Process['action']) {
    await this.viewLink.click();
    await this.page.waitForLoadState('networkidle');

    switch (action) {
      case 'FORWARD':
        this.page.once('dialog', dialog => dialog.dismiss().catch(() => {}));
        await this.forwardButton.click();
        break;

      case 'REJECT': 
        this.page.once('dialog', dialog => dialog.dismiss().catch(() => {}));
        await this.rejectButton.click();
        break;
        
      case 'SHORTFALL':
        await this.commentBox.click();
        await this.commentBox.fill('issue found');
        this.page.once('dialog', dialog => dialog.dismiss().catch(() => {}));
        await this.shortfallButton.click();
        break;
    }

  }
}