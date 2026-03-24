/// <reference types="cypress" />

describe('Calculador de Adipômetro', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('CT-E2E-001 - Estado inicial da tela', () => {
    cy.obterDataTestId('protocolo').contains('Pollock 7 Dobras');
    cy.obterDataTestId('genero').find('option:selected').should('have.text', 'Masculino');
    cy.verificarDobrasVisiveis([
      'triceps',
      'subescapular',
      'suprailiaca',
      'abdominal',
      'coxa',
      'peitoral',
      'axilarMedia',
    ]);
    cy.obterDataTestId('resultado').contains('--');
  });
});
