/// <reference types="cypress" />

interface Dados {
  genero: string;
  idade: number;
  triceps: number;
  subescapular: number;
  suprailiaca: number;
  abdominal: number;
  coxa: number;
  peitoral: number;
  axilarMedia: number;
  panturrilha: number;
}

const DadoMasculino: Dados = {
  genero: 'Masculino',
  idade: 28,
  triceps: 12,
  subescapular: 10,
  suprailiaca: 14,
  abdominal: 18,
  coxa: 20,
  peitoral: 11,
  axilarMedia: 9,
  panturrilha: 13,
};

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

  it('CT-E2E-002 - Pollock 7 masculino com dados válidos', () => {
    const {
      genero,
      idade,
      triceps,
      subescapular,
      suprailiaca,
      abdominal,
      coxa,
      peitoral,
      axilarMedia,
    } = DadoMasculino;
    cy.obterDataTestId('protocolo').select('Pollock 7 Dobras');
    cy.obterDataTestId('genero').select(genero);
    cy.obterDataTestId('idade').type(String(idade));

    cy.preencherDobras({
      triceps,
      subescapular,
      suprailiaca,
      abdominal,
      coxa,
      peitoral,
      axilarMedia,
    });

    cy.obterDataTestId('titulo-resultado').should('have.text', 'Pollock 7 Dobras');
    cy.obterDataTestId('resultado').should('have.text', '13.53 %');
  });
});
