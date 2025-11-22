import { test, expect } from '@playwright/test';
import { MENUS } from '../../../data/menus.data';

/**
 *  Validation a list of Menus
*/
test('Menu validation', async ({ page }) => {   

  // Iterate over all menu items in the dataset
  for (const menu of MENUS) {

    /**
     * Validate a menu.
     * 
     * @param menu.value {string} - ID of the Menu (used as link text).
     * @param menu.name  {string} - Display name of the Menu.
     */
    await test.step(`MENU - ${menu.name}`, async () => {

      // Navigate to the application's home page
      await page.goto('');

      // Validate the page title
      await expect(page).toHaveTitle('Playground page');

      // Click the menu link based on the dataset value
      await page.getByRole('link', { name: menu.value }).click();

      console.log(menu.value);
      // Validate that the corresponding page heading is visible
      await expect(page.getByRole('heading', { name: menu.value })).toBeVisible();

      // Validate that the heading text matches the menu name in the dataset
      await expect(page.getByRole('heading', { name: menu.value })).toHaveText(menu.name);
    });
  }
});
