import { getArray } from "../src/getArray";

test('getArray返回长度为3', () => {
  expect(getArray(3)).toHaveLength(3);
})

// test('getArray', () => {
//   expect(getArray('3')).toThrow(TypeError);
// })

test('getArray', () => {
  expect(getArray(3)).toEqual([0, 1, 2]);
})