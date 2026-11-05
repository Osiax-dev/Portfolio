import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { validateContact } from '../../lib/contact'
import { ContactForm } from './ContactForm'

describe('validateContact', () => {
  it('refuse les champs vides ou invalides', () => {
    const errors = validateContact({ nom: 'A', email: 'pas-un-mail', sujet: '', message: 'court' })
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'nom'])
  })

  it('accepte un message complet, sujet facultatif', () => {
    const errors = validateContact({
      nom: 'Awa',
      email: 'awa@exemple.bj',
      sujet: '',
      message: 'Je souhaite créer un site pour mon entreprise.',
    })
    expect(errors).toEqual({})
  })
})

describe('ContactForm', () => {
  afterEach(() => vi.restoreAllMocks())

  it('affiche les erreurs près des champs et place le focus sur le premier', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    render(<ContactForm />)
    await userEvent.click(screen.getByRole('button', { name: /envoyer le message/i }))
    expect(screen.getByText(/indiquez votre nom/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Nom')).toHaveFocus()
    expect(screen.getByLabelText('Nom')).toHaveAttribute('aria-invalid', 'true')
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('envoie le message à Formspree et confirme l’envoi', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{"ok":true}', { status: 200 }))
    render(<ContactForm />)
    await userEvent.type(screen.getByLabelText('Nom'), 'Awa')
    await userEvent.type(screen.getByLabelText('Adresse e-mail'), 'awa@exemple.bj')
    await userEvent.type(
      screen.getByLabelText('Votre projet'),
      'Je souhaite créer un site vitrine.',
    )
    await userEvent.click(screen.getByRole('button', { name: /envoyer le message/i }))
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/message envoyé/i))
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://formspree.io/f/xwlevrwj',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('signale un échec d’envoi avec une solution de repli', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 500 }))
    render(<ContactForm />)
    await userEvent.type(screen.getByLabelText('Nom'), 'Awa')
    await userEvent.type(screen.getByLabelText('Adresse e-mail'), 'awa@exemple.bj')
    await userEvent.type(
      screen.getByLabelText('Votre projet'),
      'Je souhaite créer un site vitrine.',
    )
    await userEvent.click(screen.getByRole('button', { name: /envoyer le message/i }))
    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(/tcheoubiosiax@gmail.com/),
    )
  })
})
