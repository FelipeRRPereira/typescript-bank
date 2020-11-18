import { domInject, throttle } from "../helpers/decorators/index";
import { Negociacao, Negociacoes } from "../models/index";
import { NegociacaoService } from "../services/index";
import { MensagemView, NegociacoesView } from "../views/index";

export class NegociacaoController {
  @domInject("#data")
  private _inputData: JQuery;
  @domInject("#quantidade")
  private _inputQuantidade: JQuery;
  @domInject("#valor")
  private _inputValor: JQuery;
  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView("#negociacoesView");
  private _mensagemView = new MensagemView("#mensagemView");
  private _service = new NegociacaoService();

  constructor() {
    this._negociacoesView.update(this._negociacoes);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @throttle()
  adiciona(event: Event) {
    event.preventDefault();

    const data = new Date(this._inputData.val()?.toString().replace(/-/g, ",") || "");
    if (!this._ehDiaUtil(data)) {
      this._mensagemView.update("Somente negociações em dias úteis, por favor!");
      return;
    }

    const negociacao = new Negociacao(
      data,
      parseInt(this._inputQuantidade.val()?.toString() || ""),
      parseFloat(this._inputValor.val()?.toString() || "")
    );

    this._negociacoes.adiciona(negociacao);
    this._negociacoesView.update(this._negociacoes);

    this._mensagemView.update("Negociação adicionada com sucesso!");
  }

  private _ehDiaUtil(data: Date) {
    return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
  }

  @throttle()
  importarDados(): void {
    const isOk = (res: Response) => {
      if (res.ok) {
        return res;
      } else {
        throw new Error(res.statusText);
      }
    };

    this._service.obterNegociacoes(isOk).then((negociacoes: Negociacao[]) => {
      negociacoes.forEach((negociacao: Negociacao) => this._negociacoes.adiciona(negociacao));
      this._negociacoesView.update(this._negociacoes);
    });
  }
}

enum DiaDaSemana {
  Domingo,
  Segunda,
  Terca,
  Quarta,
  Quinta,
  Sexta,
  Sabado,
}
