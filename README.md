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

## Kontakt og tips (Formspree)

Siden er statisk React/Vite uten backend. Kontaktskjemaet sender en ekte POST
med FormData til Formspree, som videresender til mottakeradressen du konfigurerer
hos tjenesten. Det krever ingen nye npm-avhengigheter eller hemmelige API-nøkler.
Bekreftelse vises bare etter et vellykket svar med `ok: true` fra Formspree;
dette bekrefter mottak hos tjenesten, ikke levering i e-postens innboks.

1. Opprett et skjema på https://formspree.io og angi en egen mottakeradresse.
   Bekreft adressen og aktiver e-postvarsling i kontrollpanelet.
2. Kopier `.env.example` til `.env.local`. Sett `VITE_FORMSPREE_FORM_ID` til ID-en
   fra skjemaets URL, for eksempel bare ID-delen i `https://formspree.io/f/ID`.
3. Start Vite på nytt. I produksjon må samme variabel settes i byggmiljøet før
   `npm run build`; publiser deretter den nye `dist`-mappen.
4. Aktiver tjenestens spamfilter og begrens innsending til eget domene dersom
   tilgjengelig på valgt abonnement. Skjemaet inkluderer Formsprees `_gotcha`
   honeypot. Nettleservalidering og honeypot erstatter ikke tjenestens spamvern.
5. Send en ekte test fra publisert domene, kontroller mottakerens innboks og
   søppelpost, og test også innsending via kontaktlenken i footeren.

Uten gyldig skjema-ID er Send-knappen deaktivert. Skjema-ID er offentlig;
alle `VITE_`-variabler bygges inn i nettleserkoden. Legg aldri hemmelige nøkler der.
Miljøfiler med lokal konfigurasjon er ignorert av Git.

Meldinger sendes til Formspree og mottakerens e-post. Før lansering: vurder
leverandørens personvernvilkår/databehandleravtale og eventuelle overføringer,
avklar sletting og lagringstid både hos tjenesten og i innboksen, og opplys om
dette i nettstedets personverninformasjon. Skjemaet ber bare om melding og valgfri
e-post; det lagrer ingen utkast lokalt og ber brukeren unngå sensitive opplysninger.

Dokumentasjon: https://formspree.io/guides/framer/ og
https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering/
