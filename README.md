# [SmartPOS Cliente Store](https://smartpos.app/{storePath}/)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## ðŸ“„ Scripts

```sh
// install dependencies
$ yarn

// start development server
$ yarn start
```

## ðŸ’… Design
TODO

## ðŸ“¦ Absolute import

Avoid relative import from `src/` directories to keep imports clean.

```javascript
âŒ import MyComponent from '../../components/MyComponent';

âœ”ï¸ import MyComponent from 'components/MyComponent';
```

You might want to configure your editor to resolve these imports.

VScode can resolve in the `jsconfig.json` file at the root of the repository:

```json
{
  "compilerOptions": { "baseUrl": "src" }
}
```

WebStorm:

1. Mark `src` directory as **Resource Root** (Right click on `src/`)
2. Go to **Settings > Editor > Code Style > Javascript**.
3. Switch to **Imports** tab and select **Use paths relative to the project, resource or sources root**.

## ðŸš€ Deploy

TODO

CI/CD should take care of the rest.

Updates that skip develop branch should follow the same steps above and merge into develop to synchronize.