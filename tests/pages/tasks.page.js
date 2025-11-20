import { expect, test } from '@playwright/test';

/**
 * Page Object Model for the /tasks page.
 * This class exposes:
 * 📌 navigation helpers
 * ✏️ actions (add, edit, complete, reorder)
 * 🎯 assertions (expect...)
 */
export class TasksPage {
  constructor(page) {
    this.page = page;

    // ===============================
    // 🔹 Fixed locators
    // ===============================
    this.root = page.getByTestId('task-page');
    this.title = page.getByTestId('task-title');
    this.taskInput = page.getByTestId('task-input');
    this.submitButton = page.getByTestId('task-submit-button');
  }

  // ===============================
  // 🔹 Dynamic locators (by ID)
  // ===============================

  todoItem(id) {
    return this.page.getByTestId(`todo-item-${id}`);
  }

  // DESKTOP locators
  todoTextDesktop(id) {
    return this.page.getByTestId(`todo-item-text-desktop-${id}`);
  }
  todoPriorityDesktop(id) {
    return this.page.getByTestId(`todo-item-priority-desktop-${id}`);
  }
  todoEditInputDesktop(id) {
    return this.page.getByTestId(`todo-item-edit-input-desktop-${id}`);
  }
  todoSaveButtonDesktop(id) {
    return this.page.getByTestId(`todo-item-save-button-desktop-${id}`);
  }
  todoCancelButtonDesktop(id) {
    return this.page.getByTestId(`todo-item-cancel-button-desktop-${id}`);
  }
  todoCompleteButtonDesktop(id) {
    return this.page.getByTestId(`todo-item-complete-button-desktop-${id}`);
  }

  // MOBILE locators
  todoTextMobile(id) {
    return this.page.getByTestId(`todo-item-text-mobile-${id}`);
  }
  todoPriorityMobile(id) {
    return this.page.getByTestId(`todo-item-priority-mobile-${id}`);
  }
  todoEditInputMobile(id) {
    return this.page.getByTestId(`todo-item-edit-input-mobile-${id}`);
  }
  todoEditButtonMobile(id) {
    return this.page.getByTestId(`todo-item-edit-button-mobile-${id}`);
  }
  todoSaveButtonMobile(id) {
    return this.page.getByTestId(`todo-item-save-button-mobile-${id}`);
  }
  todoCancelButtonMobile(id) {
    return this.page.getByTestId(`todo-item-cancel-button-mobile-${id}`);
  }
  todoCompleteButtonMobile(id) {
    return this.page.getByTestId(`todo-item-complete-button-mobile-${id}`);
  }

  // COMPLETED list (shared)
  completedItem(id) {
    return this.page.getByTestId(`completed-task-${id}`);
  }
  completedText(id) {
    return this.page.getByTestId(`completed-task-text-${id}`);
  }

  // ===============================
  // 🔹 Dynamic collections
  // ===============================
  allTodoItems() {
    return this.page.getByTestId(/^todo-item-/);
  }
  firstTodoItem() {
    return this.allTodoItems().first();
  }
  firstTodoItemTextDesktop() {
    return this.firstTodoItem().getByTestId(/^todo-item-text-desktop-/);
  }
  firstTodoItemTextMobile() {
    return this.firstTodoItem().getByTestId(/^todo-item-text-mobile-/);
  }

  // ===============================
  // 📌 Navigation
  // ===============================
  async navigateToTasks() {
    await test.step('Navigate to /tasks page', async () => {
      await this.page.goto('/tasks');
      await expect(this.root).toBeVisible();
      await expect(this.title).toHaveText('To do list');
    });
  }

  // ===============================
  // ✏️ Generic actions
  // ===============================
  async fillTaskInput(text) {
    await test.step(`Fill task input with text: "${text}"`, async () => {
      await this.taskInput.fill(text);
    });
  }

  async clickSubmit() {
    await test.step('Click on "Add" task button', async () => {
      await this.submitButton.click();
    });
  }

  async addTask(text) {
    await test.step(`Add new task with text: "${text}"`, async () => {
      await this.fillTaskInput(text);
      await this.clickSubmit();
    });
  }

  // ===============================
  // 🎯 Desktop Assertions
  // ===============================
  async expectTaskVisibleDesktop(id, text) {
    await test.step(`Assert desktop task #${id} is visible with text "${text}"`, async () => {
      await expect(this.todoItem(id)).toBeVisible();
      await expect(this.todoTextDesktop(id)).toHaveText(text);
    });
  }

