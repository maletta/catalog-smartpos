import store from './store_test';

describe('Test Store', () => {
  it('check if smartposbr is renderer', () => {
    cy.visit('https://cypress-test.qa.smartpos.net.br/');
    cy.get('.breadcrumb').contains(store.name);
    cy.title().should('eq', store.title);
  });
});
