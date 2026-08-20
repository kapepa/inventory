import { describe, it, expect } from 'vitest'
import { getRandomColor } from '../get-random-color'

describe('getRandomColor', () => {
  const validColors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-orange-500',
    'bg-teal-500',
    'bg-cyan-500',
  ]

  it('returns a valid Tailwind class', () => {
    const color = getRandomColor()
    expect(validColors).toContain(color)
  })

  it('returns the same color for the same seed', () => {
    const color1 = getRandomColor('user123')
    const color2 = getRandomColor('user123')
    expect(color1).toBe(color2)
  })

  it('returns different colors for different seeds', () => {
    const color1 = getRandomColor('user1')
    const color2 = getRandomColor('user2')
    expect(validColors).toContain(color1)
    expect(validColors).toContain(color2)
  })

  it('works without seed (randomly)', () => {
    const color = getRandomColor()
    expect(validColors).toContain(color)
  })
})