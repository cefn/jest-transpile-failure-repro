import type { Immutable } from '@lauf/lauf-store'
import { CATEGORIES, Entry, SCORENAMES } from '../src/types'
import { sortEntries } from '../src/util'

/** Creates minimal entry with text fields varying by index, no tags, fixed dates
 * and all optional fields omitted. This is useful for seeing the diff outcomes
 * reported by Jest in sorting tests.
 */
function createEntry(uid: number & keyof typeof CATEGORIES): Entry {
  return {
    org: `Org ${uid}`,
    title: `Title ${uid}`,
    tags: [],
    start: new Date('2000-01-01'),
    stop: new Date('2000-12-01'),
  }
}

describe('sortEntries: individual field order of default SORTS', () => {
  test('Entries with ascending recency are sorted to descending', () => {
    const entries: Immutable<Entry[]> = [
      { ...createEntry(0), stop: new Date('2000-12-01') },
      { ...createEntry(1), stop: new Date('2001-12-01') },
      { ...createEntry(2), stop: new Date('2002-12-01') },
    ]
    const sortedEntries = sortEntries(entries, SCORENAMES)
    expect(sortedEntries).toEqual([...entries].reverse())
  })

  test('Entries with fixed recency, ascending duration are sorted to descending', () => {
    const stop = new Date('2002-12-01')
    const entries: Immutable<Entry[]> = [
      { ...createEntry(0), start: new Date('2002-01-01'), stop }, // 1 years
      { ...createEntry(1), start: new Date('2001-01-01'), stop }, // 2 years
      { ...createEntry(2), start: new Date('2000-01-01'), stop }, // 3 years
    ]
    const sortedEntries = sortEntries(entries, SCORENAMES)
    expect(sortedEntries).toEqual([...entries].reverse())
  })

  test('Entries with ascending category importance are sorted to descending', () => {
    const entries: Immutable<Entry[]> = [
      { ...createEntry(0), tags: ['society'] },
      { ...createEntry(1), tags: ['education'] },
      { ...createEntry(2), tags: ['employment'] },
    ]
    const sortedEntries = sortEntries(entries, SCORENAMES)
    expect(sortedEntries).toEqual([...entries].reverse())
  })
})

describe('sortEntries: relative priority of fields of default SORTS', () => {
  test('recency dominates duration', () => {
    const entries: Immutable<Entry[]> = [
      {
        ...createEntry(0),
        start: new Date('1998-01-01'),
        stop: new Date('2000-12-31'),
      }, // duration 3 years
      {
        ...createEntry(1),
        start: new Date('2000-01-01'),
        stop: new Date('2001-12-31'),
      }, // duration 2 years
      {
        ...createEntry(2),
        start: new Date('2002-01-01'),
        stop: new Date('2002-12-31'),
      }, // duration 1 years
    ]
    const sortedEntries = sortEntries(entries, SCORENAMES)
    expect(sortedEntries).toEqual([...entries].reverse())
  })

  test('Entries with ascending category importance are sorted to descending', () => {
    const entries: Immutable<Entry[]> = [
      { ...createEntry(0), tags: ['society'] },
      { ...createEntry(1), tags: ['education'] },
      { ...createEntry(2), tags: ['employment'] },
    ]
    const sortedEntries = sortEntries(entries, SCORENAMES)
    expect(sortedEntries).toEqual([...entries].reverse())
  })
})
