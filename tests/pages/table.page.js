import test, { expect } from '@playwright/test';

export class TablePage {
    constructor(page) {
        this.page = page;
        this.CharacterImageID = (value) => page.locator('#photo' + value);
        this.CharacterImage = (name) => page.getByRole('img', { name: name});
        this.CharacterNameID = (value) => page.locator('#tableCharacterName' + value);
        this.CharacterHouseID = (value) => page.locator('#tableCharacterHouse' + value);
        this.CharacterDateOfBirthID = (value) => page.locator('#tableCharacterDateOfBirth' + value);
        this.CharacterDateOfBirth = (name) => page.getByRole('cell', { name: name});
        this.CharacterActorID = (value) => page.locator('#tableCharacterActor' + value);
        this.CharacterActor = (name) => page.getByRole('cell', { name: name});
    }

    async navigateToTable() {
        await test.step('Navigate to table page', async () => {
            await this.page.goto('/table');
        });
    }

    async CheckCharacter(Character, value , birth) {
        await test.step('Checking Character: ' + Character.name + ' || ' + value + ' || ' + birth, async () => {
            await expect(this.CharacterActorID(value)).toBeVisible();
            await expect(this.CharacterActorID(value)).toHaveText(Character.actor);
            await expect(this.CharacterActor(Character.actor)).toBeVisible();

            await expect(this.CharacterDateOfBirthID(value)).toBeVisible();
            await expect(this.CharacterDateOfBirthID(value)).toHaveText(birth);
            await expect(this.CharacterDateOfBirth(birth)).toBeVisible();

            await expect(this.CharacterImageID(value)).toBeVisible();
            await expect(this.CharacterImage(Character.name)).toBeVisible();
            
            await expect(this.CharacterNameID(value)).toBeVisible();
            await expect(this.CharacterNameID(value)).toHaveText(Character.name);
            
            await expect(this.CharacterHouseID(value)).toBeVisible();
            await expect(this.CharacterHouseID(value)).toHaveText(Character.house);
        });
    }
}