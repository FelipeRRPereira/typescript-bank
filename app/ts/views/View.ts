import { logarTempoDeExecucao } from "../helpers/decorators/index";

export abstract class View<T> {
  private _elemento: JQuery;
  private _escape: boolean;

  constructor(seletor: string, escape = false) {
    this._elemento = $(seletor);
    this._escape = escape;
  }

  @logarTempoDeExecucao(true)
  update(model: T): void {
    let template = this.template(model);
    if (this._escape) template = template.replace(/<script>[\s\S]*?<\/script>/g, "");
    this._elemento.html(template);
  }

  abstract template(model: T): string;
}
