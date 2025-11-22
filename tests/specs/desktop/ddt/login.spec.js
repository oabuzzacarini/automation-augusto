import { test, expect } from "@playwright/test";
import { USERS } from "../../../data/login";

/**
* Helper function to perform login
* @param page - Playwright Page object
* @param username - Username to type in
* @param password - Password to type in
*/
async function performLogin(page, username, password) {
  await test.step('📝 Fill in login credentials', async () => {
    await page.getByRole('textbox', { name: 'Type your username' }).fill(username);
    await page.getByRole('textbox', { name: 'Type your password' }).fill(password);
  });

  await test.step('🖱 Submit the login form', async () => {
    await page.getByRole('button', { name: 'Login' }).click();
  });
}

/**
* Before each test
* Navigate to the login page to start fresh.
*/
test.beforeEach(async ({ page }) => {
  await page.goto('/login');
});

/**
* Test: Successful login
*/
test('Login successful', async ({ page }) => {
  await performLogin(page, USERS.valid.username, USERS.valid.password);

  await test.step('Validate successful login', async () => {
    await expect(page.getByText(USERS.valid.expect)).toBeVisible();
  });
});

/**
* Test: Incorrect password
*/
test('Incorrect password', async ({ page }) => {
  await performLogin(page, USERS.invalid_pass.username, USERS.invalid_pass.password);

  await test.step('❌ Validate incorrect password message', async () => {
    await expect(page.getByText(USERS.invalid_pass.expect)).toBeVisible();
  });
});

/**
* Test: Incorrect username
*/
test('Incorrect user', async ({ page }) => {
  await performLogin(page, USERS.invalid_user.username, USERS.invalid_user.password);

  await test.step('Validate incorrect user message', async () => {
    await expect(page.getByText(USERS.invalid_user.expect)).toBeVisible();
  });
});

/**
* Test: Blocked account
*/
test('Blocked account', async ({ page }) => {
  await performLogin(page, USERS.blocked.username, USERS.blocked.password);

  await test.step('Validate blocked account message', async () => {
    await expect(page.getByText(USERS.blocked.expect)).toBeVisible();
  });
});

/**
* Test: Incorrect password 3 times triggers account block
*/
test('Incorrect password 3 times', async ({ page }) => {
  await performLogin(page, USERS.invalid_pass.username, USERS.invalid_pass.password);

  await test.step('Submit the form 3 times', async () => {
    for (let i = 0; i < 1; i++) {
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.getByText(USERS.invalid_pass.expect)).toBeVisible();
    }
    await page.getByRole('button', { name: 'Login' }).click(); // 3rd click
  });

  await test.step('Validate account blocked after 3 failed attempts', async () => {
    await expect(page.getByText(USERS.invalid_pass.expect_block)).toBeVisible();
  });
});

/**
* Test: Logout after successful login
*/
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
