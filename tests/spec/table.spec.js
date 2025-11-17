import { expect, test } from '@playwright/test';
import hpCharacters from '../data/Json/hpcharacters.json';


for(const c of hpCharacters){
 test.skip('Character ' + c.name, async ({ page }) => {

    await page.goto('/table');

    const namewithoutspace = c.name.replace(' ', '');

    await expect(page.getByRole('img', { name: c.name})).toBeVisible();
    await expect(page.locator('#tableCharacterName' + namewithoutspace)).toBeVisible();
    await expect(page.locator('#tableCharacterHouse' + namewithoutspace)).toBeVisible();
    await expect(page.locator('#tableCharacterDateOfBirth' + namewithoutspace)).toBeVisible();
    await expect(page.locator('#tableCharacterActor' + namewithoutspace)).toBeVisible();

     if (c.dateOfBirth) {
       await expect(page.getByRole('cell', { name: c.dateOfBirth})).toBeVisible();
     } else {
       await expect(page.getByRole('cell', { name: 'Unknown'})).toBeVisible();
     }
    console.log(c.name);

    const birth = c.dateOfBirth ? c.dateOfBirth : 'Unknown';
    await expect(page.getByRole('cell', { name: birth})).toBeVisible();
 });
}



