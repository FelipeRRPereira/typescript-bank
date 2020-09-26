import { Negociacao } from "./index";

export class Negociacoes {
  private _negociacoes: Negociacao[] = [];

  adiciona(negociacao: Negociacao): void {
    this._negociacoes.push(negociacao);
  }

  get paraArray(): Negociacao[] {
    return [].concat(this._negociacoes);
  }
}
