import test, { expect } from '@playwright/test';

/**
 * Page Object Model (POM) for the /table page.
 *
 * Provides:
 *  - 📌 Navigation utilities
 *  - 🔍 Check information (name, image, house, actor, etc.)
 *  - 🎯 Assertions using expect
 */
export class TablePage {
    constructor(page) {
        this.page = page;

        // ===== Dynamic locators (by ID) =====
        this.CharacterImageID = (value) => page.locator('#photo' + value);
        this.CharacterNameID = (value) => page.locator('#tableCharacterName' + value);
        this.CharacterHouseID = (value) => page.locator('#tableCharacterHouse' + value);
        this.CharacterDateOfBirthID = (value) => page.locator('#tableCharacterDateOfBirth' + value);
        this.CharacterActorID = (value) => page.locator('#tableCharacterActor' + value);

        // ===== Dynamic locators (by name) =====
        this.CharacterImage = (name) => page.getByRole('img', { name: name });
        this.CharacterDateOfBirth = (name) => page.getByRole('cell', { name: name });
        this.CharacterActor = (name) => page.getByRole('cell', { name: name });
    }

    // ===============================
    // 🔹 Navigation
    // ===============================

    /**
     * Navigate to the /table page and validate that it is loaded.
     */
    async navigateToTable() {
        await test.step('Navigate to table page', async () => {
            await this.page.goto('/table');
        });
    }

    // ===============================
    // 🔹 Check Information
    // ===============================

    /**
     * Check all information of a character in the table.
     * @param {Object} character - The character object with details to validate.
     * @param {string} character.name - Name of the character.
     * @param {string} character.actor - Actor name of the character.
     * @param {string} character.house - House name of the character.
     * @param {number|string} value - The numeric identifier used in dynamic locators (ID suffix).
     * @param {string} birth - Birth date of the character to validate.
     */
    async checkCharacter(character, value, birth) {
        await test.step(`Checking Character: ${character.name} || ${value} || ${birth}`, async () => {
            // Actor validation
            await expect(this.CharacterActorID(value)).toBeVisible();
            await expect(this.CharacterActorID(value)).toHaveText(character.actor);
            await expect(this.CharacterActor(character.actor)).toBeVisible();

            // Date of birth validation
            await expect(this.CharacterDateOfBirthID(value)).toBeVisible();
            await expect(this.CharacterDateOfBirthID(value)).toHaveText(birth);
            await expect(this.CharacterDateOfBirth(birth)).toBeVisible();

            // Image validation
            await expect(this.CharacterImageID(value)).toBeVisible();
            await expect(this.CharacterImage(character.name)).toBeVisible();

            // Name validation
            await expect(this.CharacterNameID(value)).toBeVisible();
            await expect(this.CharacterNameID(value)).toHaveText(character.name);

            // House validation
            await expect(this.CharacterHouseID(value)).toBeVisible();
            await expect(this.CharacterHouseID(value)).toHaveText(character.house);
        });
    }
}
