# haugalandetmedbarn

Aktiviteter for barn og familier på Haugalandet, laget med React og Vite.

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

## Kodestruktur

- `src/activities.js`: aktivitetsdata; `scene` velger illustrasjon.
- `src/components/`: aktivitetskort, filtrets resultatgrid, tipsfelt og kontaktskjema.
- `src/components/icons/`: små SVG-ikoner for knapper og lenker.
- `src/components/illustrations/`: SVG-scener for aktivitetskort og toppillustrasjonen.
- `src/use*.js`: nettlesertilstand for filtre og favoritter.
- `scripts/prerender.mjs`: ferdig HTML og SEO-filer ved produksjonsbygg.
- `public/`: logo, statiske nettleserskript og den selvstendige personvernsiden.

`dist/` er generert produksjonskode og skal ikke redigeres direkte.
Sites-konfigurasjonen i `.openai/hosting.json` publiserer denne mappen.

Tre generiske illustrasjoner i `src/components/illustrations/GenericScenes.jsx` er klare til
senere bruk. Sett `scene` på en aktivitet til `genericNature` (familietur),
`genericCreative` (kreativt verksted) eller `genericBallPlay` (lek med ball).
Ingen aktiviteter bruker dem foreløpig. Bakgrunn velges som ellers med `bg`.

## Søkemotorer og ferdig HTML

`npm run build` bygger React og forhåndsgenererer deretter forsidens innhold
direkte i `dist/index.html`. Aktivitetsoversikten kan dermed leses uten
JavaScript. Når JavaScript starter, tar React over med fungerende filtre og
lokale favoritter. Filtervalg og favoritter endrer ikke den genererte HTML-filen.

Den offentlige hovedadressen er satt i `.env.production` med `SITE_URL`.
Denne filen inneholder bare offentlig konfigurasjon; legg aldri hemmeligheter der.
Byggingen bruker adressen til canonical-tag, `dist/sitemap.xml` og sitemap-lenken
i `dist/robots.txt`. Alle filtervarianter peker til forsiden som canonical-adresse. Bygget lager også
egen statisk side for hver aktivitet, en kursoversikt og sider for hvert sted.
Disse sidene får egne canonical-adresser og legges i nettstedskartet. De henter
innhold fra `src/activities.js`; oppdater aktivitetene der. Når en ny kommune
legges til, må URL-navnet også legges i `scripts/seo-pages.mjs`.
Ved domenebytte: oppdater `SITE_URL` og bygg på nytt.
Uten `SITE_URL` varsler byggingen og utelater canonical og sitemap.

Etter publisering kan sitemap sendes inn i Google Search Console. Oppsettet her
verifiserer ikke domeneeierskap eller om Google har indeksert nettstedet.

## Google Analytics og samtykke

Nettstedet bruker Google-taggen `GTM-KTGJ74W5`. Implementasjonen ligger i
`public/analytics-consent.js` og er inkludert på forsiden, personvernsiden og
alle forhåndsgenererte innholdssider. Ikke lim inn Google-koden direkte i
HTML-filene i tillegg; da kan taggen bli lastet flere ganger eller før samtykke.

Google-taggen lastes først når den besøkende aktivt velger «Godta analyse».
«Avvis analyse» hindrer lasting. Valget lagres lokalt med nøkkelen
`hmb-analytics-consent`, og kan endres via «Analyseinnstillinger» i footeren.
Ved tilbaketrekking sendes en oppdatering om avslått samtykke, og nettstedet
forsøker å fjerne Google Analytics-informasjonskapsler.

For å bytte Google-taggen må `GOOGLE_TAG_ID` i
`public/analytics-consent.js` oppdateres. Tag-ID-en er offentlig og skal ikke
legges i en hemmelig miljøvariabel. Oppdater samtidig personverninformasjonen
dersom leverandør, formål eller databehandling endres.

Etter publisering:

1. Åpne nettstedet i et privat nettleservindu.
2. Kontroller at ingen Google Analytics-forespørsel sendes før et valg er tatt.
3. Velg «Godta analyse» og kontroller besøket i Sanntid i Google
   Analytics.
4. Åpne «Analyseinnstillinger», avvis analyse og kontroller at valget blir husket
   etter at siden lastes på nytt.
5. Kontroller og dokumenter lagringstiden i Analytics-kontoen slik at teksten på
   personvernsiden er korrekt.

Samtykkeflyten er testet i `src/analyticsConsent.test.js`. Kjør `npm test`
etter endringer i skriptet, knappetekstene eller HTML-malene.

## Kontakt og tips (Formspree)

Personverninformasjonen ligger i `public/personvern/index.html`, med lenke nederst
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

## Stjernevurderinger

Produksjonsbygget leser `VITE_SUPABASE_URL` og den offentlige
`VITE_SUPABASE_PUBLISHABLE_KEY` fra `.env.production`. For lokal utvikling,
kopier Supabase-variablene derfra til `.env.local`. Vite bygger verdiene inn
i nettleserkoden, så bruk bare en publishable key.

Supabase-prosjektet må ha anonym innlogging aktivert. De eksisterende
tilgangsreglene må tillate at både besøkende og autentiserte brukere leser
`activity_rating_stats`, og at autentiserte brukere kan lese, opprette og
oppdatere og slette sine egne rader i `activity_ratings`. Statistikken må også
oppdateres når en stemme slettes. Appen bruker eksisterende
aktivitets-ID-er og leser statistikken som databasen beregner.
