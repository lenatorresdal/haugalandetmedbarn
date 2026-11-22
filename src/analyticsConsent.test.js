import { beforeEach, describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const consentScript = readFileSync(
  join(process.cwd(), 'public/analytics-consent.js'),
  'utf8',
);

const runConsentScript = () => window.eval(consentScript);

beforeEach(() => {
  document.head.querySelectorAll('script[data-google-analytics]').forEach(script => script.remove());
  document.body.innerHTML = '<footer><button data-analytics-settings hidden>Analyseinnstillinger</button></footer>';
  localStorage.clear();
  delete window.dataLayer;
  delete window.gtag;
});

describe('samtykke til besøksanalyse', () => {
  it('laster ikke Google-taggen før den besøkende har valgt', () => {
    runConsentScript();

    expect(document.querySelector('.analytics-consent')).not.toBeNull();
    expect(document.querySelector('script[data-google-analytics]')).toBeNull();
    expect(window.dataLayer).toBeUndefined();
    expect(document.querySelector('[data-analytics-settings]').hidden).toBe(false);
  });

  it('husker avvisning uten å laste Google-taggen', () => {
    runConsentScript();
    document.querySelector('[data-consent-choice="denied"]').click();

    expect(localStorage.getItem('hmb-analytics-consent')).toBe('denied');
    expect(document.querySelector('.analytics-consent')).toBeNull();
    expect(document.querySelector('script[data-google-analytics]')).toBeNull();
  });

  it('laster den oppgitte Google-taggen etter aktivt samtykke', () => {
    runConsentScript();
    document.querySelector('[data-consent-choice="granted"]').click();

    expect(localStorage.getItem('hmb-analytics-consent')).toBe('granted');
    expect(document.querySelector('script[data-google-analytics]').src)
      .toBe('https://www.googletagmanager.com/gtm.js?id=GTM-KTGJ74W5');
    expect(window.dataLayer).toContainEqual({
      'gtm.start': expect.any(Number),
      event: 'gtm.js',
    });
  });

  it('lar den besøkende åpne innstillingene igjen fra footeren', () => {
    localStorage.setItem('hmb-analytics-consent', 'denied');
    runConsentScript();
    expect(document.querySelector('.analytics-consent')).toBeNull();

    document.querySelector('[data-analytics-settings]').click();

    expect(document.querySelector('.analytics-consent-current').textContent)
      .toContain('Analyse er deaktivert');
  });

  it('kobler til innstillingsknappen når React har tegnet footeren', async () => {
    document.body.innerHTML = '<div id="root"></div>';
    localStorage.setItem('hmb-analytics-consent', 'denied');
    runConsentScript();

    document.querySelector('#root').innerHTML =
      '<button data-analytics-settings hidden>Analyseinnstillinger</button>';
    await new Promise(resolve => setTimeout(resolve, 0));

    const button = document.querySelector('[data-analytics-settings]');
    expect(button.hidden).toBe(false);
    button.click();
    expect(document.querySelector('.analytics-consent')).not.toBeNull();
  });
});
