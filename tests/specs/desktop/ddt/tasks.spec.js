import { test } from '@playwright/test';
import { TasksPage } from '../../../pages/tasks.page';
import { TASK_CASES } from '../../../data/tasks.data';

// ===============================
// 🔹 TASKS - DESKTOP TESTS
// ===============================
test.describe('TASKS - DESKTOP', () => {

  test.beforeEach(async ({ page }) => {
    const tasks = new TasksPage(page);
    await tasks.navigateToTasks();
  });

  // ===============================
  // ➕ Add Task
  // ===============================
  test('add task', async ({ page }) => {
    const tasks = new TasksPage(page);
    const todoTaskInput = TASK_CASES.ADD.text;
    await tasks.addTask(todoTaskInput);
    await tasks.expectTaskVisibleDesktop(1, todoTaskInput);
    await tasks.expectPriorityDesktop(1, 1);
  });

  // ===============================
  // ➕ Add Empty Task (still using default text)
  // ===============================
  test('add empty task', async ({ page }) => {
    const tasks = new TasksPage(page);
    const { text } = TASK_CASES.ADD;
    await tasks.addTask(text);
    await tasks.expectTaskVisibleDesktop(1, text);
    await tasks.expectPriorityDesktop(1, 1);
  });

  // ===============================
  // ✏️ Edit Task
  // ===============================
  test('edit task', async ({ page }) => {
    const tasks = new TasksPage(page);
    const { original, edited } = TASK_CASES.EDIT;
    await tasks.addTask(original);
    await tasks.editTaskDesktop(1, edited);
    await tasks.expectTaskVisibleDesktop(1, edited);
  });

  // ===============================
  // ❌ Cancel Edit
  // ===============================
  test('cancel edit', async ({ page }) => {
    const tasks = new TasksPage(page);
    const { original, tempCancel } = TASK_CASES.EDIT;
    await tasks.addTask(original);
    await tasks.cancelEditDesktop(1, tempCancel);
    await tasks.expectTaskVisibleDesktop(1, original);
  });

  // ===============================
  // ✅ Complete Task
  // ===============================
  test('complete task', async ({ page }) => {
    const tasks = new TasksPage(page);
    const { text } = TASK_CASES.COMPLETE;

    await tasks.addTask(text);
    await tasks.completeTaskDesktop(1);
    await tasks.expectTaskNotVisible(1);
    await tasks.expectTaskInCompleted(1, text);
  });

  // ===============================
  // 🔢 Sequence IDs
  // ===============================
  test('sequence ids', async ({ page }) => {
    const tasks = new TasksPage(page);
    const { first, second, third } = TASK_CASES.SEQUENCE;
    await tasks.addTask(first);
    await tasks.addTask(second);
    await tasks.completeTaskDesktop(2);
    await tasks.addTask(third);
    await tasks.expectTaskVisibleDesktop(3, third);
  });

  // ===============================
  // 🔄 Drag & Drop (Desktop)
  // ===============================
  test('reorder drag & drop', async ({ page }) => {
    const tasks = new TasksPage(page);
    const { tasks: reorderTasks, expectedFirst } = TASK_CASES.REORDER;
    for (const text of reorderTasks) {
      await tasks.addTask(text);
    }
    await tasks.dragTaskDesktop(3, 1);
    await tasks.expectFirstDesktopTaskText(expectedFirst);
  });

});
