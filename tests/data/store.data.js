export const STORE_CASES = {
  ADD: {
        scenario: 'Add product in Inventory',
        name: 'Product Test',
        price: '12.50',
        quantity: '3'
    },
  INCREASE: {
        scenario: 'Increase product in Inventory',
        name: 'Invisible Pen',
        price: '9.99',
        quantity: '20',
        id: '6',
        inicialStock: '0'
    },
  DECREASE: {
        scenario: 'Decrease product in Inventory',
        name: 'Shark Repellen',
        price: '299.99',
        quantity: '5',
        id: '2', 
        inicialStock: '5'
    },
      BUY_ONE: {
        scenario: 'Buy a product from Catalog',
        name: 'Lightsaber (Star Wars)',
        price: '9999.99',
        quantity: '2',
        id: '0', 
        total: '19999.98',
        paymentMethod: 'Multibanco',
        inicialStock: '2'
    },
      BUY_TWO: {
        scenario: 'Buy two products from Catalog',
        name: 'Aluminum Helmet for Protection Against Alien Mind Control',
        price: '19.99',
        quantity: '2',
        id: '3', 
        total: '39.98',
        paymentMethod: 'MBWay',
        inicialStock: '50'
    },
};