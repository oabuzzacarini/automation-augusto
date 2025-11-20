import { test, expect } from '@playwright/test';

// ===============================
// 🔹 Menu LOGIN validation
// ===============================
test('Menu LOGIN validation', async ({ page }) => { 
  // 🔹 Navigate to the playground home page
  await page.goto('');
  await expect(page).toHaveTitle("Playground page");  

  // 🔹 Click the LOGIN link in the menu
  await page.getByRole('link', { name: 'LOGIN' }).click();

  // 🔹 Validate that the LOGIN page heading is visible and correct
  await expect(page.getByRole('heading', { name: 'LOGIN' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'LOGIN' })).toHaveText("Login");
});

// ===============================
// 🔹 Menu FORM validation
// ===============================
test('Menu FORM validation', async ({ page }) => { 
  // 🔹 Navigate to the playground home page
  await page.goto('');
  await expect(page).toHaveTitle("Playground page");  

  // 🔹 Click the FORM link in the menu
  await page.getByRole('link', { name: 'FORM' }).click();

  // 🔹 Validate that the FORM page heading is visible
  await expect(page.getByRole('heading', { name: 'FORM' })).toBeVisible();
});
