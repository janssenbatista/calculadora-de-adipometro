import type { CalculadoraComposicao, DadosAvaliacao } from '../../models/CalculadoraComposição';
import ResultadoFormulaCard from '../ResultadoFormulaCard';

interface ResultadoPetroskiProps {
  calculadora: CalculadoraComposicao;
  dados: DadosAvaliacao;
  semDados: boolean;
}

function ResultadoPetroski({ calculadora, dados, semDados }: ResultadoPetroskiProps) {
  const resultado = semDados ? null : calculadora.petroski(dados);

  return (
    <ResultadoFormulaCard
      titulo="Petroski"
      quandoUsar="Quando há acúmulo de gordura concentrado nos membros inferiores ou para uma análise mais regional."
      publicoAlvo="População brasileira de diversas faixas etárias."
      vantagem="É um dos poucos que utiliza a panturrilha como ponto de medição, sendo excelente para identificar variações que os outros métodos ignoram."
      resultado={resultado}
    />
  );
}

export default ResultadoPetroski;
