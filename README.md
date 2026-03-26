# Calculadora de Adipômetro

A **Calculadora de Adipômetro** é uma ferramenta de avaliação corporal que permite calcular a composição corporal (percentual de gordura) através de diferentes protocolos e fórmulas científicas. A aplicação é responsiva, rápida e oferece feedback imediato conforme o usuário insere os dados.

### Fórmulas Suportadas

- **Pollock 7 Dobras**: Utiliza 7 pontos de medição (protocolo padrão)
- **Pollock 3 Dobras**: Versão simplificada com 3 medições
- **Guedes**: Protocolo brasileiro com fórmulas específicas
- **Faulkner**: Fórmula alternativa com 5 dobras
- **Petroski**: Protocolo validado com medições específicas

Cada fórmula adapta os campos obrigatórios conforme o gênero (masculino/feminino) selecionado.

## 🛠️ Tecnologias

- **React 19** com TypeScript
- **Vite** como bundler
- **Tailwind CSS** para estilização
- **Cypress** para testes E2E
- **ESLint + Prettier** para qualidade de código

## 📦 Instalação

### Pré-requisitos

- Node.js 22+
- npm ou pnpm

### Passo a Passo

1. Clone o repositório:

```bash
git clone https://github.com/janssenbatista/calculadora-de-adipometro
cd calculadora-de-adipometro
```

2. Instale as dependências:

```bash
npm install
# ou com pnpm
pnpm install
```

## 🚀 Como Executar

### Desenvolvimento

Inicie o servidor de desenvolvimento com hot reload:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

O bundle otimizado será gerado na pasta `dist/`.

### Preview do Build

```bash
npm run preview
```

### 🧪 Testes E2E

Esta aplicação utiliza **Cypress** para testes end-to-end, garantindo que todas as fórmulas calculam corretamente e a interface se comporta conforme esperado.

### Executar Testes em Modo Interativo

```bash
npm run test:e2e
```

Abre a interface do Cypress para executar e debugar testes manualmente.

### Executar Testes em Modo Headless

```bash
npm run test
```

Executa todos os testes automaticamente em background.

### Casos de Teste

A suite completa de testes é documentada em [tests/e2e/casos-teste-qa.md](tests/e2e/casos-teste-qa.md) e inclui:

| ID         | Descrição                                     | Prioridade | Concluído |
| ---------- | --------------------------------------------- | ---------- | --------- |
| CT-E2E-001 | Estado inicial da tela                        | Alta       | ✅        |
| CT-E2E-002 | Pollock 7 masculino com dados válidos         | Crítica    | ✅        |
| CT-E2E-003 | Pollock 7 feminino com dados válidos          | Crítica    | ✅        |
| CT-E2E-004 | Pollock 3 masculino com campos dinâmicos      | Alta       | ✅        |
| CT-E2E-005 | Pollock 3 feminino com campos dinâmicos       | Alta       | ✅        |
| CT-E2E-006 | Guedes masculino                              | Alta       | ✅        |
| CT-E2E-007 | Guedes feminino                               | Alta       | ✅        |
| CT-E2E-008 | Faulkner                                      | Alta       | ✅        |
| CT-E2E-009 | Petroski masculino                            | Alta       | ⏳        |
| CT-E2E-010 | Petroski feminino                             | Alta       | ⏳        |
| CT-E2E-011 | Campo obrigatório faltante bloqueia resultado | Crítica    | ✅        |
| CT-E2E-012 | Alteração de protocolo recalcula              | Alta       | ⏳        |
| CT-E2E-013 | Troca de gênero altera dobras obrigatórias    | Alta       | ⏳        |
| CT-E2E-014 | Entrada negativa não gera resultado inválido  | Média      | ⏳        |
| CT-E2E-015 | Valor decimal refletido no cálculo            | Média      | ⏳        |

**Todos os testes validam:**

- ✅ Campos exibidos mudam conforme protocolo e gênero
- ✅ Resultado só aparece quando todos os dados obrigatórios estão preenchidos
- ✅ Cálculos das fórmulas retornam os valores esperados
- ✅ Mudanças de entrada atualizam o resultado em tempo real
- ✅ Aplicação permanece estável em entradas inválidas

Para detalhes completos, consulte [tests/e2e/casos-teste-qa.md](tests/e2e/casos-teste-qa.md).

### 📝 Outros Comandos

```bash
# Lint do código
npm run lint

# Corrigir problemas de lint
npm run lint:fix

# Formatar código
npm run format

# Verificar formatação sem editar
npm run format:check
```

### 🎯 Como Usar a Calculadora

1. Abra a aplicação em desenvolvimento
2. Selecione o **protocolo** (fórmula) desejado
3. Selecione o **gênero** (masculino/feminino)
4. Preencha a **idade** (em anos)
5. Insira as **dobras cutâneas** (em milímetros) conforme solicitado
6. O resultado em **percentual de gordura (%)** será exibido automaticamente
