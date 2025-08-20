import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";

async function fillDateField(page: Page, fieldName: string, value: string) {
  const selector = `input[name="data[${fieldName}]"] + input[type="text"]`;
  await page.locator(selector).fill(value);
}


export class SignUpPage extends BasePage {
    // Personal Information
    readonly nameInput: Locator;
    readonly typeDropdown: Locator;
    readonly economicZoneDropdown: Locator;
    readonly zoneNameDropdown: Locator;
    readonly landLeaseCheckbox: Locator;
    
    // Identity Information
    readonly nationalityDropdown: Locator;
    readonly passportRadio: Locator;
    readonly passportNoInput: Locator;
    readonly nationalIdRadio: Locator;
    readonly nationalIdInput: Locator;
    readonly dobInput: Locator;
    readonly designationInput: Locator;
    
    // Address Information
    readonly countryDropdown: Locator;
    readonly divisionDropdown: Locator;
    readonly districtDropdown: Locator;
    readonly addressInput: Locator;
    
    // Contact Information
    readonly phoneCountryDropdown: Locator;
    readonly mobileNumberInput: Locator;
    
    // Company Information
    readonly companyTypeDropdown: Locator;
    readonly companyNameInput: Locator;
    readonly companyCountryNameDropdown: Locator;

    // Document Uploads
    readonly moaUpload: Locator;
    readonly landLeaseUpload: Locator;
    readonly aoaUpload: Locator;
    readonly formXiiUpload: Locator;
    readonly authLetterUpload: Locator;
    readonly idUpload: Locator;
    readonly photoUpload: Locator;
    
    // Account Information
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly termsCheckbox: Locator;
    
    // Submit Button
    readonly submitButton: Locator;
    
    // File Upload Input
    readonly fileInput: Locator;

