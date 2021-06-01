import { Immutable } from '@lauf/lauf-store'

export interface Entry {
  org: string
  title: string
  tags: Tag[]
  start: Date
  stop?: Date
  intro?: string
  body?: string
  boost?: number
}

export interface AppState {
  detail: Detail
  scorePriority: ScoreName[]
  limit: number
  priorityEntries: Entry[]
}

export type Tag = typeof TAGS[number]
export type Discipline = typeof DISCIPLINES[number]
export type Technology = typeof TECHNOLOGIES[number]
export type Category = typeof CATEGORIES[number]

export type Detail = keyof typeof DETAILS

/** Score operator (defines numerical scales ascending by number) */
export type Scorer = (entry: Immutable<Entry>) => number
export type ScoreName = typeof SCORENAMES[number]

export const SCORENAMES = [
  // "boost",
  'recency',
  'employment',
  'education',
  'society',
  'duration',
  'coding',
  'electronics',
  'invention',
  'management',
  'machine learning',
  'art',
  'design',
  'sport',
  'writing',
] as const

export const CATEGORIES = ['employment', 'education', 'society'] as const

export const DISCIPLINES = [
  'design',
  'invention',
  'management',
  'facilitation',
  'electronics',
  'machine learning',
  'writing',
  'making',
  'architecting',
  'coding',
  'testing',
  'devops',
  'CI/CD',
  'TDD',
  'BDD',
  'open source',
  'open hardware',
  'art',
  'sport',
  'community',
] as const

export const TECHNOLOGIES = [
  'typescript',
  'javascript',
  'node',
  'python',
  'couchdb',
  'solr',
  'aws',
  'docker',
  'jest',
] as const

export const TAGS = [...CATEGORIES, ...DISCIPLINES, ...TECHNOLOGIES] as const

export const DETAILS = {
  Minimum: ['org'],
  Title: ['org', 'title'],
  Summary: ['org', 'title', 'intro'],
  Full: ['org', 'title', 'intro', 'body'],
} as const
