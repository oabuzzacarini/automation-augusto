import test from '@playwright/test';
import { TablePage } from '../../../pages/table.page';
import hpCharacters from '../../../data/Json/hpcharacters.json';

// ===============================
// 🔹 CHARACTER TABLE CHECKS
// ===============================
test.describe('Character checking', async () => {

  for (const c of hpCharacters) {
    test(`Character ${c.name}`, async ({ page }) => {
      
      // ===============================
      // 🔹 Prepare Character Data
      // ===============================
      const nameWithoutSpace = c.name.replace(' ', '');
      const birth = c.dateOfBirth ? c.dateOfBirth : 'Unknown';
      const table = new TablePage(page);

      // ===============================
      // 🔹 Navigate to Table Page
      // ===============================
      await table.navigateToTable();

      // ===============================
      // 🔍 Validate Character Information
      // ===============================
      await table.checkCharacter(c, nameWithoutSpace, birth);
    });
  }

});
