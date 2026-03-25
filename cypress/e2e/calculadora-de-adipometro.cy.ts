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

const DadoFeminino: Dados = {
  genero: 'Feminino',
  idade: 28,
  triceps: 18,
  subescapular: 14,
  suprailiaca: 19,
  abdominal: 22,
  coxa: 24,
  peitoral: 10,
  axilarMedia: 12,
  panturrilha: 16,
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

  it('CT-E2E-003 - Pollock 7 feminino com dados válidos', () => {
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
    } = DadoFeminino;

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
    cy.obterDataTestId('resultado').should('have.text', '23.48 %');
  });

  it('CT-E2E-004 - Pollock 3 masculino com campos dinâmicos', () => {
    const { genero, idade, abdominal, coxa, peitoral } = DadoMasculino;
    cy.obterDataTestId('protocolo').select('Pollock 3 Dobras');
    cy.obterDataTestId('genero').select(genero);
    cy.obterDataTestId('idade').type(String(idade));

    cy.preencherDobras({
      abdominal,
      coxa,
      peitoral,
    });

    cy.verificarDobrasVisiveis(['peitoral', 'abdominal', 'coxa']);
    cy.obterDataTestId('titulo-resultado').should('have.text', 'Pollock 3 Dobras');
    cy.obterDataTestId('resultado').should('have.text', '14.57 %');
  });

  it('CT-E2E-005 - Pollock 3 feminino com campos dinâmicos', () => {
    const { genero, idade, triceps, suprailiaca, coxa } = DadoFeminino;
    cy.obterDataTestId('protocolo').select('Pollock 3 Dobras');
    cy.obterDataTestId('genero').select(genero);
    cy.obterDataTestId('idade').type(String(idade));

    cy.preencherDobras({
      triceps,
      suprailiaca,
      coxa,
    });

    cy.verificarDobrasVisiveis(['triceps', 'suprailiaca', 'coxa']);
    cy.obterDataTestId('titulo-resultado').should('have.text', 'Pollock 3 Dobras');
    cy.obterDataTestId('resultado').should('have.text', '24.33 %');
  });

  it('CT-E2E-011 - Campo obrigatório faltante bloqueia resultado', () => {
    const { genero, idade, triceps, subescapular, suprailiaca, abdominal, coxa, peitoral } =
      DadoMasculino;
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
    });

    cy.obterDataTestId('titulo-resultado').should('have.text', 'Pollock 7 Dobras');
    cy.obterDataTestId('resultado').should('have.text', '--');
  });
});
