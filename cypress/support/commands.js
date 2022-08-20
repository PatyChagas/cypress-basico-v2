Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Patrícia');
		cy.get('#lastName').type('Chagas');
		cy.get('#email').type('p_zirtacai@hotmail.com');
		cy.get('#open-text-area').type('Teste');
		cy.get('button[type="submit"]').click();
} )