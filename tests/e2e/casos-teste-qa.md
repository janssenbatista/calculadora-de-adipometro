# Casos de Teste E2E - Calculadora de Adipômetro

## Objetivo

Validar o comportamento da calculadora de composição corporal, garantindo que:

- campos exibidos mudam conforme protocolo e gênero;
- resultado só aparece quando todos os dados obrigatórios estão preenchidos;
- cálculos das fórmulas retornam o valor esperado;
- mudanças de entrada atualizam o resultado em tempo real;
- aplicação permanece estável em entradas inválidas e limites comuns de uso.

## Escopo

- Tela principal da calculadora.
- Seletores: protocolo e gênero.
- Campos numéricos: idade e dobras cutâneas.
- Card de resultado por fórmula.

## Fora de Escopo

- Precisão clínica das fórmulas em contexto médico.
- Compatibilidade com navegadores legados.

## Pré-condições

- Aplicação executando em ambiente local (`npm run dev`).
- URL aberta no navegador.
- Nenhum valor previamente preenchido (estado inicial da página).

## Massa de Dados (referência)

### Conjunto A (masculino)

- Idade: 28
- Tríceps: 12
- Subescapular: 10
- Suprailíaca: 14
- Abdominal: 18
- Coxa: 20
- Peitoral: 11
- Axilar média: 9
- Panturrilha: 13

### Conjunto B (feminino)

- Idade: 28
- Tríceps: 18
- Subescapular: 14
- Suprailíaca: 19
- Abdominal: 22
- Coxa: 24
- Peitoral: 10
- Axilar média: 12
- Panturrilha: 16

## Casos de Teste

### CT-E2E-001 - Estado inicial da tela

**Prioridade:** Alta

**Passos:**

1. Acessar a página da calculadora.
2. Observar os valores padrão de protocolo e gênero.
3. Verificar o card de resultado.

**Resultado esperado:**

- Protocolo padrão: Pollock 7 Dobras.
- Gênero padrão: Masculino.
- Campos de 7 dobras visíveis para Pollock 7.
- Resultado exibido como `--`.

---

### CT-E2E-002 - Pollock 7 masculino com dados válidos

**Prioridade:** Crítica

**Passos:**

1. Selecionar protocolo Pollock 7 Dobras.
2. Selecionar gênero Masculino.
3. Preencher idade e dobras do Conjunto A.
4. Observar o valor no card de resultado.

**Resultado esperado:**

- Resultado exibido: `13.53 %`.
- Título do card: Pollock 7 Dobras.

---

### CT-E2E-003 - Pollock 7 feminino com dados válidos

**Prioridade:** Crítica

**Passos:**

1. Selecionar protocolo Pollock 7 Dobras.
2. Selecionar gênero Feminino.
3. Preencher idade e dobras do Conjunto B.
4. Observar o valor no card de resultado.

**Resultado esperado:**

- Resultado exibido: `23.48 %`.
- Campos continuam sendo os 7 de Pollock 7.

---

### CT-E2E-004 - Pollock 3 masculino com campos dinâmicos

**Prioridade:** Alta

**Passos:**

1. Selecionar protocolo Pollock 3 Dobras.
2. Selecionar gênero Masculino.
3. Validar quais campos de dobra estão visíveis.
4. Preencher idade 28, Peitoral 11, Abdominal 18, Coxa 20.

**Resultado esperado:**

- Apenas Peitoral, Abdominal e Coxa aparecem como dobras necessárias.
- Resultado exibido: `14.57 %`.

---

### CT-E2E-005 - Pollock 3 feminino com campos dinâmicos

**Prioridade:** Alta

**Passos:**

1. Selecionar protocolo Pollock 3 Dobras.
2. Selecionar gênero Feminino.
3. Validar campos visíveis.
4. Preencher idade 28, Tríceps 18, Suprailíaca 19, Coxa 24.

**Resultado esperado:**

- Apenas Tríceps, Suprailíaca e Coxa aparecem como dobras necessárias.
- Resultado exibido: `24.33 %`.

---

### CT-E2E-006 - Guedes masculino

**Prioridade:** Alta

**Passos:**

1. Selecionar protocolo Guedes e gênero Masculino.
2. Preencher idade 28, Tríceps 12, Suprailíaca 14, Abdominal 18.

**Resultado esperado:**

- Resultado exibido: `13.54 %`.
- Título do card: Guedes.

---

### CT-E2E-007 - Guedes feminino

**Prioridade:** Alta

**Passos:**

