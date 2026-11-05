export const profile = {
  firstName: 'Osiax',
  lastName: 'Tcheoubi',
  fullName: 'Osiax Agossou Missimahu Tcheoubi',
  role: 'Développeur web full stack',
  location: 'Parakou, Bénin',
  email: 'tcheoubiosiax@gmail.com',
  whatsappDisplay: '+229 01 61 87 92 21',
  whatsappUrl: 'https://wa.me/2290161879221',
  cvUrl: `${import.meta.env.BASE_URL}cv-osiax-tcheoubi.pdf`,
  formspreeUrl: 'https://formspree.io/f/xwlevrwj',
  socials: [
    { label: 'GitHub', url: 'https://github.com/Osiax-dev' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/osiax-dev' },
    { label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61582790965956' },
  ],
} as const

export const navLinks = [
  { href: '#realisations', label: 'Réalisations' },
  { href: '#parcours', label: 'Parcours' },
  { href: '#competences', label: 'Compétences' },
  { href: '#methode', label: 'Méthode' },
  { href: '#contact', label: 'Contact' },
] as const
