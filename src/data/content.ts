import type { LearningProject, UpcomingProject } from './types'

/** Projets d'apprentissage : affichés à part, sans les confondre avec les réalisations. */
export const learning: LearningProject[] = [
  {
    name: 'K25ShaoKao',
    context: 'Stage · UTC Services',
    year: '2026',
    summary:
      'Application web pour un restaurant de brochettes chinoises : site vitrine, panneau d’administration, commande en ligne, réservations, événements et intégration du paiement Mobile Money (MTN MoMo, Moov Money, Celtiis Cash).',
    stack: ['Laravel 12', 'Mobile Money'],
  },
  {
    name: 'VéloMax',
    context: 'Projet personnel',
    year: '2025',
    summary:
      'Vitrine de vente de vélos (route, VTT, gravel, électriques) avec mise en avant des nouveautés et arguments de confiance. Site d’entraînement, pas entièrement fonctionnel.',
    stack: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
    url: 'https://velomax.netlify.app/',
    image: {
      name: 'velomax',
      alt: 'Page d’accueil de VéloMax : « Performance allemande. Design sans compromis. »',
      width: 1347,
      height: 548,
    },
  },
]

/**
 * Section « Atelier » : projets en préparation ou à venir.
 * Pour ajouter un projet, copier ce modèle dans le tableau :
 *   { name: 'Nom', status: 'En préparation', summary: 'Une phrase.', stack: ['Laravel'] }
 * Statuts possibles : 'En réflexion' | 'En préparation' | 'En cours' | 'À venir'
 * Tant que le tableau est vide, la section affiche un message d'attente.
 */
export const upcoming: UpcomingProject[] = []

export const principles = [
  {
    title: 'Comprendre le terrain avant de coder',
    text: 'Une enquête auprès des futurs utilisateurs pour RoseRelais, des données agricoles réelles pour AgriPredict : je commence par le besoin, pas par l’outil.',
  },
  {
    title: 'Séparer, tester, puis livrer',
    text: 'Sur DOBI, l’API a été construite et validée requête par requête avant la première ligne d’interface. Chaque couche est vérifiée avant de passer à la suivante.',
  },
  {
    title: 'Penser au téléphone de l’utilisateur',
    text: 'Au Bénin, beaucoup naviguent sur smartphone avec une connexion limitée. Mes interfaces sont pensées d’abord pour ce contexte.',
  },
] as const

export const timeline = [
  { period: 'Juillet 2023', title: 'Baccalauréat série D', place: 'Notre Dame de Lourde, Covè' },
  {
    period: '2023 — 2026',
    title: 'Licence en Informatique de Gestion',
    place: 'Institut Universitaire de Technologie, Université de Parakou',
  },
  {
    period: 'Avril — juillet 2026',
    title: 'Stagiaire développeur web',
    place: 'UTC Services, Parakou',
  },
  {
    period: '2026',
    title: 'Projets mis en production',
    place: 'AgriPredict, DOBI, RoseRelais, XMarket, Black Friday',
  },
] as const

export const languages = [
  { name: 'Français', level: 'Courant' },
  { name: 'Anglais', level: 'Intermédiaire' },
] as const

/** Compétences regroupées par ce qu'elles permettent de faire. `projects` renvoie aux id de projects.ts. */
export const skillGroups = [
  {
    title: 'Concevoir une API et des données',
    text: 'Modèle de données, logique métier, sécurité et validation des entrées.',
    items: ['PHP', 'Laravel', 'MySQL', 'MariaDB', 'API REST', 'Postman'],
    projects: ['agripredict', 'dobi'],
  },
  {
    title: 'Construire une interface',
    text: 'Interfaces responsives, accessibles et rapides, du prototype à la production.',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Vite', 'Tailwind CSS', 'Bootstrap', 'Figma'],
    projects: ['dobi', 'roserelais', 'xmarket', 'blackfriday'],
  },
  {
    title: 'Exploiter les données et l’IA',
    text: 'Modèles de prédiction, données satellite et météo, assistants basés sur des LLM.',
    items: [
      'Python',
      'scikit-learn',
      'Google Earth Engine',
      'Open-Météo',
      'API Groq',
      'API Claude',
    ],
    projects: ['agripredict', 'roserelais'],
  },
  {
    title: 'Mettre en ligne et maintenir',
    text: 'Versionnement, déploiement, référencement technique et suivi après livraison.',
    items: ['Git', 'GitHub', 'Vercel', 'Alwaysdata', 'XAMPP', 'VS Code', 'SEO technique'],
    projects: ['dobi', 'roserelais', 'agripredict'],
  },
] as const

export const academicSkills = ['Flutter', 'Java', 'C', 'C++ (Qt)'] as const

export const method = [
  {
    step: 'Analyser',
    text: 'Lire le besoin, poser les questions, écrire ce qui doit fonctionner.',
    example:
      'Cahier des charges étudié, choix des technologies ajusté à la base de données existante.',
  },
  {
    step: 'Concevoir',
    text: 'Structurer les données, découper l’application, définir l’identité visuelle.',
    example: 'API et interface séparées, palette et typographies fixées avant les écrans.',
  },
  {
    step: 'Développer',
    text: 'Construire par couches, en commençant par ce qui porte les données.',
    example: 'Backend d’abord, interface ensuite.',
  },
  {
    step: 'Tester',
    text: 'Vérifier chaque fonctionnalité avant de la considérer comme terminée.',
    example: '47 requêtes Postman sur 47 validées avant de brancher l’interface.',
  },
  {
    step: 'Livrer et améliorer',
    text: 'Mettre en ligne proprement, puis faire évoluer le produit.',
    example: 'API sur Alwaysdata, interface sur Vercel, puis ajout des e-mails et des invitations.',
  },
] as const
