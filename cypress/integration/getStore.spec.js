import store from './store_test';

describe('Test Store', () => {
  it.only('check if smartposbr is renderer', () => {
    cy.visit(`http://localhost:3000/${store.name}`);
    cy.request('cypress-test').its('body').should('contains', 'You need to enable JavaScript to run this app.');
    // cy.get('.breadcrumb').contains(store.name);
    // cy.title().should('eq', store.title);
  });
});
