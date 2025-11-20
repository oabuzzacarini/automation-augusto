// @ts-check
import { test, expect } from '@playwright/test';

/**
 * 🔹 Test: Validate page title
 */
test('🔹 has title', async ({ page }) => {
  // 🌐 Navigate to the Playwright homepage
  await page.goto('https://playwright.dev/');

  // 🎯 Expect the page title to contain the word "Playwright"
  await expect(page).toHaveTitle(/Playwright/);
});

/**
 * 🔹 Test: Verify "Get started" link navigation
 */
test('🔹 get started link', async ({ page }) => {
  // 🌐 Navigate to the Playwright homepage
  await page.goto('https://playwright.dev/');

  // 🖱 Click the "Get started" link (identified by its role and name)
  await page.getByRole('link', { name: 'Get started' }).click();

  // ✅ Assert that the resulting page has a visible heading named "Installation"
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
