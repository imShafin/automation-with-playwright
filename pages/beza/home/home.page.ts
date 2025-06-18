import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";

export class HomePage extends BasePage {
    readonly dashboard: Locator;
    readonly applications: Locator;
    readonly investmentClearance: Locator;
    readonly investmentClearanceView: Locator;
    readonly nextButton: Locator;

    constructor(page: Page) {
        super(page);
        this.applications = page.getByRole('button', { name: 'Applications' });
        this.investmentClearance = page.getByRole('button', { name: 'Investment Clearance' });
        this.investmentClearanceView = page.getByRole('link', { name: 'VIEW' });
        this.nextButton = page.getByRole('button', { name: 'Next button. Click to go to' });
    }

    async navigate(url: string) {
        await this.page.goto(url);
        await this.applications.click();
        await this.investmentClearance.click();
        await this.investmentClearanceView.click();
        await this.nextButton.click();
    }

    async operations() {
        await this.dashboard.click();
    }
}
