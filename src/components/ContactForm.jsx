import { useEffect, useRef, useState } from 'react';

export default function ContactForm({ formId = import.meta.env.VITE_FORMSPREE_FORM_ID }) {
  const heading = useRef(null);
  const [status, setStatus] = useState('idle');
  const configured = /^[a-zA-Z0-9]+$/.test(formId ?? '');

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView?.({ behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  }, []);

  async function submit(event) {
    event.preventDefault();
    if (!configured || status === 'sending') return;
    const data = new FormData(event.currentTarget);
    if (!String(data.get('message')).trim()) {
      setStatus('invalid');
      return;
    }
    setStatus('sending');
    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('Submission rejected');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="contact" id="kontakt" aria-labelledby="contact-heading">
      <h2 id="contact-heading" tabIndex={-1} ref={heading}>Kontakt / Send inn tips</h2>
      {status === 'sent' ? (
        <p role="status">Takk for tipset! Meldingen er sendt. Hilsen Lena 🌼</p>
      ) : (
        <form onSubmit={submit} aria-busy={status === 'sending'}>
          <fieldset disabled={status === 'sending'}>
            <legend className="sr-only">Din henvendelse</legend>
            <label htmlFor="contact-type">Type henvendelse</label>
            <select id="contact-type" name="type" defaultValue="Tips om aktivitet">
              {['Tips om aktivitet', 'Meld fra om feil', 'Forslag til forbedring', 'Annet'].map(type => <option key={type}>{type}</option>)}
            </select>
            <label htmlFor="contact-message">Melding (påkrevd)</label>
            <textarea id="contact-message" name="message" required maxLength={5000} rows={6} aria-describedby="contact-privacy" />
            <label htmlFor="contact-email">E-postadresse (valgfritt, for å kunne svare)</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} />
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="contact-website">La dette feltet stå tomt</label>
              <input id="contact-website" name="_gotcha" tabIndex={-1} autoComplete="off" />
            </div>
            <p id="contact-privacy" className="contact-note">Meldingen og eventuell e-postadresse behandles av Formspree og sendes til Lena for å følge opp henvendelsen. Ikke send sensitive opplysninger eller personopplysninger om barn.</p>
            {!configured && <p role="status">Kontaktskjemaet er ikke åpnet for innsending ennå. Prøv igjen senere.</p>}
            <button className="primary-button" type="submit" disabled={!configured}>{status === 'sending' ? 'Sender …' : 'Send melding'}</button>
          </fieldset>
          {status === 'invalid' && <p role="alert">Skriv en melding før du sender.</p>}
          {status === 'error' && <p role="alert">Vi kunne ikke bekrefte innsendingen. Teksten er beholdt. Prøv igjen om litt.</p>}
        </form>
      )}
    </section>
  );
}
