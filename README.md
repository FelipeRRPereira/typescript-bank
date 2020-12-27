<p align="center">
   <img src="readme/ts-logo.png" width="200" />
</p>

<h2 align="center">
  Curso Alura TypeScript - Bank App
</h2>

[![Autor](https://img.shields.io/badge/Student-FelipeRRPereira-0077D6?style=flat-square)](https://github.com/FelipeRRPereira)
[![Languages](https://img.shields.io/github/languages/count/FelipeRRPereira/typescript-bank?color=0077D6&label=Langueges&style=flat-square)](#)
[![GitHub issues](https://img.shields.io/github/issues/FelipeRRPereira/typescript-bank?color=0077D6&label=Issues&style=flat-square)](https://github.com/FelipeRRPereira/typescript-bank/issues)
[![GitHub forks](https://img.shields.io/github/forks/FelipeRRPereira/typescript-bank?color=0077D6&label=Forks&style=flat-square)](https://github.com/FelipeRRPereira/typescript-bank/network)
[![GitHub stars](https://img.shields.io/github/stars/FelipeRRPereira/typescript-bank?label=Stars&style=flat-square)](https://github.com/FelipeRRPereira/typescript-bank/stargazers)

## Índice

<ul>
  <li><a href="#-iniciando-projeto">Iniciando projeto</a></li>
  <li><a href="#-conteúdos">Conteúdos</a></li>
</ul>

---

## 🚀 Iniciando projeto

### Pré-requisitos

- Para rodar o projeto será necessário instalar o [Node](https://nodejs.org/en/download/).
- Clonar este repositório para sua maquina local.

```powershell
git clone https://github.com/FelipeRRPereira/typescript-bank
```

- Instalar dependência do TypeScript.

```powershell
npm install
```

### Rodar projeto

- O Type script é compilado para código JavaScript por isso execute o seguinte comando:

```powershell
npm start
```

Obs.: Comando é possível devido o modificação do packege.json. Veja a seguir o objeto JSON "scripts".

```json
"scripts": {
  "compile": "tsc",
  "start": "tsc -w"
},
```

Outro ponto importante é que todo projeto TypeScript tem que ter um arquivo tsconfig.json com as instruções necessárias para compilação de código.

```json
{
  "compilerOptions": {
    "target": "ES6", // Compilação feita para EcmaScript 6
    "outDir": "app/js", // Pastas de saída da compilação
    "noEmitOnError": true, // Trava para somente gerar os arquivos se não existir erros na compilação do projeto
    "removeComments": true // Remove qualquer comentario feito no arquivo TypeScript
  },
  "include": [
    "app/ts/**/*" // Pasta de entrada onde serão compilados os arquivos TypeScript
  ]
}
```

---

## 📑 Conteúdos

---

### 🔒 Modificador de acesso

No TypeScript é possível a utilização do uso de modificadores de acesso como nas linguagens mais comuns Orientadas a Objeto como o Java ou C#.

- _Public_ - Acesso liberado fora da classe.
- _Private_ - Acesso na própria classe.
- _Protected_ - Acesso em apenas para a própria classe ou classes que estendem da mesma.

### ✅ Tipagem Explicita

Um dos objetivos do TypeScript é tipar propriedades e métodos aumentando a chance de encontrar erros em tempo de compilação e uma forma de documentar para que as IDEs como VScode possam autocompletar com aquilo que é esperado pelo método chamado. Porém a tipagem vem por padrão com "implicity any" para caso esteja migrando projetos para TypeScript não tenha um susto logo de cara.

Para mudar set a seguinte configuração no `tsconfig.json`:

```json
"compilerOptions": {
    "target": "ES6",
    "outDir": "app/js",
    "noEmitOnError": true,
    "noImplicitAny": true, // AQUI
		"removeComments": true
  },
```

Para explicitar os tipos dos atributos da classe podem ser feitos das seguintes formas:

```tsx
class Negociacao {
  private _data: Date;
  private _quantidade: number;
  private _valor: number;

  constructor(data: Date, quantidade: number, valor: number) {
    this._data = new Date(data);
    this._quantidade = quantidade;
    this._valor = valor;
  }
}
```

OU

```tsx
class Negociacao {
  constructor(private _data: Date, private _quantidade: number, private _valor: number) {}
}
```

Note que no segundo exemplo não é necessário declarar os atributos separados e depois atribuir os valores que vem do construtor.

**Tipos `string` e `number` vs `String` e `Number`**

Podemos notar que para tipar nossos atributos utilizamos o number e o string com letra minuscula que são os tipos literais e os com letra maiúscula são os tipos Objeto.

**Conversão explicita**

Na utilização do TypeScript ocorrerão situações que será necessário utilizar de casting, ou seja de conversão explicita de tipo. Segue exemplo:

```tsx
let tabela = <HTMLTableElement>document.querySelector("table");
```

No caso estamos atribuído a variável tabela o um objeto do DOM com tipo `HTMLTableElemet`.

**Tipagem em métodos**

Na classe a seguir temos dois métodos com objetivos e retornos diferentes, no método `adiciona()` por exemplo estamos atribuindo um valor ao array de Negociação onde não a retorno e o TypeScript possibilita informarmos o tipo de retorno void na sua assinatura o que qualquer tentativa de retorno mostrara um erro em momento de compilação. Já no método `paraArray()` informamos que o tipo de retorno é um array de Negociação o qual podemos usar de recursos para mantermos seguro o nosso código sem perder a facilidade de autocompletar.

```tsx
class Negociacoes {
  private _negociacoes: Negociacao[] = [];

  adiciona(negociacao: Negociacao): void {
    this._negociacoes.push(negociacao);
  }

  get paraArray(): Negociacao[] {
    return [].concat(this._negociacoes);
  }
}
```

**Tipo genérico**

No TypeScript também é possível aproveitar do conceito de genéricos que à em outras linguagens orientadas a objeto como Java e C#. Observe a seguir as três classes sem genérico.

```tsx
class View {
  protected _elemento: Element;

  constructor(seletor: string) {
    this._elemento = document.querySelector(seletor);
  }
}

class MensagemView extends View {
  update(model: string): void {
    this._elemento.innerHTML = this.template(model);
  }

  template(model: string): string {
    return `<p class="alert alert-info">${model}</p>`;
  }
}

class NegociacoesView extends View {
  update(model: Negociacoes): void {
    this._elemento.innerHTML = this.template(model);
  }

  template(model: Negociacoes): string {
    return `... implementação extra ...`;
  }
}
```

Podemos observar que tanto `MensagemView` quanto `NegociacoesView` estendem da classe View reaproveitando o atributo e o construtor. E se observarmos melhor não notamos mais coisas que poderiam ser reaproveitadas como o método update e o template? Outra coisa a ser observada é que a unica diferença entre os métodos das classes é os tipos passados por parâmetros nos métodos. Veja a implementação a seguir utilizando o _tipo genérico_ ou _generics_.

```tsx
class View<T> {
  private _elemento: Element;

  constructor(seletor: string) {
    this._elemento = document.querySelector(seletor);
  }

  update(model: T): void {
    this._elemento.innerHTML = this.template(model);
  }

  template(model: T): string {
    throw new Error("Deve ser implementado o método.");
  }
}

class MensagemView extends View<string> {
  template(model: string): string {
    return `<p class="alert alert-info">${model}</p>`;
  }
}

class NegociacoesView extends View<Negociacoes> {
  template(model: Negociacoes): string {
    return `
	     ... implementação extra ...  
    `;
  }
}
```

Notem agora que na classe pai tem um `<T>` em sua declaração. Esse `<>` indica que ao expender será necessário informar o _tipo genérico_ utilizado e onde o `T` estiver na classe assumira o tipo passado via `extends`. Com isso, podemos perceber que o método `update` foi totalmente reaproveitado e o `template` sobrescrito nas classes filhas. Outro ponto não menos importante é que como as responsabilidades subiram para a classe pai não é mais necessário declarar o atributo `_elemento` como `protected` retirando a flexibilização.

**Classes e métodos abstratos**

Outro recuso da orientação a objetos também implementado pelo TypeScript é a utilização de classes abstratas. Veja o exemplo a seguir:

```tsx
abstract class View<T> {
  private _elemento: Element;

  constructor(seletor: string) {
    this._elemento = document.querySelector(seletor);
  }

  update(model: T): void {
    this._elemento.innerHTML = this.template(model);
  }

  abstract template(model: T): string;
}
```

A criação das classes ou métodos abstratos nos permite enrijecer nosso código não permitindo instanciar uma classe que não pode ser instanciada e esse é o caso da classe `View` que necessita de um `template` para executar o método `update`. Já nos métodos uma opção utilizada no _ES6_ é criar um método com um retorno de um erro com uma mensagem que será identificada em tempo de execução, mas com o TypeScript e o uso da palavra chave `abstract` no inicio do método sem o corpo acaba obrigando em momento de desenvolvimento a implementação do método.

**TypeScript Definitions**

Em dado momento do nosso projeto resolvemos utilizar a lib JQuery para manipular o DOM de forma menos verbosa. Porém, como o nosso projeto utiliza TypeScript notamos que teremos erros de compilação se não utilizarmos uma forma para silenciar nosso corretor. Observe a variavel `$` declarada como `any` na primeira linha, a qual é utilizada para buscar um seletor do DOM. Porém essa pratica acaba comprometendo funcionalidades que o TypeScript nos fornece, como o autocomplete e descrição dos métodos.

```tsx
declare var $: any;
abstract class View<T> {
  private _elemento: any;

  constructor(seletor: string) {
    this._elemento = $(seletor);
  }

  update(model: T): void {
    this._elemento.html = this.template(model);
  }

  abstract template(model: T): string;
}
```

Para solucionar esse problema utiliza-se um arquivo chamado TypeScript Declaration File que armazena informações dos nomes dos métodos, funções e tipos que podem ser utilizados pelo TypeScript. A unica coisa que precisamos fazer é instalar os types da lib utilizada. Veja o exemplo da lib JQuery:

```powershell
npm install @types/jquery --save-dev
```

Agora observe como ficara o código utilizando os TypeScript Definitions:

```tsx
abstract class View<T> {
  private _elemento: JQuery;

  constructor(seletor: string) {
    this._elemento = $(seletor);
  }

  update(model: T): void {
    this._elemento.html(this.template(model));
  }

  abstract template(model: T): string;
}

class NegociacaoController {
  private _inputData: JQuery;
  private _inputQuantidade: JQuery;
  private _inputValor: JQuery;
  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView("#negociacoesView");
  private _mensagemView = new MensagemView("#mensagemView");

  constructor() {
    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");
    this._negociacoesView.update(this._negociacoes);
  }

  adiciona(event: Event) {
    event.preventDefault();

    const negociacao = new Negociacao(
      new Date(this._inputData.val().toString().replace(/-/g, ",")),
      parseInt(this._inputQuantidade.val().toString()),
      parseFloat(this._inputValor.val().toString())
    );

    ... sequencia da implementação ...
  }
}
```

Nas classes de exemplo acima utilizamos os types do JQuery sem perder nada das vantagens do TypeScript.

**Namespaces**

No TypeScript é possível utilizar o _namespace_ como recurso para agrupar classes. Veja a seguir:

```tsx
namespace Views {
  export abstract class View<T> {
    private _elemento: JQuery;

    constructor(seletor: string) {
      this._elemento = $(seletor);
    }

    update(model: T): void {
      this._elemento.html(this.template(model));
    }

    abstract template(model: T): string;
  }
}

Views.View...
```

No código acima é possível notar que ao escrever a _namespace Views_ o editor já sugere as classes que são exportadas de dentro da _namespace_.

**Namespace ES2015**

Já no ES2015 as _namespace_ foram simplificadas da seguinte forma.

```tsx
import { View } from "./View";

export class MensagemView extends View<string> {
  template(model: string): string {
    return `<p class="alert alert-info">${model}</p>`;
  }
}
```

Note que a palavra reservada _export_ na classe dando a possibilidade de ser importada em qualquer outro arquivo com o `import {} from './...'`.

**Carregamento de módulos**

Para carregar os módulos sem a necessidade de importa-los no _HTML_ como a seguir o TypeScript nós permite carregar configurações através do `tsconfig.json` onde vamos adicionar um _module_ _loader_ chamado `System.js`.

```html
...
    <script src="lib/jquery.min.js"></script>
    <script src="js/models/Negociacao.js"></script>
    <script src="js/models/Negociacoes.js"></script>
    <script src="js/controllers/NegociacaoController.js"></script>
    <script src="js/views/View.js"></script>
    <script src="js/views/NegociacoesView.js"></script>
    <script src="js/views/MensagemView.js"></script>
    <script src="js/app.js"></script>
</body>

</html>
```

Arquivo `tsconfig.json`.

```json
{
  "compilerOptions": {
    ...
    "module": "system"
  },
  "include": [
    "app/ts/**/*"
  ]
}
```

Ao adicionar o módulo no `tsconfig.json` é necessário indicar onde deve ser carregados os arquivos JavaScript.

```html
...
<script src="lib/jquery.min.js"></script>
<script src="lib/system.js"></script>
<script>
  System.defaultJSExtensions = true;
  System.import("js/app.js").catch((err) => console.error(err));
</script>
...
```

Note que existe uma configuração `System.defaultJSExtensions = true`

**Servidor Local**

Utilizado para carregamento de paginas ao atualizar código JavaScript.

```bash
npm install lite-server --save-dev
```

Para utilizar basta atulizar o `package.json` informando o local a ser executado o servidor. Observe abaixo:

```json
...
"scripts": {
    "compile": "tsc",
    "start": "tsc -w",
    "server": "lite-server --baseDir=app"
  },
...
```

Adicionado opção `server` no scripts informando a `baseDir` a ser executada e para rodar a execução do _server_ basta rodar o comando abaixo via _terminal:_

```powershell
npm run server
```

Para obter o beneficio de recopilação e execução do código no browser é necessário rodar também o seguinte comando necessitando ter dois terminais abertos.

```powershell
npm start
```

Para resolver a questão de executar em terminais separados dois comandos vamos utilizar uma dependência chamada _concurrently._

**Concurrently Dependeces**

```powershell
npm install concurrently --save-dev
```

Após a instalação é necessário configurar a execução do binário com os dois outros _scripts_. Note abaixo que alteramos o `start` para `watch` e criamos um novo start fazendo uso da nova dependência.

```json
...
"scripts": {
    "compile": "tsc",
    "watch": "tsc -w",
    "server": "lite-server --baseDir=app",
    "start": "concurrently \"npm run watch\" \"npm run server\""
  },
...
```

**Barrel**

Para facilitar a importação dos módulos é possível adotar uma estratégia que condensa tudo dentro de um barril. Com isso, vamos criar um `models/index.ts` dentro das pastas que desejamos condensar.

```tsx
export * from "./Negociacao";
export * from "./Negociacoes";
```

Após é só importar nos arquivos necessários da seguinte forma:

```tsx
import { Negociacoes, Negociacao } from "../models/index";
```

**Readonly**

Para acessar atributos declarados como _private_ precisamos criar os _gettes_, porém no _TypeScript_ podemos usar uma propriedade chamada _readonly_.

```tsx
export class Negociacao {
  constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) {}

  get volume() {
    return this.quantidade * this.valor;
  }
}
```

**Parâmetros opcionais**

No _TypeScript_ temos o recurso de declararmos parâmetros opcionais no construtor da classe, possibilitando flexibilidade na adição de novas funcionalidades. Veja a seguir:

```tsx
...
constructor(seletor: string, escape?: boolean) {
  this._elemento = $(seletor);
  this._escape = escape;
}
...
```

Único cuidado necessário é que devemos declarar os parâmetros opcionais sempre por último. Caso não for tido o cuidado será mostrado um erro.

**StrictNullChecks**

O modo _strictNullChecks_ é uma propriedade do _TypeScript_ que passa a não aceitar com que variáveis tipadas recebam _null_ ou _undefined._ Para utilizar o recurso basta adicionar a seguinte configuração:

```tsx
{
  "compilerOptions": {
    "target": "ES6",
    "outDir": "app/js",
    "noEmitOnError": true,
    "noImplicitAny": true,
    "removeComments": true,
    "module": "system",
    "strictNullChecks": true
  },
  "include": [
    "app/ts/**/*"
  ]
}
```

**Enums**

No _TypeScript_ e possível a utilização de _enums_ que são tipos abstratos com valores atribuídos a cada elemento com identificadores. Veja a seguir:

```tsx
enum DiaDaSemana {
  Domingo,
  Segunda,
  Terca,
  Quarta,
  Quinta,
  Sexta,
  Sabado,
}
```

Note o uso do _enum_ no exemplo a seguir, onde verificamos se o dia é um dia útil.

```tsx
export class NegociacaoController {
  ...
	private _ehDiaUtil(data: Date) {
    return (
      data.getDay() != DiaDaSemana.Sabado &&
      data.getDay() != DiaDaSemana.Domingo
    );
  }
}
```

Olhando a [documentação](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay) do `Date.getDay` podemos perceber que o método retorna um _number_ para cada dia da semana sendo que o 0 representa o Domingo. O mesmo é comparado com o _enum_ que segue a mesma regra se não for atribuido nenhum valor de ponteiro, retornando _true_ ou _false_ se for sábado ou domingo.

**Decorators**

Outra funcionalidade para criação de logs ou teste de performance é o Decorators. Por enquanto, uma proposta em estagio 2 que pode ser utilizada como recurso experimental no TypeScript. Veja como abilita-la a seguir:

```json
{
  "compilerOptions": {
    ...,
    "experimentalDecorators": true
  },
  "include": [
    "app/ts/**/*"
  ]
}
```

Os decorators são formas de sobrescrever a função a ser executada utilizando a notação `@nome-do-decorator` acima da função a qual deseja sobrescreve, possibilitando assim executar algo de forma adicional. Um exemplo de uso é testar a performance de execução de determinada função. Veja a seguir:

```tsx
export const logarTempoDeExecucao = (emSegundos = false) => (
  _target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const metodoOriginal = descriptor.value;

  descriptor.value = function (...args: unknown[]) {
    let divisor = 1;
    let unidade = "milisegundos";
    if (emSegundos) {
      divisor = 1000;
      unidade = "segundos";
    }

    console.log("-----------------------");
    console.log(`Parâmetros do método ${propertyKey}: ${JSON.stringify(args)}`);
    const t1 = performance.now();
    const resultado = metodoOriginal.apply(this, args);

    console.log(`Resultado do método: ${JSON.stringify(resultado)}`);
    const t2 = performance.now();

    console.log(`${propertyKey} demorou ${(t2 - t1) / divisor} ${unidade}`);
    console.log("-----------------------");

    return resultado;
  };

  return descriptor;
};
```

Em um primeiro momento parece algo complexo, porém se você olhar com atenção vai perceber que é apenas uma função retornando outra, guardando a função a ser sobrescrita em uma variável e sobrescrevendo a mesma com as novas funcionalidades e executando a original no meio. Isso permite que você utilize um código de medidor de performance em qualquer função. Para uso do _decorator_ veja a seguir:

```tsx
import { logarTempoDeExecucao } from "../helpers/decorators/index";

export abstract class View<T> {
  ...
  @logarTempoDeExecucao(true)
  update(model: T): void {
    ...
  }
	...
}
```

**Lazy Loading com Decorators**

_Lazy loading_ é um padrão de projeto utilizado para adiar a inicialização de um objeto até que ele seja realmente usado. Veremos esse conceito aplicado com o _Decorators_ em propriedades. Veja a seguir:

```tsx
export const domInject = (selector: string) => (target: unknown, key: string): void => {
  let elemento: JQuery;
  const getter = () => {
    if (!elemento) {
      console.log(`Buscando ${selector} para injetar em ${key}`);
      elemento = $(selector);
    }
    return elemento;
  };

  Object.defineProperty(target, key, {
    get: getter,
  });
};
```

Na primeira função é passado o nome do _seletor_ que queremos encontrar na _DOM_. Na segunda função temos a declaração da variável elemento do tipo _JQuery_. Se a mesma não existir é associado o seletor informado ao elemento que é retornado para `const getter`. Para que o elemento seja acessado via get é necessário definir sua propriedade via `Object.defineProperty` passando _target_, _key_ e _get_.

**Decorators em Classes**

No TypeScript também temos a possibilidade de implementar decorators em classes, sobrescrevendo o construtor da mesma. Veja exemplo:

```tsx
export function meuDecoratorDeClasse() {
  return function (constructor: any) {
    // guarda o constructor original, pois iremos definir um novo
    const original = constructor;

    // cria um novo constructor. Como ele pode receber nenhum ou mais parâmetros,
    //usamos ...args: any[]
    const novo: any = function (...args: any[]) {
      console.log("Criando uma instância com New: " + original.name);
      // cria a instância da classe quando for chamado
      return new original(...args);
    };

    // importante! O prototype do novo constructor deve ser o mesmo do original
    novo.prototype = original.prototype;

    // retorna o novo constructor
    return novo;
  };
}

// para adicionar na classe
@meuDecoratorDeClasse()
export class NegociacaoController {
  // código omitido
}
```

**Interface para Definição de Atributos**

Interface é um recurso bastante conhecido em outras em outras linguagens de programação e em TypeScript também pode ser aproveitado os benefícios do seu uso, podendo definir o esqueleto de dados recebidos via API. Veja o exemplo:

```tsx
export interface NegociacaoParcial {
  vezes: number;
  montante: number;
}

export class NegociacaoController {
  ...
  importarDados(): void {
    const isOk = (res: Response) => {
      if (res.ok) {
        return res;
      } else {
        throw new Error(res.statusText);
      }
    };
    fetch("http://localhost:8080/dados")
      .then((res) => isOk(res))
      .then((res) => res.json())
      .then((dados: NegociacaoParcial[]) => {
        dados
          .map((dado) => new Negociacao(new Date(), dado.vezes, dado.montante))
          .forEach((negociacao) => this._negociacoes.adiciona(negociacao));
        this._negociacoesView.update(this._negociacoes);
      })
      .catch((err) => console.log(err.message));
  }
}
```

Note que declaramos uma interface chamada `NegociacaoParcial` que é utilizada no `fetch` para definir os dados do _array_ recebido da API.

**Throttle com Decorators**

O Throttle é uma técnica simples de barrar ou evitar que seja feito múltiplas requisições ao _backend_, aquelas situações onde é o usuário clica múltiplas vezes no botão de compra sem "intenção" gerando algum problema e que muitas vezes são tratadas no _backend_. O logica é bem simples, se adiciona um _timeout_ que só efetua a requisição após um tempo determinado sem _click_, se foi clicado varias vezes o _timer_ começa a contar novamente. Veja a seguir:

```tsx
export const throttle = (milisegundos = 500) => (
  _target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor => {
  const metodoOriginal = descriptor.value;
  let timer = 0;

  descriptor.value = function (...args: unknown[]) {
    if (event) event.preventDefault();
    clearInterval(timer);
    timer = setTimeout(() => metodoOriginal.apply(this, args), milisegundos);
  };

  return descriptor;
};
```

Podemos notar a semelhança com o decorator `logarTempoDeExecucao`, ou seja, usaremos o recurso em um decorator para ser possivel utilizar em qualquer interação de click sem precisarmos utilizar repetição de código. E como já vimos anteriormente, para utilizar o decorator é só adicionar acima do método que deseja o `@nome-do-decorator`.

**Polimorfismo**

No _TypeScript_ também podemos aproveitar dos benefícios do polimorfismo onde criaremos uma classe abstrata chamada `Imprimivel` que será herdada pela classe `Negociacao` e `Negociacoes`. O objetivo desta classe é ditar um padrão de método de impressão de logs no console dos atributos das classes que a herdarem. Veja a seguir:

```tsx
export abstract class Imprimivel {
  abstract paraTexto(): void;
}

export class Negociacao extends Imprimivel {
  constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) {
    super();
  }

  get volume(): number {
    return this.quantidade * this.valor;
  }

  paraTexto(): void {
    console.log("-- paraTexto --");
    console.log(
      `Data: ${this.data}
            Quantidade: ${this.quantidade},
            Valor: ${this.valor},
            Volume: ${this.volume}`
    );
  }
}
```

Precisamos observar a questão do uso do `super()` no construtor ao utilizar herança devido a necessidade de recebermos o construtor da classe pai mesmo sendo "vazio".

**Implementando Interfaces em Classes**

No item anterior, vemos a possibilidade de implementarmos o uso de herança no _TypeScript_, porém, só é possível herdar de uma única classe. Mas, com o uso de interface é possível implementar a mesma ideia sem gastar a herança permitida. Veja a seguir:

```tsx
import { Igualavel, Imprimivel } from "./index";

export class Negociacao implements Imprimivel, Igualavel<Negociacao> {
  constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) {}

  get volume(): number {
    return this.quantidade * this.valor;
  }

  paraTexto(): void {
    console.log("-- paraTexto --");
    console.log(
      `Data: ${this.data}
            Quantidade: ${this.quantidade},
            Valor: ${this.valor},
            Volume: ${this.volume}`
    );
  }

  ehIgual(negociacao: Negociacao): boolean {
    return (
      this.data.getDate() == negociacao.data.getDate() &&
      this.data.getMonth() == negociacao.data.getMonth() &&
      this.data.getFullYear() == negociacao.data.getFullYear()
    );
  }
}
```

Note, que utilizando dos recursos de implementações podemos empilhar interfaces obrigando a implementação de métodos comuns sem desperdiçar o recurso de extensão.

**Estendendo Interfaces**

Diferente de classes comuns que podem estender uma única classe, as interfaces podem estender quantas interfaces for necessário, possibilitando agrupar funcionalidades em uma única interface e implementa-la. Veja a seguir:

```tsx
import { Igualavel, Imprimivel } from "./index";

export interface MeuObjeto<T> extends Imprimivel, Igualavel<T> {}

export class Negociacao implements MeuObjeto<Negociacao> {
	...
}
```

Primeiro, criamos a interface `MeuObjeto` estendendo todas as interfaces necessárias e implementamos a interface na classe `Negociacao`.

**Union Types e Type Guards**

No _TypeScript_ você já deve ter notado que na maioria das vezes precisamos especificar os tipos dos atributos, parâmetros e até mesmo retornos de uma função. Mas temos situações onde o código recebe diferentes tipos como `string` ou `number` e é ai que entram os _Union Types._ Veja a seguir:

```tsx
const funcaoQualquer = (paramQualquer: string | number) => {};
```

Mas ao observarmos os tipos recebidos pelo `funcaoQualquer` podemos notar que diferentes funcionalidades se aplicam a cada tipo, exemplo, o tipo `string` tem a função `replace` e o tipo `number` não tem o que pode ocasionar uma não compilação do código e é então que entra o _Type Guards._ Veja a seguir:

```tsx
const funcaoQualquer = (paramQualquer: string | number) => {
  if (typeof paramQualquer === "string") {
    return paramQualquer.replace(/x/g, "y");
  } else {
    return paramQualquer.toFixed().replace(/x/g, "y");
  }
};
```

**Type Alias**

Esse recurso nada mais é do que agrupar _Union Types_ deixando o código mais enxuto: Veja o exemplo:

```tsx
type tipoQualquer = string | number;

const funcaoQualquer = (paramQualquer: tipoQualquer) => {};
```

**Async/Await**

Esta funcionalidade nos permite adicionar uma espera `await` em um método ou função que retorna uma `promise` sendo possível a travar o processo da função até obter uma resposta. Veja o exemplo:

```tsx
async importarDados(): Promise<void | Negociacao[]> {
  try {
    const negociacoesParaImportar = await this._service.obterNegociacoes((res) => {
      if (res.ok) {
        return res;
      } else {
        throw new Error(res.statusText);
      }
    });

    const negociacoesJaImportadas = this._negociacoes.paraArray;

    negociacoesParaImportar
      .filter(
        (negociacao: Negociacao) =>
          !negociacoesJaImportadas.some((jaImportada)
						=> negociacao.ehIgual(jaImportada))
      )
      .forEach((negociacao: Negociacao) => this._negociacoes.adiciona(negociacao));

    this._negociacoesView.update(this._negociacoes);
  } catch (err) {
    this._mensagemView.update(err.message);
  }
}
```

Observe o uso de `try catch` que torna possível obter o retorno de erro no método onde foi adicionado o `await`, o qual pode ser jogado para o usuário.
