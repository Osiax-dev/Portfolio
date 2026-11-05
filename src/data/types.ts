export type ImageSet = {
  /** Nom de base dans public/images (ex. « agripredict » → agripredict-640.avif…) */
  name: string
  alt: string
  width: number
  height: number
}

export type Figure = { value: string; label: string }

export type Project = {
  id: string
  number: string
  name: string
  year: string
  kind: string
  tagline: string
  url: string
  /** Texte affiché dans la barre d'adresse du cadre navigateur. */
  displayUrl: string
  linkLabel: string
  linkNote?: string
  image: ImageSet
  need: string
  solution: string
  features: string[]
  stack?: string[]
  role: string
  challenges?: string[]
  figures?: Figure[]
  flow?: { title: string; steps: string[] }
  architecture?: { title: string; blocks: { name: string; detail: string }[] }
}

export type LearningProject = {
  name: string
  context: string
  year: string
  summary: string
  stack: string[]
  url?: string
  image?: ImageSet
}

/**
 * Statuts autorisés pour la section « Atelier ».
 * N'utiliser un statut que s'il correspond à la réalité du projet.
 */
export type UpcomingStatus = 'En réflexion' | 'En préparation' | 'En cours' | 'À venir'

export type UpcomingProject = {
  name: string
  status: UpcomingStatus
  summary: string
  /** Technologies envisagées (facultatif). */
  stack?: string[]
}
