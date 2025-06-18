import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base.page";

interface UserRegistrationData {
  gender: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class RegisterPage extends BasePage {
    readonly maleGenderRadio: Locator;
    readonly femaleGenderRadio: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    readonly registerButton: Locator;
    
    constructor(page: Page) {
        super(page);
        this.maleGenderRadio = page.getByRole('radio', { name: 'Male', exact: true });
        this.femaleGenderRadio = page.getByRole('radio', { name: 'Female' });
        this.firstName = page.getByRole('textbox', { name: 'First name:' });
        this.lastName = page.getByRole('textbox', { name: 'Last name:' });
        this.email = page.getByRole('textbox', { name: 'Email:' });
        this.password = page.getByRole('textbox', { name: 'Password:', exact: true });
        this.confirmPassword = page.getByRole('textbox', { name: 'Confirm password:' });
        this.registerButton = page.getByRole('button', { name: 'Register' });
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async register(userData: UserRegistrationData) {
        if (userData.gender === 'Male') {
            await this.maleGenderRadio.check();
        } else {
            await this.femaleGenderRadio.check();
        }
        
        await this.firstName.fill(userData.firstName);
        await this.lastName.fill(userData.lastName);
        await this.email.fill(userData.email);
        await this.password.fill(userData.password);
        await this.confirmPassword.fill(userData.confirmPassword);
        await this.registerButton.click();
    }
}