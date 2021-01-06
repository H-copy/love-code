import {
  oneSpace,
  tagNameFormatter,
} from '../src/utils'

test('oneSpace', () => {
  expect(oneSpace('a    b   c')).toBe('a b c')
})

test('tagNameFormatter', () => {
  expect(tagNameFormatter('AButton')).toBe('a-button')
  expect(tagNameFormatter('active')).toBe('active')
  expect(tagNameFormatter('ABCD23U')).toBe('a-b-c-d23-u')
})