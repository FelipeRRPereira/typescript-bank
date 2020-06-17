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
  constructor(
    private _data: Date,
    private _quantidade: number,
    private _valor: number
  ) {}
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
