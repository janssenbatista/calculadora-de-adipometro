import { useMemo, useState } from 'react';
import CampoNumero from './CampoNumero';
import ResultadoFaulkner from './formulas/ResultadoFaulkner';
import ResultadoGuedes from './formulas/ResultadoGuedes';
import ResultadoPetroski from './formulas/ResultadoPetroski';
import ResultadoPollock3 from './formulas/ResultadoPollock3';
import ResultadoPollock7 from './formulas/ResultadoPollock7';
import {
  CalculadoraComposicao,
  type DadosAvaliacao,
  type Genero,
} from '../models/CalculadoraComposição';

type DobraKey = keyof DadosAvaliacao['dobras'];
type Protocolo = 'pollock7' | 'pollock3' | 'guedes' | 'faulkner' | 'petroski';

type DobrasInput = Record<DobraKey, string>;

const dobrasCampos: Array<{ chave: DobraKey; label: string }> = [
  { chave: 'triceps', label: 'Tríceps (mm)' },
  { chave: 'subescapular', label: 'Subescapular (mm)' },
  { chave: 'suprailiaca', label: 'Suprailíaca (mm)' },
  { chave: 'abdominal', label: 'Abdominal (mm)' },
  { chave: 'coxa', label: 'Coxa (mm)' },
  { chave: 'peitoral', label: 'Peitoral (mm)' },
  { chave: 'axilarMedia', label: 'Axilar média (mm)' },
  { chave: 'panturrilha', label: 'Panturrilha (mm)' },
];

const protocoloDobras: Record<Protocolo, Record<Genero, DobraKey[]>> = {
  pollock7: {
    masculino: [
      'triceps',
      'subescapular',
      'suprailiaca',
      'abdominal',
      'coxa',
      'peitoral',
      'axilarMedia',
    ],
    feminino: [
      'triceps',
      'subescapular',
      'suprailiaca',
      'abdominal',
      'coxa',
      'peitoral',
      'axilarMedia',
    ],
  },
  pollock3: {
    masculino: ['peitoral', 'abdominal', 'coxa'],
    feminino: ['triceps', 'suprailiaca', 'coxa'],
  },
  guedes: {
    masculino: ['triceps', 'suprailiaca', 'abdominal'],
    feminino: ['suprailiaca', 'coxa', 'subescapular'],
  },
  faulkner: {
    masculino: ['triceps', 'subescapular', 'suprailiaca', 'abdominal'],
    feminino: ['triceps', 'subescapular', 'suprailiaca', 'abdominal'],
  },
  petroski: {
    masculino: ['subescapular', 'triceps', 'suprailiaca', 'panturrilha'],
    feminino: ['axilarMedia', 'suprailiaca', 'coxa', 'panturrilha'],
  },
};

const estadoInicialDobras: DobrasInput = {
  triceps: '',
  subescapular: '',
  suprailiaca: '',
  abdominal: '',
  coxa: '',
  peitoral: '',
  axilarMedia: '',
  panturrilha: '',
};

function toNumber(valor: string): number {
  const normalizado = valor.replace(',', '.').trim();
  if (!normalizado) {
    return 0;
  }

  const numero = Number.parseFloat(normalizado);
  return Number.isFinite(numero) && numero >= 0 ? numero : 0;
}

