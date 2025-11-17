import { test, expect } from '@playwright/test';
import { MESSAGES, USERS } from "../data/form";

test.beforeEach(async ({ page }) => {
  await page.goto('/form');
});

test.skip('Fill form for multiple users', async ({ page }) => {
  for (const user of USERS) {
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
      for (const message of MESSAGES.success) {
        await expect(page.getByText(message)).toBeVisible();
      }
      
    });
  }
});

test('Display validation errors on empty form', async ({ page }) => {

  await test.step('Check validation messages after submitting empty form', async () => {
    await page.getByRole('button', { name: 'Send' }).click();

    // Check for fail messages
      for (const message of MESSAGES.fail) {
        await expect(page.getByText(message)).toBeVisible();
      }
  });

});