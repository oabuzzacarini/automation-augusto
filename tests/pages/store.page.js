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
    await test.step('Navigate to store page', async () => {
      await this.page.goto('/store');
      await this.validatePage(this.pageHome, this.titleHome, 'Instructions');
    });
  }

  async navigateToInventory() {
    await test.step('Navigate to inventory page', async () => {
      await this.tabInventory.click();
      await this.validatePage(this.pageInventory, this.titleInventory, 'Inventory Management');
    });
  }

  async navigateToCatalog() {
    await test.step('Navigate to catalog page', async () => {
      await this.tabCatalog.click();
      await this.validatePage(this.pageCatalog, this.titleCatalog, 'Product Catalog');
    });
  }

  async navigateToCart() {
    await test.step('Navigate to cart page', async () => {
      await this.tabCart.click();
      await this.validatePage(this.pageCart, this.titleCart, 'Your Cart');
    });
  }

  async navigateToPayments() {
    await test.step('Navigate to payments page', async () => {
      await this.tabPayments.click();
      await this.validatePage(this.pagePayment, this.titlePayment, 'Payment');
    });
  }
  
  async navigateToPaymentsThroughButton() {
    await test.step('Navigate to payments page through "Go to Payments" button', async () => {
      await this.buttonSubmitCart.click();
      await this.validatePage(this.pagePayment, this.titlePayment, 'Payment');
    });
  }

  async navigateToOrders() {
    await test.step('Navigate to orders page', async () => {
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

  async clickAddProductInventory() {
    await test.step('Click "Add Product" button', async () => {
      await this.buttonSubmitInventory.click();
    });
  }

  /**
  * Create a new product in Inventory.
  * @param {string} product - Product description to create.
  */
  async addProductInventory(product) {
    await test.step(`Add new product "${product.name}" to Inventory`, async () => {
      await this.fillProductInput(product);
      await this.clickAddProductInventory();     
    });
  }

  /**
  * Add a product from Catalog to the cart.
  * @param {object} product - Product object with id.
  */
  async addProductCatalog(product) {
    await test.step(`Add product "${product.name}" from Catalog to cart`, async () => {
      for (let i = 0; i < 2; i++) {
          await this.catalogItemAdd(product.id).click();
      }
    });
  }

  /**
  * Adjust a product quantity in Inventory.
  * @param {object} product - Product object with id, name, quantity.
  * @param {'increase'|'decrease'} action - Action to perform on the product.
  */
  async adjustProductInventory(product, action) {
    await test.step(`${action === 'increase' ? 'Increase' : 'Decrease'} product "${product.name}"`, async () => {
      const button = action === 'increase' 
        ? this.inventoryProductIncrease(product.id) 
        : this.inventoryProductDecrease(product.id);

      for (let i = 0; i < product.quantity; i++) {
        await button.click();
      }
    });
  }    


  async clickConfirmPayment() {
    await test.step('Click "Confirm Payment" button', async () => {
      await this.buttonSubmitPayment.click();
    });
  }

  /**
  * Confirm payment for a product using a specific method.
  * @param {'MBWay'|'Klarna'|'Multibanco'|'PayPal'|'Visa'} method - Payment method.
  */
  async confirmPayment(methodPayment) {
    await test.step(`Select and confirm payment with ${methodPayment}`, async () => {
      const paymentInputs = {
        MBWay: this.inputPaymentMbway,
        Klarna: this.inputPaymentKlarna,
        Multibanco: this.inputPaymentMultibanco,
        PayPal: this.inputPaymentPaypal,
        Visa: this.inputPaymentVisa,
      };

      await paymentInputs[methodPayment].click();
      await this.clickConfirmPayment();
    });
  }

  // ===============================
  // 🎯 Assertions
  // ===============================

  /**
  * Assert that is in the correct page.
  */
  async validatePage(pageLocator, titleLocator, expectedTitle) {
    await expect(pageLocator).toBeVisible();
    await expect(titleLocator).toHaveText(expectedTitle);
  }

  /**
  * Assert no items on the cart page.
  */
  async expectNoItemsCartPage() {
    await test.step('Assert cart page has no items', async () => {
      await expect(this.labelEmptyCart).toBeVisible();
    });
  }

  /**
  * Assert no items on the payment page.
  */
   async expectNoItemsPaymentPage() {
    await test.step('Assert payment page has no items', async () => {
      await expect(this.labelEmptyPayment).toBeVisible();
    });
  }

  /**
  * Assert no items on the orders page.
  */
  async expectNoItemsOrdersPage() {
    await test.step('Assert orders page has no items', async () => {
      await expect(this.labelEmptyOrders).toBeVisible();
    });
  }

  /**
  * Assert a product is visible in Inventory.
  * @param {number} id - Product index in the list.
  * @param {object} product - Product object with name, price, quantity.
  */
  async expectProductVisible(id, product) {
    await test.step(`Assert product #${id} "${product.name}" is visible in inventory`, async () => {
      await expect(this.inventoryProductName(id)).toHaveText(product.name);
      await expect(this.inventoryProductPrice(id)).toHaveText(product.price);
      await expect(this.inventoryProductQuantity(id)).toHaveText(product.quantity);
    });
  }

  /**
  * Assert the last product in Inventory list matches expected.
  * @param {string} productName - Name of the last product.
  */
  async expectLastProductList(productName) {
    await test.step(`Assert last product in inventory list`, async () => {
      await expect(this.lastProductItemInventoryPage()).toHaveText(productName);
    });
  }

  /**
  * Assert a product is in stock.
  * @param {'inventory'|'catalog'} pageType - Page type.
  * @param {'increased'|'decreased'} action - Whether the stock was increased or decreased.
  * @param {object} product - Product object with name, price, quantity.
  */
  async expectProductInStock(pageType, action, product) {
    await test.step(`Assert product "${product.name}" is in stock on ${pageType}`, async () => {
    
     const quantityLocator = pageType === 'inventory' 
     ? this.inventoryProductQuantity(product.id) 
     : this.catalogItemQuantity(product.id);

      const quantity = action === 'increased'
      ? String(Number(product.inicialStock) + Number(product.quantity))
      : String(Number(product.inicialStock) - Number(product.quantity));

      await expect(quantityLocator).toContainText(quantity);
    });
  }

  /**
  * Assert a product is out of stock in Catalog.
  * @param {object} product - Product object with name, price, quantity.
  */
  async expectProductOutOfStock(product) {
    await test.step(`Assert product "${product.name}" is out of stock in catalog page`, async () => {
      await expect(this.catalogItemAdd(product.id)).toHaveText('Out of Stock');
      await expect(this.catalogItemQuantity(product.id)).toHaveText('0 units');
    });
  }

/**
 * Assert a product is on the cart list.
 * @param {number} id - Product index in the list.
 * @param {object} product - Product object with name, price, quantity.
 */
  async expectProductListCart(id, product) {
    await test.step(`Assert product "${product.name}" is on the cart list`, async () => {
      await expect(this.cartItemName(id)).toHaveText(product.name);
      await expect(this.cartItemQuantity(id)).toHaveText(product.quantity);
      await expect(this.cartItemPrice(id)).toHaveText(product.price);
      await expect(this.cartItemTotalValue(id)).toHaveText(product.total);
    });
  }
  
  /**
  * Assert the final total value in cart, payment, or order page.
  * @param {'cart' | 'payment' | 'order'} pageType - Page type.
  * @param {string} totalValue - Expected total value.
  * @param {number} [orderId] - Order ID (required for 'order' pageType).
  */
  async expectTotalPurchase(pageType, totalValue, orderId = undefined) {
    await test.step(`Assert total value on ${pageType} page`, async () => {
      const totalLocator = pageType === 'cart'
        ? this.labelTotalValueCart
        : pageType === 'payment'
          ? this.labelTotalValuePayment
          : this.orderTotalValue(orderId);

      await expect(totalLocator).toHaveText(totalValue);
    });
  }

  /**
   Assert the selected payment method for a given order.
  * @param {number} orderId - Order ID.
  * @param {string} paymentMethod - Expected payment method for the order.
  */
  async expectMethodPayment(orderId, paymentMethod) {
    await test.step(`Assert payment method for order #${orderId} is "${paymentMethod}"`, async () => {
      await expect(this.orderPayment(orderId)).toHaveText(`Payment Method: ${paymentMethod}`);
    });
  }

  /**
  * Assert a product is on the payment list.
  * @param {number} id - Product index in the list.
  * @param {object} product - Product object with name, price, quantity.
  */
  async expectProductListPayment(id, product) {
    await test.step(`Assert a product is on the payment list with name "${product.name}"`, async () => {
      await expect(this.paymentItemName(id)).toHaveText(product.name);
      await expect(this.paymentItemQuantity(id)).toHaveText(product.quantity);
      await expect(this.paymentItemPrice(id)).toHaveText(product.price);
      await expect(this.paymentItemTotalValue(id)).toHaveText(product.total);
    });
  }

  /**
  * Assert a product is on the orders list.
  * @param {number} orderId - Order index in the list.
  * @param {number} itemId - Product index in the list.
  * @param {object} product - Product object with name, price, quantity.
  */
  async expectProductListOrders(orderId, itemId, product) {
    await test.step(`Assert a product is on the order list with name "${product.name}"`, async () => {
      await expect(this.orderItemName(orderId, itemId)).toHaveText(`${product.quantity} x ${product.name}`);
      await expect(this.orderItemValue(orderId, itemId)).toHaveText(product.total);
    });
  }

}