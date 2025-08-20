import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";

export class LogoutPage extends BasePage {
    readonly userButton: Locator;
    readonly logoutButton: Locator;
    
    constructor(page: Page) {
        super(page);
        const element = page.locator('div').filter({ hasText: /^\w+$/ }); // matches any word text  
        const username = element.innerText();
        this.userButton = page.locator('div').filter({ hasText: /^{username}$/ });
        this.logoutButton = page.getByText('Logout');
    }

    async logout() {
        await this.userButton.click();
        await this.logoutButton.click();
    }
}
