import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LazyMotion, domAnimation } from 'motion/react'
import { Header } from './Header'

const renderHeader = () =>
  render(
    <LazyMotion features={domAnimation}>
      <Header />
    </LazyMotion>,
  )

describe('Header', () => {
  it('ouvre le menu mobile, met le focus sur le premier lien et se ferme avec Échap', async () => {
    renderHeader()
    const button = screen.getByRole('button', { name: /ouvrir le menu/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    const menu = screen.getByRole('navigation', { name: /menu mobile/i })
    expect(menu).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /réalisations/i })[1]).toHaveFocus()

    await userEvent.keyboard('{Escape}')
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveFocus()
  })

  it('propose un lien d’évitement vers le contenu', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: /aller au contenu/i })).toHaveAttribute(
      'href',
      '#contenu',
    )
  })
})
