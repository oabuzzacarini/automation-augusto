import { expect, test } from '@playwright/test';
import hpCharacters from '../../../data/Json/hpcharacters.json';

// ===============================
// Validate Harry Potter Characters Table
// ===============================
for (const character of hpCharacters) {

  test.skip(`Character ${character.name}`, async ({ page }) => {

    // Navigate to the table page
    await page.goto('/table');

    // Remove spaces from the character name for element IDs
    const nameWithoutSpace = character.name.replace(' ', '');

    // Check that the character image is visible
    await expect(page.getByRole('img', { name: character.name })).toBeVisible();

    // Check that table elements for Name, House, Date of Birth, Actor exist
    await expect(page.locator(`#tableCharacterName${nameWithoutSpace}`)).toBeVisible();
    await expect(page.locator(`#tableCharacterHouse${nameWithoutSpace}`)).toBeVisible();
    await expect(page.locator(`#tableCharacterDateOfBirth${nameWithoutSpace}`)).toBeVisible();
    await expect(page.locator(`#tableCharacterActor${nameWithoutSpace}`)).toBeVisible();

    // Validate the date of birth, fallback to 'Unknown' if not provided
    const birth = character.dateOfBirth ? character.dateOfBirth : 'Unknown';
    await expect(page.getByRole('cell', { name: birth })).toBeVisible();

  });

}
