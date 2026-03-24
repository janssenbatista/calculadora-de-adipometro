import type { CalculadoraComposicao, DadosAvaliacao } from '../../models/CalculadoraComposição';
import ResultadoFormulaCard from '../ResultadoFormulaCard';

interface ResultadoFaulknerProps {
  calculadora: CalculadoraComposicao;
  dados: DadosAvaliacao;
  semDados: boolean;
}

function ResultadoFaulkner({ calculadora, dados, semDados }: ResultadoFaulknerProps) {
  const resultado = semDados ? null : calculadora.faulkner(dados);

  return (
    <ResultadoFormulaCard
      titulo="Faulkner"
      quandoUsar="Exclusivamente para atletas ou pessoas com percentual de gordura muito baixo."
      publicoAlvo="Atletas de alto rendimento (futebol, corrida, etc.)."
      vantagem='É uma fórmula mais "rígida". Ela tende a dar resultados de %GC mais baixos, o que é preferido por atletas que precisam monitorar variações mínimas de gordura subcutânea.'
      resultado={resultado}
    />
  );
}

export default ResultadoFaulkner;
