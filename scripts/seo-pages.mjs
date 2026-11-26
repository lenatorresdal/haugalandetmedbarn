import { mkdir, writeFile } from 'node:fs/promises';
import { activities } from '../src/activities.js';
import { fitsParentalLeave } from '../src/parentalLeave.js';
import { matchesView, participationTypes } from '../src/participation.js';

const escape = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const slug = value => ({ Haugesund: 'haugesund', Karmøy: 'karmoy', Tysvær: 'tysvaer', Vindafjord: 'vindafjord', Sveio: 'sveio' })[value];
const pathFor = activity => `/aktiviteter/${activity.id}/`;
const placePhrase = place => `${place === 'Karmøy' ? 'på' : 'i'} ${place}`;
const summary = text => text.length <= 155 ? text : `${text.slice(0, 155).replace(/\s+\S*$/, '')}…`;
const activityLink = activity => `<li><a href="${escape(pathFor(activity))}">${escape(activity.title)}</a> · ${escape(activity.municipality)}</li>`;
const parentalLeavePath = place => `/steder/${slug(place)}/permisjon/`;
const parentalLeaveIntros = new Map([
  ['Haugesund', 'I foreldrepermisjon i Haugesund? Bli med på babysang, babysvømming eller trilletur, eller møt andre foreldre på biblioteket. Her finner du også trening der babyen kan bli med.'],
  ['Karmøy', 'I foreldrepermisjon på Karmøy? Finn babysvømming i Karmøyhallen, babysang blant annet i Norheim, på Avaldsnes og i Kopervik, eller ta en kafépause på Oasen.'],
  ['Sveio', 'I foreldrepermisjon i Sveio? På babysong i Sveio soknehus kan du møte andre foreldre og babyer.'],
  ['Tysvær', 'I foreldrepermisjon i Tysvær? Her finner du barseltrening på Frakkagjerd, babysang i Aksdal kyrkje, musikklek og babymassasje.'],
  ['Vindafjord', 'Se aktivitetsoversikten for tilbud for barn og familier i Vindafjord.'],
]);

