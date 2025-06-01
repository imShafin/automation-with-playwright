import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base.page";

export class HomePage extends BasePage {
    readonly dashboard: Locator;
    applications: Locator;

    constructor(page: Page) {
        super(page);
        this.applications = page.getByRole('button', { name: 'Applications' });
    }

    async navigate(url: string) {
        await this.page.goto(url);
        await this.applications.click();
        //await this.ICSOP.click();('button', { name: 'Investment Clearance' }).getByRole('link').click();
    }

    async operations() {
        await this.dashboard.click();
    }
}