1. Selecionar protocolo Guedes e gênero Feminino.
2. Preencher idade 28, Suprailíaca 19, Coxa 24, Subescapular 14.

**Resultado esperado:**

- Resultado exibido: `24.80 %`.

---

### CT-E2E-008 - Faulkner

**Prioridade:** Alta

**Passos:**

1. Selecionar protocolo Faulkner.
2. Preencher idade 28, Tríceps 12, Subescapular 10, Suprailíaca 14, Abdominal 18.

**Resultado esperado:**

- Resultado exibido: `14.05 %`.
- Título do card: Faulkner.

---

### CT-E2E-009 - Petroski masculino

**Prioridade:** Alta

**Passos:**

1. Selecionar protocolo Petroski e gênero Masculino.
2. Preencher idade 28, Subescapular 10, Tríceps 12, Suprailíaca 14, Panturrilha 13.

**Resultado esperado:**

- Resultado exibido: `16.60 %`.

---

### CT-E2E-010 - Petroski feminino

**Prioridade:** Alta

**Passos:**

1. Selecionar protocolo Petroski e gênero Feminino.
2. Preencher idade 28, Axilar média 12, Suprailíaca 19, Coxa 24, Panturrilha 16.

**Resultado esperado:**

- Resultado exibido: `22.05 %`.

---

### CT-E2E-011 - Campo obrigatório faltante bloqueia resultado

**Prioridade:** Crítica

**Passos:**

1. Selecionar Pollock 7 Masculino.
2. Preencher idade e 6 das 7 dobras obrigatórias.
3. Deixar 1 dobra obrigatória vazia.

**Resultado esperado:**

- Card de resultado permanece `--`.
- Nenhum valor percentual é exibido enquanto houver campo obrigatório vazio.

---

### CT-E2E-012 - Alteração de protocolo recalcula com novos obrigatórios

**Prioridade:** Alta

**Passos:**

1. Preencher completamente Pollock 7 Masculino (Conjunto A).
2. Confirmar que existe resultado numérico.
3. Trocar para Pollock 3 Masculino sem editar os campos.

**Resultado esperado:**

- Campos visíveis mudam para os 3 obrigatórios de Pollock 3 masculino.
- Resultado é recalculado imediatamente com os dados já existentes nesses 3 campos.
- Valor esperado após troca: `14.57 %`.

---

### CT-E2E-013 - Troca de gênero altera dobras obrigatórias

**Prioridade:** Alta

**Passos:**

1. Selecionar Pollock 3.
2. Com gênero Masculino, validar campos: Peitoral, Abdominal, Coxa.
3. Trocar para Feminino.

**Resultado esperado:**

- Campos passam para Tríceps, Suprailíaca, Coxa.
- Se algum novo campo obrigatório estiver vazio, resultado volta para `--`.

---

### CT-E2E-014 - Entrada negativa não deve gerar resultado inválido

**Prioridade:** Média

**Passos:**

1. Em qualquer protocolo, tentar inserir valor negativo em um campo numérico.
2. Completar os demais campos obrigatórios.

**Resultado esperado:**

- Campo não deve aceitar valor negativo (ou deve normalizar para vazio/valor válido).
- Aplicação não quebra e não exibe `NaN %`.

---

### CT-E2E-015 - Valor decimal com ponto e refletido no cálculo

**Prioridade:** Média

**Passos:**

1. Selecionar Faulkner.
2. Informar idade 28 e dobras com decimal (ex.: 12.5, 10.5, 14.5, 18.5).
3. Observar resultado.

**Resultado esperado:**

- Campo aceita decimal.
- Resultado é exibido com duas casas decimais e sufixo `%`.
- Não ocorre erro visual nem travamento.

---

### CT-E2E-016 - Atualização em tempo real

**Prioridade:** Média

**Passos:**

1. Preencher um protocolo completo até exibir percentual.
2. Alterar apenas uma dobra (ex.: +1 mm).

**Resultado esperado:**

- Resultado muda imediatamente após alteração do campo.
- Formato permanece `NN.NN %`.

## Critérios de Aprovação

- Todos os casos de prioridade Crítica e Alta aprovados.
- Nenhum caso apresenta `NaN %`, tela em branco ou erro de execução no fluxo principal.
- Mudanças de protocolo/gênero mantêm coerência de campos obrigatórios.

## Observações para Automação Futura

- Sugerido criar suíte Playwright com IDs estáveis (`data-testid`) em selects, inputs e card de resultado.
- Cobrir pelo menos CT-E2E-002, CT-E2E-004, CT-E2E-011 e CT-E2E-013 como smoke/regressão inicial.
