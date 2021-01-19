import {
  nativeTag,
  isTag
} from '../../src/tag'

const c = nativeTag('span')

const t = nativeTag('div', [],
  [
    'show me',
    c
  ]
)


console.log('t', t)