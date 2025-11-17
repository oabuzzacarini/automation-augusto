import test from '@playwright/test';
import { FormPage } from '../pages/form.page';
import {MESSAGES, USERS } from '../data/form';

test.skip('FORM FILLING', async () => {
  for (const user of USERS) {
    test(`${user.scenario} | ${user.name} | ${user.country} | ${user.gender}`, async ({page}) => {
      const form = new FormPage(page);

      await form.navigateToForm();
      await form.fillFields(user);
      await form.selectHobbies(user.interests);
      await form.clickSendButton();
      await form.validateMessages(MESSAGES.success);
    });
  }
});

test.describe('FORM - ERROR', () => {
  test('Required validation messages (empty form)', async ({ page }) => {
    const form = new FormPage(page);

    await form.navigateToForm();
    await form.clickSendButton();
    await form.validateMessages(MESSAGES.fail);
  });
});