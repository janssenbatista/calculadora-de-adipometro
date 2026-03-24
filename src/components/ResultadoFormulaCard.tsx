interface ResultadoFormulaCardProps {
  titulo: string;
  quandoUsar: string;
  publicoAlvo: string;
  vantagem: string;
  resultado: number | null;
}

function ResultadoFormulaCard({
  titulo,
  quandoUsar,
  publicoAlvo,
  vantagem,
  resultado,
}: ResultadoFormulaCardProps) {
  const valor = resultado === null ? '--' : `${resultado.toFixed(2)} %`;

  return (
    <article className="rounded-2xl border border-cyan-100 bg-cyan-50/60 p-4 shadow-sm">
      <h3 data-testid="titulo-resultado" className="text-lg font-semibold text-slate-800">
        {titulo}
      </h3>
      <ul className="ml-4 list-disc">
        <li data-testid="quando-usar">
          <span className="font-medium">Quando usar: </span>
          {quandoUsar}
        </li>
        <li data-testid="publico-alvo">
          <span className="font-medium">Público alvo: </span>
          {publicoAlvo}
        </li>
        <li data-testid="vantagem">
          <span className="font-medium">Vantagem: </span>
          {vantagem}
        </li>
      </ul>
      <strong
        data-testid="resultado"
        className="mt-3 inline-block text-2xl font-bold text-cyan-700"
      >
        {valor}
      </strong>
    </article>
  );
}

export default ResultadoFormulaCard;
