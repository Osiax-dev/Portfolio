export type ContactValues = { nom: string; email: string; sujet: string; message: string }
export type ContactErrors = Partial<Record<keyof ContactValues, string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Validation côté navigateur (confort) : Formspree revalide côté serveur. */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  if (values.nom.trim().length < 2) errors.nom = 'Indiquez votre nom (2 caractères minimum).'
  if (!EMAIL.test(values.email.trim())) errors.email = 'Indiquez une adresse e-mail valide.'
  if (values.sujet.trim().length > 120)
    errors.sujet = 'Le sujet ne doit pas dépasser 120 caractères.'
  if (values.message.trim().length < 10)
    errors.message = 'Décrivez votre projet en quelques mots (10 caractères minimum).'
  if (values.message.length > 5000)
    errors.message = 'Le message ne doit pas dépasser 5 000 caractères.'
  return errors
}

export async function sendContact(endpoint: string, values: ContactValues, honeypot: string) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...values, _gotcha: honeypot }),
  })
  if (!response.ok) throw new Error(`Envoi refusé (${response.status})`)
}
