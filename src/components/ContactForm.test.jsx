import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm.jsx';
import App from '../App.jsx';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it('deaktiverer sending uten konfigurasjon', () => {
  render(<ContactForm formId="" />);
  expect(screen.getByRole('button', { name: 'Send melding' }).disabled).toBe(true);
});

it('åpner kontaktskjema fra tipsknappen', async () => {
  render(<App />);
  await userEvent.click(screen.getByRole('button', { name: 'Send meg et tips' }));
  expect(screen.getByLabelText('Type henvendelse').value).toBe('Tips om aktivitet');
  expect(document.activeElement.id).toBe('contact-heading');
});

it('åpner kontaktskjema direkte fra personvernsiden og viser personvernlenke', () => {
  window.history.replaceState(null, '', '/?kontakt=1#kontakt');
  try {
    render(<App />);
    expect(screen.getByLabelText('Melding (påkrevd)')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Les personverninformasjonen' }).getAttribute('href')).toBe('/personvern.html');
    expect(document.activeElement.id).toBe('contact-heading');
  } finally {
    window.history.replaceState(null, '', '/');
  }
});

it('beholder utkast og flytter fokus tilbake når tipsknappen brukes igjen', async () => {
  const user = userEvent.setup();
  render(<App />);
  const tipButton = screen.getByRole('button', { name: 'Send meg et tips' });
  await user.click(tipButton);
  await user.type(screen.getByLabelText('Melding (påkrevd)'), 'Tips om en tur');
  await user.click(tipButton);
  expect(screen.getByLabelText('Melding (påkrevd)').value).toBe('Tips om en tur');
  expect(document.activeElement.id).toBe('contact-heading');
});

it('validerer, beholder tekst ved feil og bekrefter bare godtatt innsending', async () => {
  const user = userEvent.setup();
  const fetchMock = vi.fn()
    .mockResolvedValueOnce({ ok: false, json: async () => ({ error: 'rejected' }) })
    .mockResolvedValueOnce({ ok: true, json: async () => ({ ok: true }) });
  vi.stubGlobal('fetch', fetchMock);
  render(<ContactForm formId="testid" />);
  await user.click(screen.getByRole('button', { name: 'Send melding' }));
  expect(fetchMock).not.toHaveBeenCalled();
  await user.type(screen.getByLabelText('Melding (påkrevd)'), 'Ny tid på onsdag');
  await user.click(screen.getByRole('button', { name: 'Send melding' }));
  await screen.findByRole('alert');
  expect(screen.getByLabelText('Melding (påkrevd)').value).toBe('Ny tid på onsdag');
  expect(fetchMock.mock.calls[0][1].body.get('type')).toBe('Tips om aktivitet');
  expect(fetchMock.mock.calls[0][0]).toBe('https://formspree.io/f/testid');
  await user.click(screen.getByRole('button', { name: 'Send melding' }));
  await waitFor(() => expect(screen.getByRole('status').textContent).toContain('Meldingen er sendt'));
});

it('unngår myk rulling når redusert bevegelse er valgt', () => {
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })));
  const scrollIntoView = vi.fn();
  const original = HTMLElement.prototype.scrollIntoView;
  HTMLElement.prototype.scrollIntoView = scrollIntoView;
  try {
    render(<ContactForm formId="testid" />);
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'instant', block: 'start' });
    expect(document.activeElement.id).toBe('contact-heading');
  } finally {
    if (original) HTMLElement.prototype.scrollIntoView = original;
    else delete HTMLElement.prototype.scrollIntoView;
  }
});
