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
  <li><a href="#-conteudos">Conteúdos</a></li>
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
