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

Tre generiske illustrasjoner i `src/components/GenericScenes.jsx` er klare til
senere bruk. Sett `scene` på en aktivitet til `genericNature` (familietur),
`genericCreative` (kreativt verksted) eller `genericBallPlay` (lek med ball).
Ingen aktiviteter bruker dem foreløpig. Bakgrunn velges som ellers med `bg`.
Sites-konfigurasjonen i `.openai/hosting.json` publiserer denne mappen.

## Søkemotorer og ferdig HTML

`npm run build` bygger React og forhåndsgenererer deretter forsidens innhold
direkte i `dist/index.html`. Aktivitetsoversikten kan dermed leses uten
JavaScript. Når JavaScript starter, tar React over med fungerende filtre og
lokale favoritter. Filtervalg og favoritter endrer ikke den genererte HTML-filen.

Den offentlige hovedadressen er satt i `.env.production` med `SITE_URL`.
Denne filen inneholder bare offentlig konfigurasjon; legg aldri hemmeligheter der.
Byggingen bruker adressen til canonical-tag, `dist/sitemap.xml` og sitemap-lenken
i `dist/robots.txt`. Alle filtervarianter peker til samme canonical-adresse;
de er ikke egne landingssider. Ved domenebytte: oppdater `SITE_URL` og bygg på nytt.
Uten `SITE_URL` varsler byggingen og utelater canonical og sitemap.

Etter publisering kan sitemap sendes inn i Google Search Console. Oppsettet her
verifiserer ikke domeneeierskap eller om Google har indeksert nettstedet.

## Kontakt og tips (Formspree)

Personverninformasjonen ligger i `public/personvern.html`, med lenke nederst
på forsiden og ved innsending. Den er tilgjengelig uten JavaScript. Før publisering
må eieren bekrefte behandlingsgrunnlag og opplysninger om leverandører og eventuelle overføringer basert på
de faktiske avtalene. Kommentarer i HTML-filen markerer det som må avklares.
Lenken `/?kontakt=1#kontakt` åpner kontaktskjemaet direkte.

Ansvarlig er Lena Tørresdal, med kontaktadresse `haugalandetmedbarn@gmail.com`.
Kontakthenvendelser skal slettes i både Formspree og Gmail innen tre måneder
etter ferdig behandling. Dette er en rutine eieren må følge opp; nettsidekoden
utfører ikke sletting hos disse tjenestene.

Siden er statisk React/Vite uten backend. Kontaktskjemaet sender en ekte POST
med FormData til Formspree, som videresender til mottakeradressen du konfigurerer
hos tjenesten. Det krever ingen nye npm-avhengigheter eller hemmelige API-nøkler.
Bekreftelse vises bare etter et vellykket svar med `ok: true` fra Formspree;
dette bekrefter mottak hos tjenesten, ikke levering i e-postens innboks.

Skjemaet bruker `https://formspree.io/f/xaeegwdg` som standard, både lokalt og
i produksjonsbygget. React-komponenten håndterer innsending med `fetch`, så
`@formspree/react` er ikke nødvendig.

1. Sett mottakeradressen til `haugalandetmedbarn@gmail.com`, bekreft adressen og
   aktiver e-postvarsling i Formspree-kontrollpanelet. Mottakeradressen kan ikke
   endres i nettsidekoden; skjemaet bruker fortsatt samme Formspree-ID.
2. For å bytte skjema kan du kopiere `.env.example` til `.env.local` og sette
   `VITE_FORMSPREE_FORM_ID` til den nye ID-en. Denne overstyrer standardverdien.
3. Start Vite på nytt etter miljøendringer. For produksjon: kjør `npm run build`
   og publiser den nye `dist`-mappen. Eventuell overstyring må settes i byggmiljøet.
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
følg sletterutinen både hos tjenesten og i innboksen, og hold nettstedets
personverninformasjon oppdatert. Skjemaet ber bare om melding og valgfri
e-post; det lagrer ingen utkast lokalt og ber brukeren unngå sensitive opplysninger.

Dokumentasjon: https://formspree.io/guides/framer/ og
https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering/
