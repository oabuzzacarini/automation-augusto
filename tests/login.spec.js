import test, { expect } from "@playwright/test";
import { beforeEach } from "node:test";
import { USERS } from "./data/login";


test.beforeEach(async ({ page }) => {
  await page.goto('/login');
});

test('Login sucessful', async ({page})=>{

    await page.getByRole('textbox', {name: 'Type your username'}).fill(USERS.valid.username);
    await page.getByRole('textbox', {name: 'Type your password'}).fill(USERS.valid.password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText(USERS.valid.expect)).toBeVisible();
})

test('Incorret password', async ({page})=>{

    await page.getByRole('textbox', {name: 'Type your username'}).fill(USERS.invalid_pass.username);
    await page.getByRole('textbox', {name: 'Type your password'}).fill(USERS.invalid_pass.password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText(USERS.invalid_pass.expect)).toBeVisible();
})

test('Incorret user', async ({page})=>{

    await page.getByRole('textbox', {name: 'Type your username'}).fill(USERS.invalid_user.username);
    await page.getByRole('textbox', {name: 'Type your password'}).fill(USERS.invalid_user.password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText(USERS.invalid_user.expect)).toBeVisible();
})

test('Blocked Account', async ({page})=>{

    await page.getByRole('textbox', {name: 'Type your username'}).fill(USERS.blocked.username);
    await page.getByRole('textbox', {name: 'Type your password'}).fill(USERS.blocked.password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText(USERS.blocked.expect)).toBeVisible();
 
})

test('Incorrect Pass 3x', async ({page})=>{

    await page.getByRole('textbox', {name: 'Type your username'}).fill(USERS.invalid_pass.username);
    await page.getByRole('textbox', {name: 'Type your password'}).fill(USERS.invalid_pass.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText(USERS.invalid_pass.expect)).toBeVisible();
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText(USERS.invalid_pass.expect)).toBeVisible();
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText(USERS.invalid_pass.expect_block)).toBeVisible();
 
})

test('Logout', async ({page})=>{

    await page.getByRole('textbox', {name: 'Type your username'}).fill(USERS.valid.username);
    await page.getByRole('textbox', {name: 'Type your password'}).fill(USERS.valid.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText(USERS.valid.expect)).toBeVisible();

    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page.getByText(USERS.valid.expect_logout)).toBeVisible();
    
})