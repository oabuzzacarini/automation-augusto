import test from '@playwright/test';
import { FormPage } from '../../../pages/form.page';
import { MESSAGES, USERS } from '../../../data/form';

// ===============================
// 🔹 FORM - MULTIPLE USERS
// ===============================
test.skip('FORM FILLING', async () => {
  for (const user of USERS) {
    test(`${user.scenario} | ${user.name} | ${user.country} | ${user.gender}`, async ({ page }) => {
      const form = new FormPage(page);

      // ===============================
      // 🔹 Navigate to Form Page
      // ===============================
      await form.navigateToForm();

      // ===============================
      // ✏️ Fill User Fields
      // ===============================
      await form.fillFields(user);

      // ===============================
      // ✅ Select Hobbies / Interests
      // ===============================
      await form.selectHobbies(user.interests);

      // ===============================
      // ➕ Click Send Button
      // ===============================
      await form.clickSendButton();

      // ===============================
      // 🔍 Validate Success Messages
      // ===============================
      await form.validateMessages(MESSAGES.success);
    });
  }
});

// ===============================
// ❌ FORM - ERROR VALIDATION
// ===============================
test.describe('FORM - ERROR', () => {
  test('Required validation messages (empty form)', async ({ page }) => {
    const form = new FormPage(page);

    // ===============================
    // 🔹 Navigate to Form Page
    // ===============================
    await form.navigateToForm();

    // ===============================
    // ➕ Click Send Button Without Filling Form
    // ===============================
    await form.clickSendButton();

    // ===============================
    // 🔍 Validate Fail Messages
    // ===============================
    await form.validateMessages(MESSAGES.fail);
  });
});
