import test, { expect } from "@playwright/test";
import { beforeEach } from "node:test";
import { USERS } from "./data/login";


test.beforeEach(async ({ page }) => {
  await page.goto('/login');
});

test('Login successful', async ({ page }) => {

  await test.step('Fill in login credentials', async () => {
    await page.getByRole('textbox', { name: 'Type your username' }).fill(USERS.valid.username);
    await page.getByRole('textbox', { name: 'Type your password' }).fill(USERS.valid.password);
  });

  await test.step('Submit the login form', async () => {
    await page.getByRole('button', { name: 'Login' }).click();
  });

  await test.step('Validate successful login', async () => {
    await expect(page.getByText(USERS.valid.expect)).toBeVisible();
  });

})

test('Incorret password', async ({page})=>{

   await test.step('Fill in login credentials', async () => {
    await page.getByRole('textbox', {name: 'Type your username'}).fill(USERS.invalid_pass.username);
    await page.getByRole('textbox', {name: 'Type your password'}).fill(USERS.invalid_pass.password);
   });

   await test.step('Submit the login form', async () => {
    await page.getByRole('button', { name: 'Login' }).click();
   });

   await test.step('Validate incorrect password', async () => {
    await expect(page.getByText(USERS.invalid_pass.expect)).toBeVisible();
   });

})

test('Incorret user', async ({page})=>{

   await test.step('Fill in login credentials', async () => {
    await page.getByRole('textbox', {name: 'Type your username'}).fill(USERS.invalid_user.username);
    await page.getByRole('textbox', {name: 'Type your password'}).fill(USERS.invalid_user.password);
   });

   await test.step('Submit the login form', async () => {
    await page.getByRole('button', { name: 'Login' }).click();
   });

   await test.step('Validate incorrect user', async () => {
    await expect(page.getByText(USERS.invalid_user.expect)).toBeVisible();
   });
})

test('Blocked Account', async ({page})=>{

   await test.step('Fill in login credentials', async () => {
    await page.getByRole('textbox', {name: 'Type your username'}).fill(USERS.blocked.username);
    await page.getByRole('textbox', {name: 'Type your password'}).fill(USERS.blocked.password);
   });

   await test.step('Submit the login form', async () => {
    await page.getByRole('button', { name: 'Login' }).click();
   });

   await test.step('Validate Blocked Account', async () => {
    await expect(page.getByText(USERS.blocked.expect)).toBeVisible();
   });

})

test('Incorrect Pass 3x', async ({page})=>{

   await test.step('Fill in login credentials', async () => {
    await page.getByRole('textbox', {name: 'Type your username'}).fill(USERS.invalid_pass.username);
    await page.getByRole('textbox', {name: 'Type your password'}).fill(USERS.invalid_pass.password);
   });

   await test.step('Submit many times the login form', async () => {
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText(USERS.invalid_pass.expect)).toBeVisible();
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText(USERS.invalid_pass.expect)).toBeVisible();
    await page.getByRole('button', { name: 'Login' }).click();
   });

   await test.step('Validate incorrect password after many attempts', async () => {
    await expect(page.getByText(USERS.invalid_pass.expect_block)).toBeVisible();
   });

})

test('Logout', async ({page})=>{
  
   await test.step('Fill in login credentials', async () => {
    await page.getByRole('textbox', { name: 'Type your username' }).fill(USERS.valid.username);
    await page.getByRole('textbox', { name: 'Type your password' }).fill(USERS.valid.password);
   });

   await test.step('Submit the login form', async () => {
    await page.getByRole('button', { name: 'Login' }).click();
   });

   await test.step('Validate successful login', async () => {
    await expect(page.getByText(USERS.valid.expect)).toBeVisible();
   });

   await test.step('Submit the logout button', async () => {
    await page.getByRole('button', { name: 'Logout' }).click();
   });

   await test.step('Validate successful logout', async () => {
    await expect(page.getByText(USERS.valid.expect_logout)).toBeVisible();
   });

})