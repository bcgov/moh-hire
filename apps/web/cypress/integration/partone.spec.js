describe('load page.com', () => {
  beforeEach(() => {
    cy.visit('/submission/1');
  });
  it('All fields should exist', () => {
    cy.get(`[data-cy=firstname]`).should('exist');
    cy.get(`[data-cy=lastname]`).should('exist');
    cy.get(`[data-cy=postalcode]`).should('exist');
  });
  it('Fills out all fields on the first page', () => {
    cy.get(`[data-cy=firstname]`).type('testname').should('have.value', 'testname');
    cy.get(`[data-cy=lastname]`).type('testlastname').should('have.value', 'testlastname');
    cy.get(`[data-cy=postalcode]`).type('A1A1A1').should('have.value', 'A1A1A1');
    cy.get(`[type=submit]`).click();
  });
});
