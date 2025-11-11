import test from '@playwright/test';
import { FormPage } from '../pages/form.page';
import {messages_form, users_form } from '../data/form';

test.describe('FORM FILLING', async () => {
  for (const user of users_form) {
    test(`${user.scenario} | ${user.name} | ${user.country} | ${user.gender}`, async ({page}) => {
      const form = new FormPage(page);

      await form.navigateToForm();
      await form.fillFields(user);
      await form.selectHobbies(user.interests);
      await form.clickSendButton();
      await form.validateMessages(messages_form.success);
    });
  }
});

test.describe('FORM - ERROR', () => {
  test('Required validation messages (empty form)', async ({ page }) => {
    const form = new FormPage(page);

    await form.navigateToForm();
    await form.clickSendButton();
    await form.validateMessages(messages_form.fail);
  });
});