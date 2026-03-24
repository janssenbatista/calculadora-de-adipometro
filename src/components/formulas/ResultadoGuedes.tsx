import type { CalculadoraComposicao, DadosAvaliacao } from '../../models/CalculadoraComposição';
import ResultadoFormulaCard from '../ResultadoFormulaCard';

interface ResultadoGuedesProps {
  calculadora: CalculadoraComposicao;
  dados: DadosAvaliacao;
  semDados: boolean;
}

function ResultadoGuedes({ calculadora, dados, semDados }: ResultadoGuedesProps) {
  const resultado = semDados ? null : calculadora.guedes(dados);

  return (
    <ResultadoFormulaCard
      titulo="Guedes"
      quandoUsar="Quando o foco é a população brasileira, especialmente jovens."
      publicoAlvo="Universitários e adultos jovens no Brasil."
      vantagem="Foi validado especificamente com dados da nossa população, o que costuma reduzir a margem de erro que fórmulas americanas (como Pollock) podem apresentar aqui."
      resultado={resultado}
    />
  );
}

export default ResultadoGuedes;
