import test, { expect } from '@playwright/test';

/**
 * Page Object Model (POM) for the /form page.
 * This class exposes:
 * - 📌 Navigation utilities
 * - ✏️ Actions to interact with the form
 * - 🔍 Assertions for validation
 * - 🎯 Fixed and dynamic locators
 */
export class FormPage {
  constructor(page) {
    this.page = page;

    // ===== Fixed locators =====
    this.header = page.getByRole('heading', { name: 'Form' });
    this.nameInput = page.getByRole('textbox', { name: 'Name *' });
    this.emailInput = page.getByRole('textbox', { name: 'Email *' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
    this.countrySelect = page.getByLabel('Country *');
    this.genderGroup = page.locator('#genderGroup');
    this.sendButton = page.getByRole('button', { name: 'Send' });
    this.successTitle = page.getByText('Success!');
    this.successBody = page.getByText('The form has been submitted');

    // ===== Dynamic locators (by ID) =====
    this.genderRadio = (value) =>
       page.locator(`input[name="gender"][value="${value}"]`);
  }

  // ===============================
  // 🔹 Navigation
  // ===============================

  /**
   * Navigate to the /form page and validate it is loaded.
   */
  async navigateToForm() {
    await test.step('Navigate to form page', async () => {
      await this.page.goto('/form');
      await this.header.waitFor({ state: 'visible' });
    });
  }

  // ===============================
  // 🔹 Generic Actions
  // ===============================

  /**
   * Fill the form fields with user data (does not submit).
   * @param {Object} user - The user object containing form data.
   * @param {string} user.name - Name of the user to type in the name field.
   * @param {string} user.email - Email of the user to type in the email field.
   * @param {string} user.password - Password of the user to type in the password field.
   * @param {string} user.country - Country value to select in the dropdown.
   * @param {string} user.genderValue - Gender value to select using radio buttons.
   */
  async fillFields(user) {
    await test.step('Fill form fields', async () => {
      await this.nameInput.fill(user.name);
      await this.emailInput.fill(user.email);
      await this.passwordInput.fill(user.password);
      await this.countrySelect.selectOption(user.country);
      await this.genderRadio(user.genderValue).check();
    });
  }

  /**
   * Select hobbies (if any) from the available options.
   * @param {string[]} hobbies - Array of hobbies to select.
   */
  async selectHobbies(hobbies) {
    await test.step('Select hobbies (if any)', async () => {
      for (const hobby of hobbies) {
        await this.page.getByText(hobby).click();
      }
    });
  }

  /**
   * Click the send button to submit the form.
   */
  async clickSendButton() {
    await test.step('Submit form', async () => {
      await this.sendButton.click();
    });
  }

  /**
   * Validate that the expected messages are visible on the page.
   * @param {string[]} messages - Array of messages to check for visibility.
   */
  async validateMessages(messages) {
    await test.step('Validate field messages', async () => {
      for (const message of messages) {
        await expect(this.page.getByText(message)).toBeVisible();
      }
    });
  }
}
