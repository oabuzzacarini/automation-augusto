import { expect, test } from '@playwright/test';
import { TYPES } from '../../data/pokemonType.data';

const BASE = 'https://pokeapi.co/api/v2/type/';

test.describe('⚡ TYPES', () => {

  // 🔹 Iterate over all types in the dataset
  for (const typeData of TYPES) {

    /**
     * Validate a single Pokémon type by fetching its data from the API.
     * 
     * @param typeData.name {string} - Name of the Pokémon type to validate.
     * @param typeData.doubleDamage {string | undefined} - Optional type name from which this type takes double damage. Used to verify "double_damage_from" field.
     * @param typeData.immune {string | undefined} - Optional type name from which this type takes no damage. Used to verify "no_damage_from" field.
     */
    test(`Validate TYPE - ${typeData.name}`, async ({ request }) => {
      // 🌐 Fetch the type data from the Pokémon API
      const response = await request.get(`${BASE}${typeData.name}`);
      expect(response.status()).toBe(200);

      // 📝 Parse the response body as JSON
      const body = await response.json();

      // 🎯 Basic validations
      expect(body.name).toBe(typeData.name);
      expect(body.damage_relations).toBeTruthy();

      const relations = body.damage_relations;

      // ⚔️ Check for double damage from a specific type if defined
      if (typeData.doubleDamage) {
        const doubleFrom = relations.double_damage_from.map(r => r.name);
        expect(doubleFrom).toContain(typeData.doubleDamage);
      }

      // 🛡️ Check for immunity from a specific type if defined
      if (typeData.immune) {
        const noDamageFrom = relations.no_damage_from.map(r => r.name);
        expect(noDamageFrom).toContain(typeData.immune);
      }
    });
  }
});
