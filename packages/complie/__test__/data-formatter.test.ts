import { 
  dataFormatter,
  parseArray,
  parseObj
} from '../src/data-fomatter'


test('parseArray', () => {
  expect(parseArray(['name', 24, null])).toBe('["name",24,null]')
})

test('parseObj', () => {
  expect(parseObj({name:'coco', age:24})).toBe('{name:"coco",age:24}')
})


describe('parseObj', () => {

  test('array', () => {
    expect(dataFormatter(['name', 24, null])).toBe('["name",24,null]')
  })

  test('object', () => {
    expect(dataFormatter({ name: 'coco', age: 24 })).toBe('{name:"coco",age:24}')
  })
  
  test('object-nest', () => {
    expect(dataFormatter({ name: 'coco', age: 24 })).toBe('{name:"coco",age:24}')
  })
  
  test('null', () => {
    expect(dataFormatter(null)).toBe('null')
  })
  
  test('undefined', () => {
    expect(dataFormatter(undefined)).toBe("undefined")
  })

  test('function', () => {
    expect(dataFormatter(
      function call() {console.log('show me')}
    )).toBe(`function call() { console.log('show me'); }`)
  })

})