  async expectPriorityDesktop(id, priority) {
    await test.step(`Assert desktop task #${id} has priority "${priority}"`, async () => {
      await expect(this.todoPriorityDesktop(id)).toHaveText(String(priority));
    });
  }

  async expectFirstDesktopTaskText(text) {
    await test.step(`Assert first desktop task in the list has text "${text}"`, async () => {
      await expect(this.firstTodoItemTextDesktop()).toHaveText(text);
    });
  }

  // ===============================
  // 🎯 Mobile Assertions
  // ===============================
  async expectTaskVisibleMobile(id, text) {
    await test.step(`Assert mobile task #${id} is visible with text "${text}"`, async () => {
      await expect(this.todoItem(id)).toBeVisible();
      await expect(this.todoTextMobile(id)).toHaveText(text);
    });
  }

  async expectPriorityMobile(id, priority) {
    await test.step(`Assert mobile task #${id} has priority "Priority: ${priority}"`, async () => {
      await expect(this.todoPriorityMobile(id)).toHaveText(`Priority: ${priority}`);
    });
  }

  async expectFirstMobileTaskText(text) {
    await test.step(`Assert first mobile task in the list has text "${text}"`, async () => {
      await expect(this.firstTodoItemTextMobile()).toHaveText(text);
    });
  }

  // ===============================
  // 🎯 Shared Assertions
  // ===============================
  async expectNoTasks() {
    await test.step('Assert there are no tasks in the list', async () => {
      await expect(this.allTodoItems()).toHaveCount(0);
    });
  }

  async expectTaskNotVisible(id) {
    await test.step(`Assert task #${id} is not visible in the list`, async () => {
      await expect(this.todoItem(id)).toHaveCount(0);
    });
  }

  async expectTaskInCompleted(id, text) {
    await test.step(`Assert completed task #${id} is visible with text "${text}"`, async () => {
      await expect(this.completedItem(id)).toBeVisible();
      await expect(this.completedText(id)).toHaveText(text);
    });
  }

  // ===============================
  // ✏️ Desktop Editing
  // ===============================
  async startEditDesktop(id) {
    await test.step(`Start desktop edit mode for task #${id}`, async () => {
      await this.todoTextDesktop(id).click({ clickCount: 2 });
      await expect(this.todoEditInputDesktop(id)).toBeVisible();
    });
  }

  async editTaskDesktop(id, newText) {
    await test.step(`Edit desktop task #${id} and set text to "${newText}"`, async () => {
      await this.startEditDesktop(id);
      await this.todoEditInputDesktop(id).fill(newText);
      await this.todoSaveButtonDesktop(id).click();
    });
  }

  async cancelEditDesktop(id, tempText) {
    await test.step(`Start desktop edit for task #${id}, type "${tempText}" and cancel`, async () => {
      await this.startEditDesktop(id);
      await this.todoEditInputDesktop(id).fill(tempText);
      await this.todoCancelButtonDesktop(id).click();
    });
  }

  // ===============================
  // ✏️ Mobile Editing
  // ===============================
  async startEditMobile(id) {
    await test.step(`Start mobile edit mode for task #${id}`, async () => {
      await this.todoEditButtonMobile(id).click();
      await expect(this.todoEditInputMobile(id)).toBeVisible();
    });
  }

  async editTaskMobile(id, newText) {
    await test.step(`Edit mobile task #${id} and set text to "${newText}"`, async () => {
      await this.startEditMobile(id);
      await this.todoEditInputMobile(id).fill(newText);
      await this.todoSaveButtonMobile(id).click();
    });
  }

  async cancelEditMobile(id, tempText) {
    await test.step(`Start mobile edit for task #${id}, type "${tempText}" and cancel`, async () => {
      await this.startEditMobile(id);
      await this.todoEditInputMobile(id).fill(tempText);
      await this.todoCancelButtonMobile(id).click();
    });
  }

  // ===============================
  // ✅ Complete Task
  // ===============================
  async completeTaskDesktop(id) {
    await test.step(`Complete desktop task #${id}`, async () => {
      await this.todoCompleteButtonDesktop(id).click();
    });
  }

  async completeTaskMobile(id) {
    await test.step(`Complete mobile task #${id}`, async () => {
      await this.todoCompleteButtonMobile(id).click();
    });
  }

  // ===============================
  // 🔄 Drag & Drop (Desktop)
  // ===============================
  async dragTaskDesktop(sourceId, targetId) {
    await test.step(`Drag desktop task #${sourceId} to position of task #${targetId}`, async () => {
      await this.todoItem(sourceId).dragTo(this.todoItem(targetId));
    });
  }
}