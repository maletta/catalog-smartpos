
<p align="center">
  <a href="https://app.smartpos.net.br/">
    <img alt="SmartPOS" src="https://avatars0.githubusercontent.com/u/45489022?s=200&v=4" width="60" />
  </a>
</p>

<h1 align="center">
  SmartPOS - Catálogo 🛒
</h1>

<p align="center">
  <a href="https://github.com/gatsbyjs/gatsby/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/Made_with-React-BLUE.svg" alt="Made with React" />
  </a>
  <a href="https://github.com/airbnb/javascript">
    <img src="https://badgen.net/badge/code%20style/airbnb/ff5a5f" alt="Code Style" />
  </a>
</p>

<h3 align="center">
  <a href="https://netpos-team.slack.com/">Slack</a>
  <span> · </span>
  <a href="https://netposbr.atlassian.net/browse/SF">Jira</a>
  <span> · </span>
  <a href="https://bitbucket.org/netpos/smartpos-client-store-front">Bitbucket</a>
</h3>

## Ambientes

- Produção: [https://exemplo.smartpos.app]
- Development: [https://smartposbr.qa.smartpos.net.br]

Usamos o *staging* para compartilhar com outras pessoas na empresa para testar.
Ele usa o banco de dados de produção.

Ambiente *development* é mais para os deselvovedores acompanharem o que está na branch `develop`.
Ele usa o banco de dados de desenvolvimento.

# [SmartPOS Catálogo](https://{store}.qa.smartpos.app/)
## 📄 Scripts

Veja no `package.json` todos os comandos. Necessário [yarn](https://yarnpkg.com/en/) instalado.

Para rodar o projeto use os comandos abaixo. Antes configure as variáveis de ambiente, crie um `.env` na raiz do projeto, pegue as variáveis no Bitbucket ou de algum colega.

**Importante**: verifique se você tem a variável `NODE_PATH=src/`.

```sh
// instala as dependências
$ yarn

// inicia servidor de desenvolvimento
$ yarn start

// inicia servidor de produção para testar uma build
$ yarn build
$ yarn serve
```


## 📦 Bibliotecas mais usadas

- [create-react-app](https://github.com/facebook/create-react-app)
- [styled-component](https://github.com/styled-components/styled-components)
- [eslint](https://eslint.org/)
- [fontawesome](https://fontawesome.com/)
- [typescript](https://www.typescriptlang.org/)

### Importes absolutos

Evitar importes relativos que vêm do diretório `src/`.

```javascript
❌ import MyComponent from '../../components/MyComponent';

✔️ import MyComponent from 'components/MyComponent';
```
