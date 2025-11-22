import { expect, test } from '@playwright/test';
import { TYPES } from '../../data/pokemonType.data';

/**
 * ⚡ Test: Validate the "Normal" Pokémon type
 * 
 * 🔹 Parameters:
 * - request: Playwright's APIRequestContext, used to make HTTP requests.
 * - TYPES[0].doubleDamage: The expected type from which "Normal" receives double damage.
 */
test('Validate Normal TYPE', async ({ request }) => {

  // 🌐 Fetch the "Normal" type data from the Pokémon API
  const response = await request.get('https://pokeapi.co/api/v2/type/normal/');

  // 📝 Parse the JSON response
  const body = await response.json();

  // 🎯 Validate that the first type that deals double damage to Normal is as expected
  expect(body.damage_relations.double_damage_from[0].name).toBe(TYPES[0].doubleDamage);

});
