/// <reference types="cypress" />

import { Dobras } from '../support/commands';

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

type Protocolo = 'Pollock 3 Dobras' | 'Guedes' | 'Faulkner' | 'Petroski';

const dadoMasculino: Dados = {
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

const dadoFeminino: Dados = {
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

const validarPollock7Dobras = (dados: Dados, resultado: string) => {
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
  } = dados;
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
  cy.obterDataTestId('resultado').should('have.text', resultado);
};

const validarPollock3Dobras = (
  dados: Partial<Dados>,
  dobrasVisiveis: Dobras[],
  resultado: string,
) => {
  const { genero, idade, ...dobras } = dados;
  cy.obterDataTestId('protocolo').select('Pollock 3 Dobras');
  cy.obterDataTestId('genero').select(genero);
  cy.obterDataTestId('idade').type(String(idade));

  cy.preencherDobras(dobras);

  cy.verificarDobrasVisiveis(dobrasVisiveis);
  cy.obterDataTestId('titulo-resultado').should('have.text', 'Pollock 3 Dobras');
  cy.obterDataTestId('resultado').should('have.text', resultado);
};

const validarProtocolo = (
  protocolo: Protocolo,
  dados: Partial<Dados>,
  dobrasVisiveis: Dobras[],
  resultado: string,
) => {
  const { genero, idade, ...dobras } = dados;
  cy.obterDataTestId('protocolo').select(protocolo);
  cy.obterDataTestId('genero').select(genero!);
  cy.obterDataTestId('idade').type(String(idade));

  cy.preencherDobras(dobras);

  cy.verificarDobrasVisiveis(dobrasVisiveis);
  cy.obterDataTestId('titulo-resultado').should('have.text', protocolo);
  cy.obterDataTestId('resultado').should('have.text', resultado);
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
    validarPollock7Dobras(dadoMasculino, '13.53 %');
  });

  it('CT-E2E-003 - Pollock 7 feminino com dados válidos', () => {
    validarPollock7Dobras(dadoFeminino, '23.48 %');
  });

  it('CT-E2E-004 - Pollock 3 masculino com campos dinâmicos', () => {
    const { genero, idade, peitoral, abdominal, coxa } = dadoMasculino;
    validarPollock3Dobras(
      {
        genero,
        idade,
        peitoral,
        abdominal,
        coxa,
      },
      ['peitoral', 'abdominal', 'coxa'],
      '14.57 %',
    );
  });

  it('CT-E2E-005 - Pollock 3 feminino com campos dinâmicos', () => {
    const { genero, idade, triceps, suprailiaca, coxa } = dadoFeminino;
    validarPollock3Dobras(
      {
        genero,
        idade,
        triceps,
        suprailiaca,
        coxa,
      },
      ['triceps', 'suprailiaca', 'coxa'],
      '24.33 %',
    );
  });

  it('CT-E2E-006 - Guedes masculino', () => {
    const { genero, idade, triceps, suprailiaca, abdominal } = dadoMasculino;
    validarProtocolo(
      'Guedes',
      { genero, idade, triceps, suprailiaca, abdominal },
      ['triceps', 'suprailiaca', 'abdominal'],
      '13.54 %',
    );
  });

  it('CT-E2E-007 - Guedes feminino', () => {
    const { genero, idade, suprailiaca, coxa, subescapular } = dadoFeminino;
    validarProtocolo(
      'Guedes',
      { genero, idade, suprailiaca, coxa, subescapular },
      ['suprailiaca', 'coxa', 'subescapular'],
      '24.80 %',
    );
  });

  it('CT-E2E-011 - Campo obrigatório faltante bloqueia resultado', () => {
    const { genero, idade, triceps, subescapular, suprailiaca, abdominal, coxa, peitoral } =
      dadoMasculino;
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
