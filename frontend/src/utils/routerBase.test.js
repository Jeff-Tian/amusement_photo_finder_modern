import { describe, expect, test } from 'vitest'
import { normalizeBasename } from './routerBase.js'

describe('normalizeBasename', () => {
  test('returns empty string for non-string values', () => {
    expect(normalizeBasename(undefined)).toBe('')
    expect(normalizeBasename(null)).toBe('')
    expect(normalizeBasename(123)).toBe('')
    expect(normalizeBasename({})).toBe('')
  })

  test('returns empty string for empty/whitespace', () => {
    expect(normalizeBasename('')).toBe('')
    expect(normalizeBasename('   ')).toBe('')
  })

  test('treats root (/) as no basename', () => {
    expect(normalizeBasename('/')).toBe('')
    expect(normalizeBasename(' / ')).toBe('')
  })

  test('removes trailing slashes (single and multiple)', () => {
    expect(normalizeBasename('/rebrick/')).toBe('/rebrick')
    expect(normalizeBasename('/rebrick//')).toBe('/rebrick')
    expect(normalizeBasename('/a/b/c/')).toBe('/a/b/c')
  })

  test('keeps non-root values without trailing slash unchanged', () => {
    expect(normalizeBasename('/rebrick')).toBe('/rebrick')
    expect(normalizeBasename('/a/b/c')).toBe('/a/b/c')
    expect(normalizeBasename('rebrick')).toBe('rebrick')
    expect(normalizeBasename('/rebrick/')).toBe('/rebrick')
  })
})
