import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import testdata  from "../../fixtures/testdata.json";

export class LoginPage extends BasePage {
    readonly email: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    

    constructor(page: Page) {
        super(page);
        this.email = page.getByRole('textbox', { name: 'Email' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Log In'});
    }

    async navigate() {
        await this.page.goto(testdata["validUser"]["baseurl"]);
    }

    async login(email: string, password: string) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}

//workflow management