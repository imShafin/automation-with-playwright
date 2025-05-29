import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base.page";

export class HomePage extends BasePage {
    readonly dashboard: Locator;

    constructor(page: Page) {
        super(page);
        this.dashboard = page.getByRole('button', { name: 'Applications' });
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async operations() {
        await this.dashboard.click();
    }
}
