export type Genero = 'masculino' | 'feminino';

export interface DadosAvaliacao {
  idade: number;
  genero: Genero;
  dobras: {
    triceps?: number;
    subescapular?: number;
    suprailiaca?: number;
    abdominal?: number;
    coxa?: number;
    peitoral?: number;
    axilarMedia?: number;
    panturrilha?: number;
  };
}

export class CalculadoraComposicao {
  // 1. EQUAÇÃO DE SIRI (Conversão Final)
  private siri(dc: number): number {
    return parseFloat(((4.95 / dc - 4.5) * 100).toFixed(2));
  }

  // 2. POLLOCK 7 DOBRAS
  public pollock7(d: DadosAvaliacao): number {
    const { triceps, subescapular, suprailiaca, abdominal, coxa, peitoral, axilarMedia } = d.dobras;
    const soma =
      (triceps || 0) +
      (subescapular || 0) +
      (suprailiaca || 0) +
      (abdominal || 0) +
      (coxa || 0) +
      (peitoral || 0) +
      (axilarMedia || 0);

    let dc: number;
    if (d.genero === 'masculino') {
      dc = 1.112 - 0.00043499 * soma + 0.00000055 * Math.pow(soma, 2) - 0.00028826 * d.idade;
    } else {
      dc = 1.097 - 0.00046971 * soma + 0.00000056 * Math.pow(soma, 2) - 0.00012828 * d.idade;
    }
    return this.siri(dc);
  }

  // 3. POLLOCK 3 DOBRAS
  public pollock3(d: DadosAvaliacao): number {
    let soma: number;
    let dc: number;

    if (d.genero === 'masculino') {
      soma = (d.dobras.peitoral || 0) + (d.dobras.abdominal || 0) + (d.dobras.coxa || 0);
      dc = 1.10938 - 0.0008267 * soma + 0.0000016 * Math.pow(soma, 2) - 0.0002574 * d.idade;
    } else {
      soma = (d.dobras.triceps || 0) + (d.dobras.suprailiaca || 0) + (d.dobras.coxa || 0);
      dc =
        1.0994921 - 0.0009929 * soma + 0.0000023 * Math.pow(soma, 2) - 0.0001392 * d.idade;
    }

    return this.siri(dc);
  }

  // 4. GUEDES (Usa Logaritmo)
  public guedes(d: DadosAvaliacao): number {
    let dc: number;
    if (d.genero === 'masculino') {
      const soma =
        (d.dobras.triceps || 0) + (d.dobras.suprailiaca || 0) + (d.dobras.abdominal || 0);
      dc = 1.1714 - 0.063 * Math.log10(soma);
    } else {
      const soma =
        (d.dobras.suprailiaca || 0) + (d.dobras.coxa || 0) + (d.dobras.subescapular || 0);
      dc = 1.1665 - 0.0706 * Math.log10(soma);
    }
    return this.siri(dc);
  }

  // 5. FAULKNER (Direto, não usa Siri)
  public faulkner(d: DadosAvaliacao): number {
    const soma =
      (d.dobras.triceps || 0) +
      (d.dobras.subescapular || 0) +
      (d.dobras.suprailiaca || 0) +
      (d.dobras.abdominal || 0);
    return parseFloat((soma * 0.153 + 5.783).toFixed(2));
  }

  // 6. PETROSKI
  public petroski(d: DadosAvaliacao): number {
    let soma: number;
    if (d.genero === 'masculino') {
      soma =
        (d.dobras.subescapular || 0) +
        (d.dobras.triceps || 0) +
        (d.dobras.suprailiaca || 0) +
        (d.dobras.panturrilha || 0);
    } else {
      soma =
        (d.dobras.axilarMedia || 0) +
        (d.dobras.suprailiaca || 0) +
        (d.dobras.coxa || 0) +
        (d.dobras.panturrilha || 0);
    }

    const dc =
      1.10726863 - 0.00081201 * soma + 0.00000212 * Math.pow(soma, 2) - 0.00041761 * d.idade;
    return this.siri(dc);
  }
}
