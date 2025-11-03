import { test, expect } from "@playwright/test";
import { USERS } from "./data/login";

async function performLogin(page, username, password) {
  await test.step('Fill in login credentials', async () => {
    await page.getByRole('textbox', { name: 'Type your username' }).fill(username);
    await page.getByRole('textbox', { name: 'Type your password' }).fill(password);
  });

  await test.step('Submit the login form', async () => {
    await page.getByRole('button', { name: 'Login' }).click();
  });
}

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
});

test('Login successful', async ({ page }) => {
  await performLogin(page, USERS.valid.username, USERS.valid.password);

  await test.step('Validate successful login', async () => {
    await expect(page.getByText(USERS.valid.expect)).toBeVisible();
  });
});

test('Incorrect password', async ({ page }) => {
  await performLogin(page, USERS.invalid_pass.username, USERS.invalid_pass.password);

  await test.step('Validate incorrect password', async () => {
    await expect(page.getByText(USERS.invalid_pass.expect)).toBeVisible();
  });
});

test('Incorrect user', async ({ page }) => {
  await performLogin(page, USERS.invalid_user.username, USERS.invalid_user.password);

  await test.step('Validate incorrect user', async () => {
    await expect(page.getByText(USERS.invalid_user.expect)).toBeVisible();
  });
});

test('Blocked account', async ({ page }) => {
  await performLogin(page, USERS.blocked.username, USERS.blocked.password);

  await test.step('Validate blocked account', async () => {
    await expect(page.getByText(USERS.blocked.expect)).toBeVisible();
  });
});

test('Incorrect password 3 times', async ({ page }) => {
  await performLogin(page, USERS.invalid_pass.username, USERS.invalid_pass.password);

  await test.step('Submit the form 3 times', async () => {
    for (let i = 0; i < 1; i++) {
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.getByText(USERS.invalid_pass.expect)).toBeVisible();
    }
    await page.getByRole('button', { name: 'Login' }).click();
  });

  await test.step('Validate account blocked after 3 failed attempts', async () => {
    await expect(page.getByText(USERS.invalid_pass.expect_block)).toBeVisible();
  });
});

test('Logout', async ({ page }) => {
  await performLogin(page, USERS.valid.username, USERS.valid.password);

  await test.step('Validate successful login', async () => {
    await expect(page.getByText(USERS.valid.expect)).toBeVisible();
  });

  await test.step('Click the logout button', async () => {
    await page.getByRole('button', { name: 'Logout' }).click();
  });

  await test.step('Validate successful logout', async () => {
    await expect(page.getByText(USERS.valid.expect_logout)).toBeVisible();
  });
});