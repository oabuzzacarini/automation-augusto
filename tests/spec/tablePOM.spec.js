import test from '@playwright/test';
import { TablePage } from '../pages/table.page';
import hpCharacters from '../data/Json/hpcharacters.json';

test.describe('Character checking', async () => {
   for(const c of hpCharacters){
      test('Character ' + c.name, async ({ page }) => {     
         const namewithoutspace = c.name.replace(' ', '');
         const birth = c.dateOfBirth ? c.dateOfBirth : 'Unknown';
         const table = new TablePage(page);
         
         await table.navigateToTable();
         await table.checkCharacter(c, namewithoutspace, birth);;
      });
   }
});