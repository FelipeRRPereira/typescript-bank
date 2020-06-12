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
    "noEmitOnError": true // Trava para somente gerar os arquivos se não existir erros na compilação do projeto
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
    "noImplicitAny": true // AQUI
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
