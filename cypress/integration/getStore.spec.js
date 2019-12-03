import store from './store_test';

describe('Test Store', () => {
  it('check if smartposbr is renderer', () => {
    cy.visit(`http://localhost:3000/${store.name}`);
    cy.request('cypress-test').its('body').should('contains', 'You need to enable JavaScript to run this app.');
    cy.get('.breadcrumb').contains(store.name);
    cy.title().should('eq', store.title);
  });
  // it('Test 404 page', () => {
  //   cy.visit('http://localhost:3000/cypress-test');
  //   cy.get('.404page').contains('Loja não encontrada.');
  // });
});
