import { test } from '@playwright/test';
import { StorePage } from '../../../pages/store.page';
import { STORE_CASES } from '../../../data/store.data';

test.describe('Store Page Scenarios', () => {

  test.beforeEach(async ({ page }) => {
    const store = new StorePage(page);
    await store.navigateToStore();
  });

  // ===============================
  // 🗑 Empty Pages
  // ===============================
  test('Validate empty cart, payment and orders pages', async ({ page }) => {
    const store = new StorePage(page);

    await test.step('Validate empty cart page', async () => {
      await store.navigateToCart();
      await store.expectNoItemsCartPage();
    });

    await test.step('Validate empty payment page', async () => {
      await store.navigateToPayments();
      await store.expectNoItemsPaymentPage();
    });

    await test.step('Validate empty orders page', async () => {
      await store.navigateToOrders();
      await store.expectNoItemsOrdersPage();
    });
  });

  // ===============================
  // 🔹 Required fields - Inventory
  // ===============================
  test('Try adding a product to the inventory without required information', async ({ page }) => {
    const store = new StorePage(page);
    const product = STORE_CASES.ADD;

    await test.step('Attempt to add a product without any information', async () => {
      await store.navigateToInventory();
      await store.clickAddProductInventory();
    }); 

    await test.step('Verify last product in the list remains unchanged', async () => {
      await store.expectLastProductList('Dog Sunglasses');
    }); 
  });

  // ===============================
  // 🔹 Required fields - Payment
  // ===============================
  test('Purchase fails when no payment method is selected', async ({ page }) => {
    const store = new StorePage(page);
    const product = STORE_CASES.BUY_ONE;

    await test.step('Add product from catalog', async () => {
      await store.navigateToCatalog();
      await store.addProductCatalog(product);
      await store.expectProductOutOfStock(product);
    });

    await test.step('Validate product in cart page', async () => {
      await store.navigateToCart();
      await store.expectProductListCart(0, product);
      await store.expectTotalPurchase('cart', product.total);
    });

    await test.step('Validate product in payment page', async () => {
      await store.navigateToPaymentsThroughButton();
      await store.expectProductListPayment(0, product);
      await store.expectTotalPurchase('payment', product.total);
    });

    await test.step('Attempt to confirm payment without selecting a method', async () => {
      await store.clickConfirmPayment();
    });

    await test.step('Verify product remains in cart and payment pages, and orders page is empty', async () => {
      await store.expectProductListPayment(0, product);
      await store.expectTotalPurchase('payment', product.total);

      await store.navigateToCart();
      await store.expectProductListCart(0, product);
      await store.expectTotalPurchase('cart', product.total);

      await store.navigateToOrders();
      await store.expectNoItemsOrdersPage();
    });
  });

  // ===============================
  // ➕ Add Product to Inventory
  // ===============================
  test('Add a product in the inventory page and validate it appears in the last position', async ({ page }) => {
    const store = new StorePage(page);
    const product = STORE_CASES.ADD;

    await test.step('Add product to inventory', async () => {
      await store.navigateToInventory();
      await store.addProductInventory(product);
    });

    await test.step('Validate product visibility in the last position', async () => {
      await store.expectProductVisible(8, product);
      await store.expectLastProductList(product.name);
    });
  });

  // ===============================
  // ➕ Increase Product in Inventory
  // ===============================
  test('Increase a product in the inventory page', async ({ page }) => {
    const store = new StorePage(page);
    const product = STORE_CASES.INCREASE;

    await test.step('Increase product quantity', async () => {
      await store.navigateToInventory();
      await store.adjustProductInventory(product, 'increase');
    });

    await test.step('Validate product in stock in inventory and catalog pages', async () => {
      await store.expectProductInStock('inventory', 'increased', product);
      await store.navigateToCatalog();
      await store.expectProductInStock('catalog', 'increased', product);
    });
  });

  // ===============================
  // ➖ Decrease Product in Inventory
  // ===============================
  test('Decrease a product in the inventory page', async ({ page }) => {
    const store = new StorePage(page);
    const product = STORE_CASES.DECREASE;

    await test.step('Decrease product quantity', async () => {
      await store.navigateToInventory();
      await store.adjustProductInventory(product, 'decrease');
    });

    await test.step('Validate product in stock in inventory and catalog pages', async () => {
      await store.expectProductInStock('inventory', 'decreased', product);
      await store.navigateToCatalog();
      await store.expectProductInStock('catalog', 'decreased', product);
    });
  });

  // ===============================
  // 🛒 Buy One Product from Catalog
  // ===============================
  test('Buy a product from the catalog page', async ({ page }) => {
    const store = new StorePage(page);
    const product = STORE_CASES.BUY_ONE;

    await test.step('Add product from catalog', async () => {
      await store.navigateToCatalog();
      await store.addProductCatalog(product);
      await store.expectProductOutOfStock(product);
    });

    await test.step('Validate product in cart page', async () => {
      await store.navigateToCart();
      await store.expectProductListCart(0, product);
      await store.expectTotalPurchase('cart', product.total);
    });

    await test.step('Validate product in payment page', async () => {
      await store.navigateToPaymentsThroughButton();
      await store.expectProductListPayment(0, product);
      await store.expectTotalPurchase('payment', product.total);
    });

    await test.step('Confirm payment and validate product in orders page', async () => {
      await store.confirmPayment(product.paymentMethod);
      await store.expectProductListOrders(0, 0, product);
      await store.expectMethodPayment(0, product.paymentMethod);
      await store.expectTotalPurchase('order', product.total, 0);
    });

    await test.step('Validate empty cart and payment pages after purchase', async () => {
      await store.navigateToCart();
      await store.expectNoItemsCartPage();

      await store.navigateToPayments();
      await store.expectNoItemsPaymentPage();
    });
  });

  // ===============================
  // 🛒 Buy Two Products from Catalog
  // ===============================
  test('Buy two products from the catalog page', async ({ page }) => {
    const store = new StorePage(page);
    const productOne = STORE_CASES.BUY_ONE;
    const productTwo = STORE_CASES.BUY_TWO;

    await test.step('Add first product from catalog', async () => {
      await store.navigateToCatalog();
      await store.addProductCatalog(productOne);
      await store.expectProductOutOfStock(productOne);
    });

    await test.step('Add second product from catalog', async () => {
      await store.navigateToCatalog();
      await store.addProductCatalog(productTwo);
      await store.expectProductInStock('catalog', 'decreased', productTwo);
    });

    await test.step('Validate products in cart page', async () => {
      await store.navigateToCart();
      await store.expectProductListCart(0, productOne);
      await store.expectProductListCart(1, productTwo);
      await store.expectTotalPurchase('cart', '20039.96');
    });

    await test.step('Validate products in payment page', async () => {
      await store.navigateToPaymentsThroughButton();
      await store.expectProductListPayment(0, productOne);
      await store.expectProductListPayment(1, productTwo);
      await store.expectTotalPurchase('payment', '20039.96');
    });

    await test.step('Confirm payment and validate products in orders page', async () => {
      await store.confirmPayment(productTwo.paymentMethod);
      await store.expectProductListOrders(0, 0, productOne);
      await store.expectProductListOrders(0, 1, productTwo);
      await store.expectMethodPayment(0, productTwo.paymentMethod);
      await store.expectTotalPurchase('order', '20039.96', 0);
    });

    await test.step('Validate empty cart and payment pages after purchase', async () => {
      await store.navigateToCart();
      await store.expectNoItemsCartPage();

      await store.navigateToPayments();
      await store.expectNoItemsPaymentPage();
    });
    
  });

});