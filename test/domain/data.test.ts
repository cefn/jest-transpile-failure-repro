import { Immutable } from '@lauf/lauf-store'
import { ALL_ENTRIES } from '../../src/data'
import { CATEGORIES, Category, Entry } from '../../src/types'

export function getCategory(entry: Immutable<Entry>): Category | null {
  for (const tag of entry.tags) {
    for (const category of CATEGORIES) {
      if (tag === category) {
        return tag
      }
    }
  }
  return null
}

describe('Data integrity', () => {
  test('No Entries are missing a CATEGORY tag', () => {
    expect(ALL_ENTRIES.find((entry) => getCategory(entry) === null)).toBeFalsy()
  })
})
