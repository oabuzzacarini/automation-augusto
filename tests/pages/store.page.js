import { expect, test } from '@playwright/test';

/**
 * Page Object Model for the /store page.
 * This class exposes:
 * - 📌 navigation helpers
 * - ✏️ actions (add, edit, complete)
 * - 🎯 assertions (expect...)
 */
export class StorePage { 

constructor(page) {
  this.page = page;

  // ===============================
  // 🔹 Fixed locators - Menu Home
  // ===============================

  // Page 
  this.pageHome = page.getByTestId('instructions-page');
  this.titleHome = page.getByTestId('instructions-title');

  // Tabs
  this.tabHome = page.getByTestId('store-tab-home');
  this.tabInventory = page.getByTestId('store-tab-inventory');
  this.tabCatalog = page.getByTestId('store-tab-catalog');
  this.tabCart = page.getByTestId('store-tab-cart');
  this.tabPayments = page.getByTestId('store-tab-payments');
  this.tabOrders = page.getByTestId('store-tab-orders');

  // Titles
  this.titleInstructionInventory = page.getByTestId('instructions-inventory-title');
  this.titleInstructionCatalog = page.getByTestId('instructions-catalog-title');
  this.titleInstructionCart = page.getByTestId('instructions-cart-title');
  this.titleInstructionPayment = page.getByTestId('instructions-payment-title');
  this.titleInstructionOrders = page.getByTestId('instructions-orders-title');

  // Icons
  this.iconHome = page.getByTestId('store-tab-home');
  this.iconInventory = page.getByTestId('instructions-icon-inventory');
  this.iconCatalog = page.getByTestId('instructions-icon-catalog');
  this.iconCart = page.getByTestId('instructions-icon-cart');
  this.iconPayment = page.getByTestId('instructions-icon-payment');
  this.iconOrders = page.getByTestId('instructions-icon-orders');

  // ===============================
  // 📊 Fixed locators - Inventory
  // ===============================

  // Page
  this.pageInventory = page.getByTestId('inventory-page');
  this.titleInventory = page.getByTestId('inventory-title');

  // Inputs
  this.inputName = page.getByTestId('inventory-input-name');
  this.inputPrice = page.getByTestId('inventory-input-price');
  this.inputQuantity = page.getByTestId('inventory-input-quantity');

  // Buttons
  this.buttonSubmitInventory = page.getByTestId('inventory-submit-button');

  // ===============================
  // 📁 Fixed locators - Catalog
  // ===============================

  // Page
  this.pageCatalog = page.getByTestId('catalog-page');
  this.titleCatalog = page.getByTestId('catalog-title');

  // ===============================
  // 🛒 Fixed locators - Cart
  // ===============================

  // Page
  this.pageCart = page.getByTestId('cart-page');
  this.titleCart = page.getByTestId('cart-title');

  // Labels
  this.labelTotalValueCart = page.getByTestId('cart-total-value');
  this.labelEmptyCart = page.getByTestId('cart-empty-message');

  // Buttons
  this.buttonSubmitCart = page.getByTestId('cart-go-to-payment');

  // ===============================
  // 💳 Fixed locators - Payment
  // ===============================

  // Page
  this.pagePayment = page.getByTestId('payment-page');
  this.titlePayment = page.getByTestId('payment-title');

  // Inputs
  this.inputPaymentMbway = page.getByTestId('payment-method-input-MBWay');
  this.inputPaymentKlarna = page.getByTestId('payment-method-input-Klarna');
  this.inputPaymentMultibanco = page.getByTestId('payment-method-input-Multibanco');
  this.inputPaymentPaypal = page.getByTestId('payment-method-input-PayPal');
  this.inputPaymentVisa = page.getByTestId('payment-method-input-Visa');

  // Labels
  this.labelTotalValuePayment = page.getByTestId('payment-total-value');
  this.labelEmptyPayment = page.getByTestId('payment-empty-message');

  // Buttons
  this.buttonSubmitPayment = page.getByTestId('payment-confirm-button');

  // ===============================
  // 📄 Fixed locators - Orders
  // ===============================

  // Page
  this.pageOrders = page.getByTestId('orders-page');
  this.titleOrders = page.getByTestId('orders-title');

  // Labels
  this.labelEmptyOrders = page.getByTestId('orders-empty-message');

}
  // ===============================
  // 🎯 Dynamic locators (by ID)
  // ===============================

  // 📊 Products of the Inventory menu
  inventoryProductName(id) {
    return this.page.getByTestId(`inventory-product-name-${id}`);
  }
  inventoryProductPrice(id) {
    return this.page.getByTestId(`inventory-product-price-value-${id}`);
  }
  inventoryProductQuantity(id) {
    return this.page.getByTestId(`inventory-product-quantity-${id}`);
  }
  inventoryProductIncrease(id) {
    return this.page.getByTestId(`inventory-product-increase-${id}`);
  }
  inventoryProductDecrease(id) {
    return this.page.getByTestId(`inventory-product-decrease-${id}`);
  }

