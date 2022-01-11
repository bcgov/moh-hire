describe('load page.com', () => {
  beforeEach(() => {
    cy.visit('/submission/1');
    // Fill out first page
    cy.get(`[data-cy=firstname]`).type('testname').should('have.value', 'testname');
    cy.get(`[data-cy=lastname]`).type('testlastname').should('have.value', 'testlastname');
    cy.get(`[data-cy=postalcode]`).type('A1A1A1').should('have.value', 'A1A1A1');
    cy.get(`[type=submit]`).click();
  });
  it('All fields should exist', () => {
    cy.get(`[data-cy=primaryphone]`).should('exist');
    cy.get(`[data-cy=primaryphoneext]`).should('exist');
    cy.get(`[data-cy=secondaryphone]`).should('exist');
    cy.get(`[data-cy=secondaryphoneext]`).should('exist');
    cy.get(`[data-cy=email]`).should('exist');
  });
  it('Fill out all fields on the second page', () => {
    cy.get(`[data-cy=primaryphone]`).type('1234567890').should('have.value', '1234567890');
    cy.get(`[data-cy=primaryphoneext]`)
      .type('Dial 2 then press the pound key')
      .should('have.value', 'Dial 2 then press the pound key');
    cy.get(`[data-cy=secondaryphone]`).type('1234567890').should('have.value', '1234567890');
    cy.get(`[data-cy=secondaryphoneext]`)
      .type('Dial 2 then press the pound key')
      .should('have.value', 'Dial 2 then press the pound key');
    cy.get(`[data-cy=email]`).type('test@someemail.com').should('have.value', 'test@someemail.com');
    cy.get(`[type=submit]`).click();
  });
});
