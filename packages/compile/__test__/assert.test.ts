import {
  isArray,
  isString,
  isFunction,
  isObject,
  isEventName,
  isSlotName
} from '../src/utils/assert'

class Loc{
  constructor(public title:string) {
    this.title = title
  }
}

test('isArray', () => {
  expect(isArray(null)).toBeFalsy()
  expect(isArray(undefined)).toBeFalsy()
  expect(isArray('')).toBeFalsy()
  expect(isArray(true)).toBeFalsy()
  expect(isArray(false)).toBeFalsy()
  expect(isArray([])).toBeTruthy()
  expect(isArray({})).toBeFalsy()
  expect(isArray(new Loc('loc'))).toBeFalsy()
  expect(isArray(() => {})).toBeFalsy()
})


test('isString', () => {
  expect(isString(null)).toBeFalsy()
  expect(isString(undefined)).toBeFalsy()
  expect(isString('')).toBeTruthy()
  expect(isString(true)).toBeFalsy()
  expect(isString(false)).toBeFalsy()
  expect(isString([])).toBeFalsy()
  expect(isString({})).toBeFalsy()
  expect(isString(new Loc('loc'))).toBeFalsy()
  expect(isString(() => {})).toBeFalsy()
})


test('isFunction', () => {
  expect(isFunction(null)).toBeFalsy()
  expect(isFunction(undefined)).toBeFalsy()
  expect(isFunction('')).toBeFalsy()
  expect(isFunction(true)).toBeFalsy()
  expect(isFunction(false)).toBeFalsy()
  expect(isFunction([])).toBeFalsy()
  expect(isFunction({})).toBeFalsy()
  expect(isFunction(new Loc('loc'))).toBeFalsy()
  expect(isFunction(() => {})).toBeTruthy()
})


test('isObject', () => {
  expect(isObject(null)).toBeFalsy()
  expect(isObject(undefined)).toBeFalsy()
  expect(isObject('')).toBeFalsy()
  expect(isObject(true)).toBeFalsy()
  expect(isObject(false)).toBeFalsy()
  expect(isObject([])).toBeFalsy()
  expect(isObject({})).toBeTruthy()
  expect(isObject(new Loc('loc'))).toBeTruthy()
  expect(isObject(() => {})).toBeFalsy()
})

test('isEventName', () => {
  expect(isEventName(null)).toBeFalsy()
  expect(isEventName(undefined)).toBeFalsy()
  expect(isEventName('')).toBeFalsy()
  expect(isEventName(true)).toBeFalsy()
  expect(isEventName(false)).toBeFalsy()
  expect(isEventName([])).toBeFalsy()
  expect(isEventName({})).toBeFalsy()
  expect(isEventName(new Loc('loc'))).toBeFalsy()
  expect(isEventName('onClick')).toBeTruthy()
})

test('isSlotName', () => {
  expect(isSlotName("v-slot")).toBeTruthy()
  expect(isSlotName("v-slot:default")).toBeTruthy()
  expect(isSlotName("v-slot:")).toBeFalsy()
})