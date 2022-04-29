describe('Tests liste de tâches -', () => {
  it('On peut remplir le formulaire avec une tâche Jouer', () => {
    cy.visit('/');
    cy.get('form');
    cy.get('form > input').type('Jouer').should('have.value', 'Jouer');
    cy.get('form').submit();
    cy.get('ul').children().last().should('contain', 'Jouer');
  });

  it("Les 3 tâches ont toutes un bouton d'édition", () => {
    cy.get('ul > li:nth-child(1)').contains(/^edit/i);
    cy.get('ul > li:nth-child(2)').contains(/^edit/i);
    cy.get('ul > li:nth-child(3)').contains(/^edit/i);
  });

  it('Un clic sur le bouton édition de la première tâche déclenche le mode édition', () => {
    cy.get('ul > li').contains(/^edit/i).click();
    cy.get('ul > li:nth-child(1)').contains(/^sauvegarder/i);
    cy.get('ul > li:nth-child(1)').contains(/^annuler/i);
  });

  it("Un clic sur le bouton d'annulation quitte le mode édition", () => {
    cy.get('ul > li')
      .contains(/^annuler/i)
      .click();
    cy.get('ul > li:nth-child(1)').contains(/^edit/i);
    cy.get('ul > li:nth-child(1)').contains(/^supprimer/i);
  });

  it("L'édition de la dernière tâche doit fonctionner", () => {
    cy.get('ul').children().last().contains(/^edit/i).click();
    cy.get('ul > li > input').should('have.value', 'Jouer');
    cy.get('ul > li > input').type('2').should('have.value', 'Jouer2');
    cy.get('ul')
      .children()
      .last()
      .contains(/^sauvegarder/i)
      .click();
    cy.get('ul').children().last().should('contain', 'Jouer2');
  });

  it("L'édition de la première tâche doit fonctionner", () => {
    cy.get('ul').children().first().contains(/^edit/i).click();
    cy.get('ul > li > input').should('have.value', 'je suis une todo');
    cy.get('ul > li > input')
      .clear()
      .type('je suis édité')
      .should('have.value', 'je suis édité');
    cy.get('ul')
      .children()
      .first()
      .contains(/^sauvegarder/i)
      .click();
    cy.get('ul').children().first().should('contain', 'je suis édité');
  });

  after(() => {
    cy.screenshot('screenshot', {
      capture: 'runner',
    });
  });
});
