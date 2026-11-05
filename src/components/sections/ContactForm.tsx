import { useRef, useState, type FormEvent } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import { profile } from '../../data/profile'
import {
  sendContact,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from '../../lib/contact'
import { cn } from '../../lib/cn'

type Status = 'idle' | 'sending' | 'success' | 'error'

const empty: ContactValues = { nom: '', email: '', sujet: '', message: '' }

const fields: {
  name: keyof ContactValues
  label: string
  type?: string
  autoComplete?: string
  optional?: boolean
  multiline?: boolean
}[] = [
  { name: 'nom', label: 'Nom', autoComplete: 'name' },
  { name: 'email', label: 'Adresse e-mail', type: 'email', autoComplete: 'email' },
  { name: 'sujet', label: 'Sujet', optional: true },
  { name: 'message', label: 'Votre projet', multiline: true },
]

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(empty)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const honeypot = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const update = (name: keyof ContactValues, value: string) => {
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (status === 'sending') return
    const found = validateContact(values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setStatus('sending')
    try {
      await sendContact(profile.formspreeUrl, values, honeypot.current?.value ?? '')
      setStatus('success')
      setValues(empty)
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="space-y-6"
      aria-describedby="form-statut"
    >
      {fields.map((f) => {
        const id = `contact-${f.name}`
        const errorId = `${id}-erreur`
        const error = errors[f.name]
        const common = {
          id,
          name: f.name,
          value: values[f.name],
          autoComplete: f.autoComplete,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': error ? errorId : undefined,
          className: cn(
            'w-full rounded-2xl border bg-surface px-4 py-3 text-[1.0625rem] text-fg outline-none transition-colors placeholder:text-fg-soft/80 focus:border-accent focus:ring-2 focus:ring-accent/40',
            error ? 'border-danger' : 'border-line-strong',
          ),
        }
        return (
          <div key={f.name}>
            <label htmlFor={id} className="flex justify-between text-[0.9375rem] font-semibold">
              <span>{f.label}</span>
              {f.optional && <span className="text-fg-soft">facultatif</span>}
            </label>
            <div className="mt-2">
              {f.multiline ? (
                <textarea
                  {...common}
                  rows={6}
                  placeholder="Quelques lignes sur votre besoin, vos délais, votre budget…"
                  onChange={(e) => update(f.name, e.target.value)}
                />
              ) : (
                <input
                  {...common}
                  type={f.type ?? 'text'}
                  onChange={(e) => update(f.name, e.target.value)}
                />
              )}
            </div>
            {error && (
              <p id={errorId} className="mt-2 text-[0.9375rem] font-medium text-danger">
                {error}
              </p>
            )}
          </div>
        )
      })}

      {/* Champ piège anti-spam, invisible pour les humains. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-site">Ne pas remplir</label>
        <input
          ref={honeypot}
          id="contact-site"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        aria-disabled={status === 'sending'}
        className="group inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-full bg-fg px-7 text-[1rem] font-semibold text-bg transition-colors hover:bg-accent hover:text-on-accent sm:w-auto"
      >
        {status === 'sending' ? (
          <>
            <Loader2 aria-hidden="true" className="size-5 animate-spin" />
            Envoi en cours…
          </>
        ) : (
          <>
            Envoyer le message
            <ArrowRight
              aria-hidden="true"
              className="size-5 transition-transform group-hover:translate-x-1"
            />
          </>
        )}
      </button>

      <p
        id="form-statut"
        role="status"
        aria-live="polite"
        className="min-h-6 text-[1rem] font-medium"
      >
        {status === 'success' && (
          <span className="text-accent">Message envoyé. Je vous réponds sous 24 heures.</span>
        )}
        {status === 'error' && (
          <span className="text-danger">
            L’envoi a échoué. Réessayez, ou écrivez-moi directement à {profile.email}.
          </span>
        )}
      </p>
    </form>
  )
}
