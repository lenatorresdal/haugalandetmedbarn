import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { writeSeoPages } from './scripts/seo-pages.mjs';

function servePrivacyPage(directory) {
  return async (req, res, next) => {
    const { pathname } = new URL(req.url, 'http://localhost');
    if (pathname !== '/personvern' && pathname !== '/personvern/') return next();
    try {
      const html = await readFile(join(directory, 'personvern', 'index.html'));
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(html);
    } catch (error) {
      next(error);
    }
  };
}

function seoPagesInDevelopment() {
  return {
    name: 'seo-pages-in-development',
    apply: (config, env) => env.command === 'serve' && !process.env.VITEST && !config.server?.middlewareMode,
    async configureServer(server) {
      server.middlewares.use(servePrivacyPage(server.config.publicDir));
      const directory = await mkdtemp(join(tmpdir(), 'haugalandet-pages-'));
      const { default: ActivityArt } = await server.ssrLoadModule('/src/components/illustrations/ActivityArt.jsx');
      const renderActivityArt = activity => renderToStaticMarkup(createElement(ActivityArt, { scene: activity.scene, background: activity.bg }));
      const paths = new Set(await writeSeoPages(undefined, directory, renderActivityArt));
      server.middlewares.use(async (req, res, next) => {
        const pathname = new URL(req.url, 'http://localhost').pathname;
        const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
        if (!paths.has(path)) return next();
        try {
          const html = await readFile(join(directory, path, 'index.html'), 'utf8');
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(html);
        } catch (error) { next(error); }
      });
      server.watcher.add(['src/activities.js', 'src/participation.js', 'src/components/illustrations', 'scripts/seo-pages.mjs']);
      server.watcher.on('change', file => {
        if (/\/(src\/(?:activities|participation)\.js|src\/components\/illustrations\/[^/]+\.jsx|scripts\/seo-pages\.mjs)$/.test(file)) server.restart();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(servePrivacyPage(join(server.config.root, server.config.build.outDir)));
    },
  };
}

export default defineConfig({ plugins: [react(), seoPagesInDevelopment()] });
