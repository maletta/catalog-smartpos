import store from './store_test';

describe('Test Store', () => {
  it('check if smartposbr is renderer', () => {
    cy.visit(`http://localhost:3000/${store.name}`);
    cy.get('.breadcrumb').contains('smartposbr');
    cy.title().should('eq', store.title);
  });
});
