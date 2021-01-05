import {
  oneSpace
} from '../src/utils'


test('oneSpace', () => {
  expect(oneSpace('a    b   c')).toBe('a b c')
})