  // 📁 Products of the Catalog menu
  catalogItemName(id) {
    return this.page.getByTestId(`catalog-item-name-${id}`);
  }
  catalogItemPrice(id) {
    return this.page.getByTestId(`catalog-item-price-value-${id}`);
  }
  catalogItemQuantity(id) {
    return this.page.getByTestId(`catalog-item-quantity-${id}`);
  }
  catalogItemAdd(id) {
    return this.page.getByTestId(`catalog-item-add-button-${id}`);
  }

  // 🛒 Products of the Cart menu
  cartItemName(id) {
    return this.page.getByTestId(`cart-item-name-${id}`);
  }
  cartItemQuantity(id) {
    return this.page.getByTestId(`cart-item-quantity-${id}`);
  }
  cartItemPrice(id) {
    return this.page.getByTestId(`cart-item-price-value-${id}`);
  }
  cartItemTotalValue(id) {
    return this.page.getByTestId(`cart-item-total-value-${id}`);
  }

  // 💳 Products of the Payment menu
  paymentItemName(id) {
    return this.page.getByTestId(`payment-item-name-${id}`);
  }
  paymentItemQuantity(id) {
    return this.page.getByTestId(`payment-item-quantity-${id}`);
  }
  paymentItemPrice(id) {
    return this.page.getByTestId(`payment-item-price-value-${id}`);
  }
  paymentItemTotalValue(id) {
    return this.page.getByTestId(`payment-item-total-value-${id}`);
  }

  // 📄 Products of the Orders menu
  orderDate(orderId) {
    return this.page.getByTestId(`order-date-${orderId}`);
  }
  orderPayment(orderId) {
    return this.page.getByTestId(`order-payment-${orderId}`);
  }
  orderItemName(orderId, itemId) {
    return this.page.getByTestId(`order-item-name-${orderId}-${itemId}`);
  }
  orderItemValue(orderId, itemId) {
    return this.page.getByTestId(`order-item-total-value-${orderId}-${itemId}`);
  }
  orderTotalValue(orderId) {
    return this.page.getByTestId(`order-total-value-${orderId}`);
  }

  // ===============================
  // 🔹 Dynamic collections
  // ===============================
  allProductItemsInventoryPage() {
    return this.page.getByTestId(/^inventory-product-name-/);
  }
  lastProductItemInventoryPage() {
    return this.allProductItemsInventoryPage().last();
  }

  // ===============================
  // 📌 Navigations
  // ===============================
  async navigateToStore() {
    await test.step('Navigate to Store page', async () => {
      await this.page.goto('/store');
      await this.validatePage(this.pageHome, this.titleHome, 'Instructions');
    });
  }

  async navigateToInventory() {
    await test.step('Navigate to Inventory page', async () => {
      await this.tabInventory.click();
      await this.validatePage(this.pageInventory, this.titleInventory, 'Inventory Management');
    });
  }

  async navigateToCatalog() {
    await test.step('Navigate to Catalog page', async () => {
      await this.tabCatalog.click();
      await this.validatePage(this.pageCatalog, this.titleCatalog, 'Product Catalog');
    });
  }

  async navigateToCart() {
    await test.step('Navigate to Cart page', async () => {
      await this.tabCart.click();
      await this.validatePage(this.pageCart, this.titleCart, 'Your Cart');
    });
  }

  async navigateToPayments() {
    await test.step('Navigate to Payments page', async () => {
      await this.tabPayments.click();
      await this.validatePage(this.pagePayment, this.titlePayment, 'Payment');
    });
  }
  
  async navigateToPaymentsThroughButton() {
    await test.step('Navigate to Payments page though the Go To Payments button', async () => {
      await this.buttonSubmitCart.click();
      await this.validatePage(this.pagePayment, this.titlePayment, 'Payment');
    });
  }

  async navigateToOrders() {
    await test.step('Navigate to Orders page', async () => {
      await this.tabOrders.click();
      await this.validatePage(this.pageOrders, this.titleOrders, 'Purchase Orders');
    });
  }
   
  
  // ===============================
  // ✏️ Generic actions
  // ===============================


  /**
  * Fill the product input with a given text (does not submit).
  * @param {string} product - Text to be typed in the task input.
  */
  async fillProductInput(product) {
    await test.step(`Fill product with text: "${product.name}"`, async () => {
      await this.inputName.fill(product.name);
      await this.inputPrice.fill(product.price);
      await this.inputQuantity.fill(product.quantity);
    });
  }

  /**
  * Click the "Add Product" button to submit the form.
  */
  async clickSubmit() {
    await test.step('Click on "Add" product button', async () => {
      await this.buttonSubmitInventory.click();
    });
  }