export async function writeSeoPages(siteUrl, outputDirectory = "dist", renderActivityArt = null, ratingScript = null, contentStylesPath = "/innhold.css") {
  const paths = [];
  async function page(path, title, description, body, breadcrumbs = []) {
    const dir = `${outputDirectory}${path}`;
    await mkdir(dir, { recursive: true });
    const canonical = siteUrl ? new URL(path, siteUrl).href : null;
    const fullTitle = `${title} | Haugalandet med barn`;
    const trail = [{ label: 'Alle aktiviteter', href: '/?tilbud=all#aktiviteter' }, ...breadcrumbs, { label: title }];
    const breadcrumbHtml = `<nav class="breadcrumbs" aria-label="Du er her"><ol>${trail.map(item => `<li>${item.href ? `<a href="${escape(item.href)}">${escape(item.label)}</a>` : `<span aria-current="page">${escape(item.label)}</span>`}</li>`).join('')}</ol></nav>`;
    const navItem = (href, label) => `<a href="${href}"${path === href ? ' aria-current="page"' : ''}>${label}</a>`;
    const socialUrl = canonical
      ? `<link rel="canonical" href="${escape(canonical)}">
    <meta property="og:url" content="${escape(canonical)}">
    <meta property="og:image" content="${escape(new URL('/logo.png', siteUrl).href)}">`
      : '';
    const html = `<!doctype html>
<html lang="nb">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escape(fullTitle)}</title>
    <meta name="description" content="${escape(description)}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="nb_NO">
    <meta property="og:site_name" content="Haugalandet med barn">
    <meta property="og:title" content="${escape(fullTitle)}">
    <meta property="og:description" content="${escape(description)}">
    ${socialUrl}
    <meta name="twitter:card" content="summary">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-kysttur.png?v=3">
    <link rel="icon" type="image/svg+xml" sizes="any" href="/favicon-kysttur.svg?v=3">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&amp;family=Manrope:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${escape(contentStylesPath)}">
    <script src="/analytics-consent.js" defer></script>
  </head>
  <body>
    <a class="skip-link" href="#innhold">Hopp til innhold</a>
    <div class="site-shell">
      <header class="site-header">
        <a class="site-name" href="/" aria-label="Haugalandet med barn – til forsiden"><img src="/logo.svg" alt="" width="503" height="100"></a>
        <nav class="page-nav" aria-label="Hovednavigasjon">
          ${navItem('/?tilbud=all#aktiviteter', 'Alle aktiviteter')}
          ${navItem('/kurs/', 'Kurs og påmelding')}
          ${navItem('/steder/', 'Steder')}
        </nav>
      </header>
      <main id="innhold" tabindex="-1">${breadcrumbHtml}${body}</main>
      <footer class="site-footer">
        <nav aria-label="Lenker nederst på siden"><a href="/personvern">Personvern</a><button type="button" class="footer-link-button" data-analytics-settings hidden>Analyseinnstillinger</button></nav>
      </footer>
    </div>
  </body>
</html>\n`;
    await writeFile(`${dir}index.html`, html);
    paths.push(path);
  }
  for (const activity of activities) {
    if (!/^[a-z0-9-]+$/.test(activity.id)) throw new Error(`Invalid activity id: ${activity.id}`);
    const title = activity.title;
    const description = summary(`${activity.title} · ${activity.municipality}. ${activity.description}`);
    const locations = activity.locations ?? [{ place: activity.place, time: activity.time }];
    const { booking, registration, ticket } = participationTypes[activity.participation];
    const row = (label, value) => value ? `<dt>${escape(label)}</dt><dd>${escape(value)}</dd>` : '';
    const details = locations.map(location => row('Sted', location.place) + row('Tid', location.time)).join('')
      + row('Alder', activity.age) + row('Pris', activity.price)
      + row('Bestilling', booking) + row('Påmelding', registration) + row('Billett', ticket)
      + row('Tur', activity.distance) + row('Barnevogn', activity.stroller)
      + (activity.changingTable !== undefined ? row('Stellebord', activity.changingTable === null ? 'Ikke bekreftet' : activity.changingTable ? 'Ja' : 'Nei') : '');
    const related = activities.filter(a => a.id !== activity.id && a.municipality === activity.municipality && a.category === activity.category).slice(0, 3);
    const illustration = renderActivityArt ? renderActivityArt(activity) : '';
    const share = `<div class="share-activity" data-share-path="${escape(pathFor(activity))}"><button type="button" class="share-activity-button" aria-expanded="false" aria-controls="activity-share-panel" hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/></svg>Del aktivitet</button><div class="share-activity-panel" id="activity-share-panel" hidden>
                <label for="activity-share-url">Lenke til aktiviteten</label>
                <input id="activity-share-url" type="text" readonly>
                <div class="share-activity-copy">
                  <button type="button" class="share-activity-button">Kopier lenke</button>
                  <span class="share-activity-check" aria-hidden="true" hidden>✓</span>
                </div>
                <div class="share-activity-notice" role="status"></div>
              </div></div><script type="module" src="/del-aktivitet.js"></script>`;
    const body = `<a class="activity-back" href="/?tilbud=all#aktiviteter"><img src="/tilbakepil.svg" width="18" height="18" alt="">Tilbake til aktivitetsoversikten</a>
      <article class="activity-page">
        <header class="activity-hero" style="--activity-background: ${escape(activity.bg)}">
          <div class="activity-hero-heading">
            <p class="page-kicker">${escape(activity.category)} · ${escape(activity.municipality)}</p>
            <h1>${escape(title)}</h1>
          </div>
          <div class="activity-hero-copy">
            <p class="intro">${escape(activity.description)}</p>
            <div class="activity-actions">
              <button type="button" class="share-activity-button activity-favorite" data-favorite-id="${escape(activity.id)}" aria-pressed="false" hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M12 21 3.5 12.5a5 5 0 0 1 7-7L12 7l1.5-1.5a5 5 0 0 1 7 7Z"/></svg>
                Favoritt
              </button>
              ${share}
            </div>
          </div>
          ${illustration ? `<div class="activity-illustration">${illustration}</div>` : ''}
        </header>
        <section class="detail" aria-label="Praktisk informasjon">
          <h2>Praktisk informasjon</h2>
          <dl>${details}</dl>
          <p>Sjekk oppdaterte tider, priser og eventuell påmelding hos arrangøren før dere drar.</p>
          ${activity.email ? `<p>Spørsmål og påmelding: <a href="mailto:${escape(activity.email)}">${escape(activity.email)}</a></p>` : ''}
          ${activity.additionalLinks?.length ? `<ul>${activity.additionalLinks.map(link => `<li><a href="${escape(link.url)}">${escape(link.label)}</a></li>`).join('')}</ul>` : ''}
          <a class="action" href="${escape(activity.url)}">${escape(activity.link)}</a>
        </section>
        ${ratingScript ? `<section class="detail activity-rating-section" aria-labelledby="activity-rating-title">
          <h2 id="activity-rating-title">Vurderinger</h2>
          <div data-activity-rating="${escape(activity.id)}" data-activity-title="${escape(title)}"></div>
          <script type="module" src="${escape(ratingScript)}"></script>
        </section>` : ''}
        ${related.length ? `<section class="related-activities"><h2>Flere tips ${escape(placePhrase(activity.municipality))}</h2><ul class="columns">${related.map(activityLink).join('')}</ul></section>` : ''}
      </article>`;
    await page(pathFor(activity), title, description, body, [
      { label: 'Steder', href: '/steder/' },
      { label: activity.municipality, href: `/steder/${slug(activity.municipality)}/` },
    ]);
  }
  const courses = activities.filter(activity => matchesView(activity, 'courses'));
  await page('/kurs/', 'Kurs og faste aktiviteter for barn på Haugalandet', 'Finn babysang, babysvømming og andre kurs og faste aktiviteter for barn og familier på Haugalandet.', `<h1>Kurs og faste aktiviteter for barn på Haugalandet</h1><p class="intro">Her finner du kurs og faste tilbud for barn og familier. Sjekk aktuelle datoer, ledige plasser og påmelding hos arrangøren.</p><p><a class="filter-link" href="/?tilbud=courses#aktiviteter">Filtrer kurs etter sted og alder</a></p><ul class="columns">${courses.map(activityLink).join('')}</ul>`);
  const places = [...new Set(activities.map(a => a.municipality))].sort((a,b) => a.localeCompare(b, 'nb'));
  await page('/steder/', 'Aktiviteter for barn etter sted', 'Finn aktiviteter for barn og familier i Haugesund, Karmøy, Tysvær, Vindafjord og Sveio.', `<h1>Finn aktiviteter etter sted</h1><p class="intro">Utforsk turer, besøk og aktiviteter for barn og familier på Haugalandet.</p><ul class="columns">${places.map(place => `<li><a href="/steder/${slug(place)}/">${escape(place)}</a> · ${activities.filter(a => a.municipality === place).length} aktiviteter</li>`).join('')}</ul>`);
  for (const place of places) {
    if (!slug(place)) throw new Error(`Missing location slug: ${place}`);
    const items = activities.filter(a => a.municipality === place);
    const placePath = `/steder/${slug(place)}/`;
    const leaveIntro = parentalLeaveIntros.get(place);
    const leaveLink = leaveIntro ? `<p><a class="filter-link" href="${parentalLeavePath(place)}">Aktiviteter i permisjon ${escape(placePhrase(place))}</a></p>` : '';
    const placeBreadcrumbs = [{ label: 'Steder', href: '/steder/' }];
    await page(placePath, `Aktiviteter for barn ${placePhrase(place)}`, `Finn aktiviteter for barn og familier ${placePhrase(place)}: turer, opplevelser og tilbud i nærområdet.`, `<h1>Aktiviteter for barn ${escape(placePhrase(place))}</h1><p class="intro">Her finner du forslag til aktiviteter og opplevelser for barn og familier ${escape(placePhrase(place))}. Velg en aktivitet for praktisk informasjon og lenke til arrangøren.</p><p><a class="filter-link" href="/?tilbud=all&amp;sted=${encodeURIComponent(place)}#aktiviteter">Filtrer aktiviteter ${escape(placePhrase(place))} etter alder og type</a></p>${leaveLink}<ul class="columns">${items.map(activityLink).join('')}</ul>`, placeBreadcrumbs);

    if (leaveIntro) {
      const title = `I permisjon ${placePhrase(place)} – aktiviteter med baby`;
      const leaveItems = items.filter(fitsParentalLeave);
      await page(parentalLeavePath(place), title, summary(leaveIntro), `
        <h1>${escape(title)}</h1>
        <p class="intro">${escape(leaveIntro)}</p>
        <section>
          <h2>Tilbud for deg og babyen</h2>
          ${leaveItems.length ? `<ul class="columns">${leaveItems.map(activityLink).join('')}</ul>` : `<p>Ingen permisjonsaktiviteter er listet her ennå. <a href="${placePath}">Se alle aktiviteter ${escape(placePhrase(place))}</a>.</p>`}
        </section>
        <p><a class="filter-link" href="/?permisjon=1&amp;sted=${encodeURIComponent(place)}#aktiviteter">Åpne permisjonsfilteret for ${escape(place)}</a></p>
      `, [...placeBreadcrumbs, { label: place, href: placePath }]);
    }
  }
  return paths;
}
