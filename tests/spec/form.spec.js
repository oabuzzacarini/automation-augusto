import { test, expect } from '@playwright/test';
import { messages_form, users_form } from "../data/form";

test.beforeEach(async ({ page }) => {
  await page.goto('/form');
});

test('Fill form for multiple users', async ({ page }) => {
  for (const user of users_form) {
    await test.step(`Filling out form for ${user.name}`, async () => {
      await page.goto('/form'); // ensure a clean start

      await page.getByRole('textbox', { name: 'Name *' }).fill(user.name);
      await page.getByRole('textbox', { name: 'Email *' }).fill(user.email);
      await page.getByRole('textbox', { name: 'Password *' }).fill(user.password);
      await page.getByLabel('Country *').selectOption(user.country);

      // Select gender (assuming label text matches exactly)
      await page.getByRole('radio', { name: user.gender, exact: true }).check();

      // Select interests, if any
      for (const interest of user.interests) {
        if (interest) await page.getByText(interest).click();
      }

      await page.getByRole('button', { name: 'Send' }).click();

      // Check for success messages
      for (const message of messages_form.success) {
        await expect(page.getByText(message)).toBeVisible();
      }
      
    });
  }
});

test('Display validation errors on empty form', async ({ page }) => {

  await test.step('Check validation messages after submitting empty form', async () => {
    await page.getByRole('button', { name: 'Send' }).click();

    // Check for fail messages
      for (const message of messages_form.fail) {
        await expect(page.getByText(message)).toBeVisible();
      }
  });

});