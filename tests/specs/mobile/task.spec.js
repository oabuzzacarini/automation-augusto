import { test } from '@playwright/test';
import { TASK_CASES } from '../../data/tasks.data.js';
import { TasksPage } from '../../pages/tasks.page.js';

// ===============================
// 🔹 TASKS TESTS - MOBILE
// ===============================
test.describe('TASKS - MOBILE', () => {

  test.beforeEach(async ({ page }) => {
    const tasks = new TasksPage(page);
    await tasks.navigateToTasks();
  });

  // ===============================
  // ➕ Add Task (Mobile)
  // ===============================
  test('add task mobile', async ({ page }) => {
    const tasks = new TasksPage(page);
    const { text } = TASK_CASES.ADD;

    await tasks.addTask(text);

    await tasks.expectTaskVisibleMobile(1, text);
    await tasks.expectPriorityMobile(1, 1);
  });

  // ===============================
  // ✏️ Edit Task (Mobile)
  // ===============================
  test('edit task mobile', async ({ page }) => {
    const tasks = new TasksPage(page);
    const { original, edited } = TASK_CASES.EDIT;

    await tasks.addTask(original);
    await tasks.editTaskMobile(1, edited);

    await tasks.expectTaskVisibleMobile(1, edited);
  });

});
