import type { CalculadoraComposicao, DadosAvaliacao } from '../../models/CalculadoraComposição';
import ResultadoFormulaCard from '../ResultadoFormulaCard';

interface ResultadoPollock3Props {
  calculadora: CalculadoraComposicao;
  dados: DadosAvaliacao;
  semDados: boolean;
}

function ResultadoPollock3({ calculadora, dados, semDados }: ResultadoPollock3Props) {
  const resultado = semDados ? null : calculadora.pollock3(dados);

  return (
    <ResultadoFormulaCard
      titulo="Pollock 3 Dobras"
      quandoUsar="Em ambientes de alto volume, como triagens de academias ou avaliações rápidas."
      publicoAlvo="Alunos de musculação em geral (fitness)."
      vantagem="Muito mais rápido de aplicar do que o de 7 dobras, mantendo uma correlação estatística aceitável com o método completo."
      resultado={resultado}
    />
  );
}

export default ResultadoPollock3;