function CalculadoraComposicaoComponent() {
  const calculadora = useMemo(() => new CalculadoraComposicao(), []);
  const [idade, setIdade] = useState<string>('');
  const [genero, setGenero] = useState<Genero>('masculino');
  const [protocolo, setProtocolo] = useState<Protocolo>('pollock7');
  const [dobras, setDobras] = useState<DobrasInput>(estadoInicialDobras);

  const dobrasNecessarias = useMemo(() => protocoloDobras[protocolo][genero], [genero, protocolo]);

  const camposDobrasVisiveis = useMemo(
    () => dobrasCampos.filter((campo) => dobrasNecessarias.includes(campo.chave)),
    [dobrasNecessarias],
  );

  const dados = useMemo<DadosAvaliacao>(
    () => ({
      idade: toNumber(idade),
      genero,
      dobras: {
        triceps: toNumber(dobras.triceps),
        subescapular: toNumber(dobras.subescapular),
        suprailiaca: toNumber(dobras.suprailiaca),
        abdominal: toNumber(dobras.abdominal),
        coxa: toNumber(dobras.coxa),
        peitoral: toNumber(dobras.peitoral),
        axilarMedia: toNumber(dobras.axilarMedia),
        panturrilha: toNumber(dobras.panturrilha),
      },
    }),
    [dobras, genero, idade],
  );

  const semDados =
    idade.trim() === '' || dobrasNecessarias.some((chaveDobra) => dobras[chaveDobra].trim() === '');

  const resultadoSelecionado =
    protocolo === 'pollock7' ? (
      <ResultadoPollock7 calculadora={calculadora} dados={dados} semDados={semDados} />
    ) : protocolo === 'pollock3' ? (
      <ResultadoPollock3 calculadora={calculadora} dados={dados} semDados={semDados} />
    ) : protocolo === 'guedes' ? (
      <ResultadoGuedes calculadora={calculadora} dados={dados} semDados={semDados} />
    ) : protocolo === 'faulkner' ? (
      <ResultadoFaulkner calculadora={calculadora} dados={dados} semDados={semDados} />
    ) : (
      <ResultadoPetroski calculadora={calculadora} dados={dados} semDados={semDados} />
    );

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-cyan-900">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 md:px-6 md:py-10">
        <header className="grid gap-1">
          <p className="text-xs font-bold tracking-[0.16em] text-cyan-300 uppercase">
            Composição corporal
          </p>
          <h1
            data-testid="titulo"
            className="text-3xl leading-tight font-black text-white md:text-5xl"
          >
            Calculadora de Adipômetro
          </h1>
          <span data-testid="subtitulo" className="max-w-2xl text-sm text-cyan-100/85 md:text-base">
            Resultados em percentual de gordura baseados nas fórmulas clássicas.
          </span>
        </header>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <form
            className="grid gap-4 rounded-3xl border border-cyan-200/30 bg-white/95 p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur-sm md:p-5"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="grid gap-1" htmlFor="protocolo">
              <span className="text-sm font-medium text-slate-700">Protocolo</span>
              <select
                data-testid="protocolo"
                id="protocolo"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 transition outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                value={protocolo}
                onChange={(event) => setProtocolo(event.target.value as Protocolo)}
              >
                <option value="pollock7">Pollock 7 Dobras</option>
                <option value="pollock3">Pollock 3 Dobras</option>
                <option value="guedes">Guedes</option>
                <option value="faulkner">Faulkner</option>
                <option value="petroski">Petroski</option>
              </select>
            </label>

            <div className="grid gap-3 md:grid-cols-2">
              <CampoNumero
                data-testid="idade"
                id="idade"
                label="Idade"
                value={idade}
                placeholder="Ex: 28"
                onChange={setIdade}
              />

              <label className="grid gap-1" htmlFor="genero">
                <span className="text-sm font-medium text-slate-700">Gênero</span>
                <select
                  data-testid="genero"
                  id="genero"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 transition outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  value={genero}
                  onChange={(event) => setGenero(event.target.value as Genero)}
                >
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
              </label>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Dobras necessarias para o protocolo selecionado
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {camposDobrasVisiveis.map((campo) => (
                  <CampoNumero
                    data-testid={campo.chave}
                    key={campo.chave}
                    id={campo.chave}
                    label={campo.label}
                    value={dobras[campo.chave]}
                    onChange={(value) =>
                      setDobras((estadoAtual) => ({
                        ...estadoAtual,
                        [campo.chave]: value,
                      }))
                    }
                  />
                ))}
              </div>
            </div>
          </form>

          <aside className="grid content-start gap-3 rounded-3xl border border-cyan-200/30 bg-white/95 p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur-sm md:p-5">
            {resultadoSelecionado}
          </aside>
        </div>
      </div>
    </section>
  );
}

export default CalculadoraComposicaoComponent;