    constructor(page: Page) {
        super(page);
        
        // Personal Information
        this.nameInput = page.getByRole('textbox', { name: 'Name: *', exact: true });
        this.typeDropdown = page.getByText('Enter your typeRemove item');
        this.economicZoneDropdown = page.getByText('Select your economic zoneRemove item');
        this.zoneNameDropdown = page.getByText('Select zone nameSelect zone');
        this.landLeaseCheckbox = page.getByRole('checkbox', { name: 'Does have Land Lease Agreement' });
        
        // Identity Information
        this.nationalityDropdown = page.getByText('Select your nationalityRemove');
        this.passportRadio = page.getByRole('radio', { name: 'Password' });
        this.passportNoInput = page.getByRole('textbox', { name: 'Passport No: *' });
        this.nationalIdRadio = page.getByRole('radio', { name: 'National ID' });
        this.nationalIdInput = page.getByRole('textbox', { name: 'National ID: *' });
        this.designationInput = page.getByRole('textbox', { name: 'Designation: *' });
        
        // Address Information
        this.countryDropdown = page.getByText('Select your countryRemove item');
        this.divisionDropdown = page.getByText('Select your divisionRemove');
        this.districtDropdown = page.getByText('Select your districtRemove');
        this.addressInput = page.getByRole('textbox', { name: 'Address Line 1: *' });
        
        // Contact Information
        this.phoneCountryDropdown = page.getByText('Select countryRemove item');
        this.mobileNumberInput = page.getByRole('textbox', { name: 'Enter mobile number' });
        
        // Company Information
        this.companyTypeDropdown = page.getByText('Select a company typeRemove');
        this.companyNameInput = page.getByRole('textbox', { name: 'Company Name: *' });
        this.companyCountryNameDropdown = page.getByText('Select a countryRemove item');
        
        // Document Uploads
        this.moaUpload = page.getByRole('link', { name: 'browse Browse to attach file for Copy of MOA:' });
        this.landLeaseUpload = page.getByRole('link', { name: 'browse Browse to attach file for Land lease agreement:' });
        this.aoaUpload = page.getByRole('link', { name: 'browse Browse to attach file for Copy of AoA:' });
        this.formXiiUpload = page.getByRole('link', { name: 'browse Browse to attach file for Details of Signatory (Form XII):' });
        this.authLetterUpload = page.getByRole('link', { name: 'browse Browse to attach file for Authorization Letter' });
        this.idUpload = page.getByRole('link', { name: 'browse Browse to attach file for Scan of NID/Passport:' });
        this.photoUpload = page.getByRole('link', { name: 'browse Browse to attach file' });
        
        // Account Information
        this.emailInput = page.getByRole('textbox', { name: 'User Email: *' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password: *', exact: true });
        this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password: *' });
        this.termsCheckbox = page.getByRole('checkbox', { name: 'I have read and agree to the' });
        
        // Submit Button
        this.submitButton = page.getByRole('button', { name: 'SUBMIT' });
        
        // File Upload Input
        this.fileInput = page.locator('input[type="file"]');
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async fillPersonalInformation(data: {
        name: string;
        type: string;
        economicZone: string;
        zoneName: string;
        hasLandLease: boolean;
    }) {
        await this.page.waitForTimeout(500); // Optional: small wait for stability
        await this.nameInput.fill(data.name);
        await this.typeDropdown.click();
        await this.page.waitForTimeout(1000);
        await this.page.getByText(data.type).click();
        await this.economicZoneDropdown.click();
        await this.page.getByRole('option', { name: data.economicZone }).click();
        await this.page.waitForTimeout(1000); // Optional: small wait for stability
        await this.zoneNameDropdown.click();
        await this.page.getByText(data.zoneName).click();
        if (data.hasLandLease) {
            await this.landLeaseCheckbox.check();
        }
    }

    async fillIdentityInformation(data: {
        nationality: string;
        idType: string;
        passportNo: string;
        nationalId: string;
        dob: string;
        designation: string;
    }) {
        await this.nationalityDropdown.click();
        await this.page.getByRole('option', { name: data.nationality }).click();

        if (data.idType === 'National ID') {
            await this.nationalIdRadio.check();
            await this.nationalIdInput.fill(data.nationalId);
        } else {
            await this.passportNoInput.fill(data.passportNo);
        }
        
        await fillDateField(this.page, 'userDateOfBirth', data.dob);

        await this.designationInput.fill(data.designation);
    }

    async fillAddressInformation(data: {
        country: string;
        division: string;
        district: string;
        address: string;
    }) {
        await this.countryDropdown.click();
        await this.page.getByRole('option', { name: data.country }).click();
        await this.divisionDropdown.click();
        await this.page.getByRole('option', { name: data.division }).click();
        await this.districtDropdown.click();
        await this.page.getByRole('option', { name: data.district }).click();
        await this.addressInput.fill(data.address);
    }

    async fillContactInformation(data: {
        phoneCountry: string;
        mobileNumber: string;
    }) {
        await this.phoneCountryDropdown.click();
        await this.page.getByRole('option', { name: data.phoneCountry }).click();
        await this.mobileNumberInput.fill(data.mobileNumber);
    }

    async fillCompanyInformation(data: {
        companyType: string;
        companyName: string;
        companyCountryName: string;
    }) {
        await this.companyTypeDropdown.click();
        await this.page.getByRole('option', { name: data.companyType }).click();
        await this.companyNameInput.fill(data.companyName);
        await this.companyCountryNameDropdown.click();
        await this.page.getByRole('option', { name: data.companyCountryName }).click();
    }

    async uploadDocuments(documentPath: string, imagePath: string) {
        const upload = async (locator: Locator, filePath: string) => {
            const [fileChooser] = await Promise.all([
                this.page.waitForEvent('filechooser'),
                locator.click()
            ]);
            await fileChooser.setFiles(filePath);
            await this.page.waitForTimeout(300); // Optional: small wait for stability
        };

        await upload(this.moaUpload, documentPath);
        await upload(this.landLeaseUpload, documentPath);
        await upload(this.aoaUpload, documentPath);
        await upload(this.formXiiUpload, documentPath);
        await upload(this.authLetterUpload, documentPath);
        await upload(this.idUpload, documentPath);
        await upload(this.photoUpload, imagePath);
    }

    async fillAccountInformation(data: {
        email: string;
        password: string;
        confirmPassword: string;
        acceptTerms: boolean;
    }) {
        await this.emailInput.fill(data.email);
        await this.passwordInput.fill(data.password);
        await this.confirmPasswordInput.fill(data.confirmPassword);
        if (data.acceptTerms) {
            await this.termsCheckbox.check();
        }
    }

    async submitRegistration() {
        await this.submitButton.click();
    }

    async completeRegistration(userData: any, fileData: any) {
        await this.fillPersonalInformation({
            name: userData.name,
            type: userData.type,
            economicZone: userData.economicZone,
            zoneName: userData.zoneName,
            hasLandLease: true
        });
        await this.fillIdentityInformation({
            nationality: userData.nationality,
            idType: userData.idType,
            passportNo: userData.passportNo,
            nationalId: userData.nationalId,
            dob: userData.dob,
            designation: userData.designation
        });
        await this.fillAddressInformation({
            country: userData.country,
            division: userData.division,
            district: userData.district,
            address: userData.address
        });
        await this.fillContactInformation({
            phoneCountry: userData.phoneCountry,
            mobileNumber: userData.mobileNumber
        });
        await this.fillCompanyInformation({
            companyType: userData.companyType,
            companyName: userData.companyName,
            companyCountryName: userData.companyCountryName

        });
        await this.uploadDocuments(fileData.documentPath, fileData.imagePath);
        await this.fillAccountInformation({
            email: userData.email,
            password: userData.password,
            confirmPassword: userData.confirmPassword,
            acceptTerms: true
        });       
        await this.submitRegistration();
    }
}




