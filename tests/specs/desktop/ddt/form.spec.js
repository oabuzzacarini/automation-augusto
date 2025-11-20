import { test, expect } from '@playwright/test';
import { MESSAGES, USERS } from "../../../data/form";

/**
 * 🔹 Before each test
 * Navigate to the /form page to start from a clean state.
 */
test.beforeEach(async ({ page }) => {
  await page.goto('/form');
});

/**
 * 🔹 Test: Fill the form for multiple users
 * Loops over USERS array and fills out the form for each user.
 */
test.skip('🔹 Fill form for multiple users', async ({ page }) => {
  for (const user of USERS) {
    await test.step(`Filling out form for ${user.name}`, async () => {
      // 🌐 Ensure a fresh page for each user
      await page.goto('/form');

      // 📝 Fill basic fields
      await page.getByRole('textbox', { name: 'Name *' }).fill(user.name);
      await page.getByRole('textbox', { name: 'Email *' }).fill(user.email);
      await page.getByRole('textbox', { name: 'Password *' }).fill(user.password);
      await page.getByLabel('Country *').selectOption(user.country);

      // ⚪ Select gender radio button (exact match)
      await page.getByRole('radio', { name: user.gender, exact: true }).check();

      // ✅ Select multiple interests, if any
      for (const interest of user.interests) {
        if (interest) await page.getByText(interest).click();
      }

      // 🖱 Click "Send" button
      await page.getByRole('button', { name: 'Send' }).click();

      // 🎯 Assert success messages are visible
      for (const message of MESSAGES.success) {
        await expect(page.getByText(message)).toBeVisible();
      }
    });
  }
});

/**
 * 🔹 Test: Display validation errors on empty form
 */
test('🔹 Display validation errors on empty form', async ({ page }) => {
  await test.step('Submit empty form and check validation messages', async () => {
    // 🖱 Click "Send" without filling anything
    await page.getByRole('button', { name: 'Send' }).click();

    // ❌ Assert failure messages are visible
    for (const message of MESSAGES.fail) {
      await expect(page.getByText(message)).toBeVisible();
    }
  });
});
