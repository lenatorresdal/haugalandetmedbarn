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

it('åpner kontaktskjema fra footeren', async () => {
  render(<App />);
  await userEvent.click(screen.getByRole('link', { name: 'Kontakt / Send inn tips' }));
  expect(screen.getByLabelText('Type henvendelse').value).toBe('Tips om aktivitet');
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
  await user.click(screen.getByRole('button', { name: 'Send melding' }));
  await waitFor(() => expect(screen.getByRole('status').textContent).toContain('Meldingen er sendt'));
});
