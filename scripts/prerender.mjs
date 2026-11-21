import { readFile, writeFile } from 'node:fs/promises';
import { createServer, loadEnv } from 'vite';
import { createElement } from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { writeSeoPages } from './seo-pages.mjs';

// Use Vite's JSX and environment handling without adding a server to hosting.
const buildEnv = { ...loadEnv('production', process.cwd(), ''), ...process.env };
let siteUrl;
if (buildEnv.SITE_URL) {
  const url = new URL(buildEnv.SITE_URL);
  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_URL must be a public HTTPS origin, e.g. https://example.no');
  }
  siteUrl = url.origin + '/';
}
const viteServer = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom', mode: 'production' });
try {
  const { default: App } = await viteServer.ssrLoadModule('/src/App.jsx');
  const markup = renderToString(createElement(App));
  let html = await readFile('dist/index.html', 'utf8');
  html = html.replace('<div id="root"></div>', () => `<div id="root">${markup}</div>`);
  const { default: ActivityArt } = await viteServer.ssrLoadModule('/src/components/illustrations/ActivityArt.jsx');
  const renderActivityArt = activity => renderToStaticMarkup(createElement(ActivityArt, { scene: activity.scene, background: activity.bg }));
  const seoPaths = await writeSeoPages(siteUrl, 'dist', renderActivityArt);
  if (siteUrl) {
    const escapedSiteUrl = siteUrl.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
    const websiteData = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Haugalandet med barn',
      url: siteUrl,
      inLanguage: 'nb-NO',
      description: 'Aktiviteter og opplevelser for barn og familier på Haugalandet.',
    }).replaceAll('<', '\\u003c');
    html = html.replace('</head>', `  <link rel="canonical" href="${escapedSiteUrl}" />\n    <meta property="og:url" content="${escapedSiteUrl}" />\n    <meta property="og:image" content="${escapedSiteUrl}logo.png" />\n    <meta property="og:image:alt" content="Haugalandet med barn" />\n    <script type="application/ld+json">${websiteData}</script>\n  </head>`);
    const privacyHtml = await readFile('dist/personvern/index.html', 'utf8');
    await writeFile('dist/personvern/index.html', privacyHtml.replace('</head>', `<link rel="canonical" href="${escapedSiteUrl}personvern" />\n  </head>`));
    await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapedSiteUrl}</loc></url><url><loc>${escapedSiteUrl}personvern</loc></url>${seoPaths.map(path => `<url><loc>${escapedSiteUrl}${path.slice(1)}</loc></url>`).join('')}</urlset>\n`);
  } else {
    console.warn('SITE_URL is missing: canonical and sitemap are omitted. Set it before publishing.');
  }
  await writeFile('dist/index.html', html);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}sitemap.xml\n` : ''}`);
  console.log('Prerendered activity content and generated SEO files.');
} finally {
  await viteServer.close();
}
