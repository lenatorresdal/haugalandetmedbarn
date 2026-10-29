# haugalandetmedbarn

Aktiviteter for foreldre i permisjon i Haugesund, laget med React og Vite.

## Lokal utvikling

Bruk Node.js 22 (`nvm use` dersom du har nvm).

```sh
npm install
npm run dev
```

## Kontroll og bygg

```sh
npm test
npm run build
npm run preview
```

Rediger `src/App.jsx` og komponentene i `src/components/`. Aktivitetene ligger i
`src/activities.js`, og stilene i `src/styles.css`. Favoritter lagres lokalt i
nettleseren med samme nøkkel som i første versjon.

`dist/` er generert produksjonskode og skal ikke redigeres direkte.
Sites-konfigurasjonen i `.openai/hosting.json` publiserer denne mappen.
