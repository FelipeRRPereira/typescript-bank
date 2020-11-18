import { NegociacaoController } from "./controllers/NegociacaoController";

const controller = new NegociacaoController();
$(".form").submit(controller.adiciona.bind(controller));
$("#botao-importa").on("click", controller.importarDados.bind(controller));