  /**
  * Create a new product by typing in the input and clicking "Add".
  * @param {string} product - Product description to create.
  */
  async addProductInventory(product) {
    await test.step(`Add new product with name: "${product.name}"`, async () => {
      await this.fillProductInput(product);
      await this.clickSubmit();     
    });
  }

  /**
  * Add a product from Catalog clicking "Add to Cart".
  * @param {string} product - Product description to add.
  */
  async addProductCatalog(product) {
    await test.step(`Add a product with name: "${product.name}"`, async () => {
      for (let i = 0; i < 2; i++) {
          await this.catalogItemAdd(product.id).click();
      }
    });
  }

  /**
  * Confirm the payment of the product.
  */
  async confirmPayment() {
    await test.step(`Select and Confirm payment`, async () => {
      await this.inputPaymentMultibanco.click();
      await this.buttonSubmitPayment.click();
    });
  }

  // ===============================
  // 🎯 Shared Assertions
  // ===============================

  /**
  * Assert that there are no item in the cart page.
  */
  async expectNoItemsCartPage() {
    await test.step('Assert there are no itens in the cart', async () => {
      await this.navigateToCart(); 
      await expect(this.labelEmptyCart).toBeVisible();
    });
  }

  /**
  * Assert that is in the correct page.
  */
  async validatePage(pageLocator, titleLocator, expectedTitle) {
    await expect(pageLocator).toBeVisible();
    await expect(titleLocator).toHaveText(expectedTitle);
  }

  /**
  * Assert that there are items in the Orders page.
  */
  async expectNoItemsOrdersPage() {
    await test.step('Assert there are no itens in the orders', async () => {
      await this.navigateToOrders(); 
      await expect(this.labelEmptyOrders).toBeVisible();
    });
  }

  /**
  * Assert that there are no item in the payment page.
  */
   async expectNoItemsPaymentPage() {
    await test.step('Assert there are no itens in the payment', async () => {
      await this.navigateToPayments(); 
      await expect(this.labelEmptyPayment).toBeVisible();
    });
  }

  /**
  * Assert that a product with a given id is visible and has the expected information.
  */
  async expectProductVisible(id, product) {
    await test.step(`Assert product #${id} is visible with name "${product.name}"`, async () => {
      await expect(this.inventoryProductName(id)).toHaveText(product.name);
      await expect(this.inventoryProductPrice(id)).toHaveText(product.price);
      await expect(this.inventoryProductQuantity(id)).toHaveText(product.quantity);
    });
  }

  /**
  * Assert that the last product in the list has the expected product name.
  */
  async expectLastProductList(product) {
    await test.step(`Assert last item in the list`, async () => {
      await expect(this.lastProductItemInventoryPage()).toHaveText(product);
    });
  }

  /**
  * Assert that a product is out of stock.
  */
  async expectProductOutOfStock(product) {
    await test.step(`Assert a product is out of stock with name "${product.name}"`, async () => {
      await expect(this.catalogItemAdd(product.id)).toHaveText('Out of Stock');
      await expect(this.catalogItemQuantity(product.id)).toHaveText('0 units');
    });
  }

  /**
  * Assert that a product is on the Cart list.
  */
  async expectProductListCart(id, product) {
    await test.step(`Assert a product is on the cart list with name "${product.name}"`, async () => {
      await expect(this.cartItemName(id)).toHaveText(product.name);
      await expect(this.cartItemQuantity(id)).toHaveText(product.quantity);
      await expect(this.cartItemPrice(id)).toHaveText(product.price);
      await expect(this.cartItemTotalValue(id)).toHaveText(product.total);
      await expect(this.labelTotalValueCart).toHaveText(product.total);
    });
  }

  /**
  * Assert that a product is on the Payment list.
  */
  async expectProductListPayment(id, product) {
    await test.step(`Assert a product is on the payment list with name "${product.name}"`, async () => {
      await expect(this.paymentItemName(id)).toHaveText(product.name);
      await expect(this.paymentItemQuantity(id)).toHaveText(product.quantity);
      await expect(this.paymentItemPrice(id)).toHaveText(product.price);
      await expect(this.paymentItemTotalValue(id)).toHaveText(product.total);
      await expect(this.labelTotalValuePayment).toHaveText(product.total);
    });
  }

  /**
  * Assert that a product is on the Orders list.
  */
  async expectProductListOrders(orderId, itemId, product) {
    await test.step(`Assert a product is on the order list with name "${product.name}"`, async () => {
      await expect(this.orderItemName(orderId, itemId)).toHaveText(`${product.quantity} x ${product.name}`);
      await expect(this.orderItemValue(orderId, itemId)).toHaveText(product.total);
      await expect(this.orderPayment(orderId)).toHaveText(`Payment Method: ${product.payment}`);
      await expect(this.orderTotalValue(orderId)).toHaveText(product.total);
    });
  }

}