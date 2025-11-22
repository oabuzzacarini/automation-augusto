import { test } from '@playwright/test';
import { StorePage } from '../../../pages/store.page';
import { STORE_CASES } from '../../../data/store.data';

test.describe('Store Page - Inventory', () => {

  test.beforeEach(async ({ page }) => {
    const store = new StorePage(page);
    await store.navigateToStore();
  });

  // ===============================
  // 🗑 Empty States
  // ===============================
  test('Should show empty states in Cart, Payment and Orders', async ({ page }) => {
    const store = new StorePage(page);

    await test.step('Validate empty Cart', async () => {
      await store.expectNoItemsCartPage();
    });

    await test.step('Validate empty Payment', async () => {
      await store.expectNoItemsPaymentPage();
    });

    await test.step('Validate empty Orders', async () => {
      await store.expectNoItemsOrdersPage();
    });
  });

  // ===============================
  // ➕ Add Product to Inventory
  // ===============================
  test('Should display the last product in the list', async ({ page }) => {
    const store = new StorePage(page);
    const product = STORE_CASES.ADD;

    await test.step('Add product to Inventory', async () => {
      await store.navigateToInventory();
      await store.addProductInventory(product);
    });

    await test.step('Validate product visibility and order', async () => {
      await store.expectProductVisible(8, product);
      await store.expectLastProductList(product.name);
    });
  });

  // ===============================
  // 🛒 Add Product from Catalog
  // ===============================
  test('Add one product from the catalog list', async ({ page }) => {
    const store = new StorePage(page);
    const product = STORE_CASES.BUY_ONE;

    await test.step('Navigate and add product from Catalog', async () => {
      await store.navigateToCatalog();
      await store.addProductCatalog(product);
      await store.expectProductOutOfStock(product);
    });

    await test.step('Validate product in Cart', async () => {
      await store.navigateToCart();
      await store.expectProductListCart(0, product);
    });

    await test.step('Validate product in Payment', async () => {
      await store.navigateToPaymentsThroughButton();
      await store.expectProductListPayment(0, product);
    });

    await test.step('Confirm payment and validate Orders', async () => {
      await store.confirmPayment();
      await store.expectProductListOrders(0, 0, product);
    });

    await test.step('Validate empty Cart and Payment after purchase', async () => {
      await store.expectNoItemsCartPage();
      await store.expectNoItemsPaymentPage();
    });
  });

});
