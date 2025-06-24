// pages/sop-creation/sop-creation.page.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../../base.page";

export class LmsCreationPage extends BasePage {
    // Application Information
    readonly createNewAppButton: Locator;
    readonly ezNameDropdown: Locator;
    readonly parentCompanyInput: Locator;
    readonly establishmentDateInput: Locator;
    readonly parentCompanyAddressInput: Locator;
    
    // Focal Point Information
    readonly focalPoint1Name: Locator;
    readonly focalPoint1Mobile: Locator;
    readonly focalPoint1Designation: Locator;
    readonly focalPoint1Email: Locator;
    
    // Lease Information
    readonly leaseTypeDropdown: Locator;
    readonly productTypeDropdown: Locator;
    
    // Investment Information
    readonly investmentAmountInput: Locator;
    readonly investmentTypeDropdown: Locator;
    
    // Plot Information
    readonly plotSizeInput: Locator;
    readonly proposedPlotSizeInput: Locator;
    readonly plotTypeDropdown: Locator;
    
    // Document Upload
    readonly landCoordinatesUpload: Locator;
    readonly fileInput: Locator;
    
    // Terms and Submission
    readonly termsCheckbox: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        
        // Application Information
        this.createNewAppButton = page.getByRole('button', { name: 'create new application Create' });
        this.ezNameDropdown = page.getByText('EZ Name');
        this.parentCompanyInput = page.getByRole('textbox', { name: 'Parent Company *' });
        this.establishmentDateInput = page.locator('.input-group > input:nth-child(2)').first();
        this.parentCompanyAddressInput = page.getByRole('textbox', { name: 'Parent Company Address *' });
        
        // Focal Point Information
        this.focalPoint1Name = page.getByRole('textbox', { name: 'Name (Focal point 1) *' });
        this.focalPoint1Mobile = page.getByRole('textbox', { name: 'Mobile no. (Focal point 1) *' });
        this.focalPoint1Designation = page.getByRole('textbox', { name: 'Designation (Focal point 1) *' });
        this.focalPoint1Email = page.getByRole('textbox', { name: 'Email (Focal point 1) *' });
        
        // Lease Information
        this.leaseTypeDropdown = page.getByText('Lease Type', { exact: true });
        this.productTypeDropdown = page.getByRole('combobox').filter({ hasText: 'No choices to choose from' }).locator('div').first();
        
        // Investment Information
        this.investmentAmountInput = page.getByRole('textbox', { name: 'Proposed Investment Amount (In Million USD) , numeric only, *' });
        this.investmentTypeDropdown = page.getByText('Investment Type:');
        
        // Plot Information
        this.plotSizeInput = page.getByRole('textbox', { name: 'Plot Size (In Acre) , numeric only, *', exact: true });
        this.proposedPlotSizeInput = page.getByRole('textbox', { name: 'Proposed Plot Size (In Acre' });
        this.plotTypeDropdown = page.getByText('Plot type');
        
        // Document Upload
        this.landCoordinatesUpload = page.getByRole('link', { name: 'browse Browse to attach file for Land Coordinates. Allowed file types: image' });
        this.fileInput = page.locator('input[type="file"]');
        
        // Terms and Submission
        this.termsCheckbox = page.getByRole('checkbox', { name: 'I accept and agree to the' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
    }

    async navigate(url: string) {
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
    }

    async startNewApplication() {
        await this.createNewAppButton.click();
    }

    async fillApplicationInformation(data: {
        ezName: string;
        parentCompany: string;
        establishmentDate: string;
        parentCompanyAddress: string;
    }) {
        await this.ezNameDropdown.click();
        await this.page.getByRole('option', { name: data.ezName }).click();
        await this.parentCompanyInput.fill(data.parentCompany);
        await this.establishmentDateInput.fill(data.establishmentDate);
        await this.page.click('body'); // To close date picker if needed
        await this.parentCompanyAddressInput.fill(data.parentCompanyAddress);
    }

    async fillFocalPointInformation(data: {
        name: string;
        mobile: string;
        designation: string;
        email: string;
    }) {
        await this.focalPoint1Name.fill(data.name);
        await this.focalPoint1Mobile.fill(data.mobile);
        await this.focalPoint1Designation.fill(data.designation);
        await this.focalPoint1Email.fill(data.email);
    }

    async fillLeaseInformation(data: {
        leaseType: string;
        productType: string;
    }) {
        await this.leaseTypeDropdown.click();
        await this.page.getByRole('option', { name: data.leaseType }).click();
        await this.productTypeDropdown.click();
        await this.page.getByRole('option', { name: data.productType }).click();
    }

    async fillInvestmentInformation(data: {
        amount: string;
        type: string;
    }) {
        await this.investmentAmountInput.fill(data.amount);
        await this.investmentTypeDropdown.click();
        await this.page.getByRole('option', { name: data.type }).click();
    }

    async fillPlotInformation(data: {
        size: string;
        proposedSize: string;
        type: string;
    }) {
        await this.plotSizeInput.fill(data.size);
        await this.proposedPlotSizeInput.fill(data.proposedSize);
        await this.plotTypeDropdown.click();
        await this.page.getByRole('option', { name: data.type, exact: true }).click();
    }

    async uploadLandCoordinates(filePath: string) {
        await this.landCoordinatesUpload.click();
        await this.fileInput.setInputFiles(filePath);
    }

    async acceptTermsAndSubmit() {
        await this.termsCheckbox.check();
        await this.submitButton.click();
    }

    async completeSopCreation(applicationData: any, fileData: any) {
        await this.startNewApplication();
        await this.fillApplicationInformation({
            ezName: applicationData.ezName,
            parentCompany: applicationData.parentCompany,
            establishmentDate: applicationData.establishmentDate,
            parentCompanyAddress: applicationData.parentCompanyAddress
        });
        
        await this.fillFocalPointInformation({
            name: applicationData.focalPoint1.name,
            mobile: applicationData.focalPoint1.mobile,
            designation: applicationData.focalPoint1.designation,
            email: applicationData.focalPoint1.email
        });
        
        await this.fillLeaseInformation({
            leaseType: applicationData.leaseType,
            productType: applicationData.productType
        });
        
        await this.fillInvestmentInformation({
            amount: applicationData.investmentAmount,
            type: applicationData.investmentType
        });
        
        await this.fillPlotInformation({
            size: applicationData.plotSize,
            proposedSize: applicationData.proposedPlotSize,
            type: applicationData.plotType
        });
        
        await this.uploadLandCoordinates(fileData.landCoordinates);
        await this.acceptTermsAndSubmit();
    }
}