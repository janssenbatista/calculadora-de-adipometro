/// <reference types="cypress" />
/* eslint-disable @typescript-eslint/no-namespace */
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

export type Dobras =
  | 'triceps'
  | 'subescapular'
  | 'suprailiaca'
  | 'abdominal'
  | 'coxa'
  | 'peitoral'
  | 'axilarMedia'
  | 'panturrilha';

export const todasAsDobras: Dobras[] = [
  'triceps',
  'subescapular',
  'suprailiaca',
  'abdominal',
  'coxa',
  'peitoral',
  'axilarMedia',
  'panturrilha',
];

declare global {
  namespace Cypress {
    interface Chainable {
      obterDataTestId(id: string): Chainable<JQuery<HTMLElement>>;
      verificarDobrasVisiveis(dobras: Dobras[]): void;
    }
  }
}

Cypress.Commands.add('obterDataTestId', (id: string) => {
  return cy.get(`[data-testid="${id}"]`);
});

Cypress.Commands.add('verificarDobrasVisiveis', (dobrasVisiveis: Dobras[]) => {
  dobrasVisiveis.forEach((dobra) => {
    cy.obterDataTestId(dobra).should('be.visible');
  });

  const dobrasNaoVisiveis = todasAsDobras.filter((dobra) => !dobrasVisiveis.includes(dobra));

  dobrasNaoVisiveis.forEach((dobra) => {
    cy.obterDataTestId(dobra).should('not.exist');
  });
});

export {};
