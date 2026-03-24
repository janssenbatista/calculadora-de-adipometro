import type { CalculadoraComposicao, DadosAvaliacao } from '../../models/CalculadoraComposição';
import ResultadoFormulaCard from '../ResultadoFormulaCard';

interface ResultadoPollock7Props {
  calculadora: CalculadoraComposicao;
  dados: DadosAvaliacao;
  semDados: boolean;
}

function ResultadoPollock7({ calculadora, dados, semDados }: ResultadoPollock7Props) {
  const resultado = semDados ? null : calculadora.pollock7(dados);

  return (
    <ResultadoFormulaCard
      titulo="Pollock 7 Dobras"
      quandoUsar='É o "padrão ouro" para avaliações clínicas detalhadas.'
      publicoAlvo="Pessoas que buscam o maior nível de precisão possível e têm tempo para uma avaliação completa."
      vantagem="Por medir 7 pontos diferentes, ele dilui erros de medição individual e cobre quase todas as regiões de acúmulo de gordura."
      resultado={resultado}
    />
  );
}

export default ResultadoPollock7;
