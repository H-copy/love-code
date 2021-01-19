import {
  nativeTag
} from '../../src/tag'

describe('tag pro', () => {

  test('nativeTag', () => {
    const c = nativeTag('span')
    console.log('c >>>>', c)
    console.log(nativeTag(
      'div',
      [],
      [
        'show me',
        c
      ]
    ))
    
  })
  
})