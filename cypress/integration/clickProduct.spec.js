import store from './store_test';

describe('List product on homepage', () => {
  it('Should be click first product', () => {
    cy.visit(`http://localhost:3000/${store.name}`);
    cy.get('.col-sm-12 > .row > :nth-child(1)').click();
    cy.get('.test-name-product').contains(store.search_key);
    cy.get('.test-price-product').contains(store.price);
  });
});
