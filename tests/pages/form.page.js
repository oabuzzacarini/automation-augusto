import test, { expect } from '@playwright/test';

export class FormPage {
  constructor(page) {
    this.page = page;
    this.header = page.getByRole('heading', { name: 'Form' });
    this.nameInput = page.getByRole('textbox', { name: 'Name *' });
    this.emailInput = page.getByRole('textbox', { name: 'Email *' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
    this.countrySelect = page.getByLabel('Country *');
    this.genderRadio = (value) =>
       page.locator(`input[name="gender"][value="${value}"]`);
    this.genderGroup = page.locator('#genderGroup');
    this.sendButton = page.getByRole('button', { name: 'Send' });
    this.successTitle = page.getByText('Success!');
    this.successBody = page.getByText('The form has been submitted');
  }

  async navigateToForm() {
    await test.step('Navigate to form page', async () => {
      await this.page.goto('/form');
      await this.header.waitFor({ state: 'visible' });
    });
  }

  async fillFields(user) {
     await test.step('Fill Some Fields)', async () => {
        await this.nameInput.fill(user.name);
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.countrySelect.selectOption(user.country);
        await this.genderRadio(user.genderValue).check();
     });
  }

  async selectHobbies(hobbies) {
    await test.step('Select hobbies (if any)', async () => {
      for (const hobby of hobbies){
        await this.page.getByText(hobby).click();
      }
    });
  }

  async clickSendButton() {
    await test.step('Submit form', async () => {
      await this.sendButton.click();
    });
  }

  async validateMessages(messages) {
     await test.step('Validate field messages', async () => {
      for (const message of messages) {
        await expect(this.page.getByText(message)).toBeVisible();
      }
    });
  }
}