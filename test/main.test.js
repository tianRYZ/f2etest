//  引入绝对值函数 abs 
// const { abs } = require('../src/main');
import { abs } from '../src/main'

test('abs', () => {
  expect(abs(1)).toBe(1);
  expect(abs(-1)).toBe(1);
  expect(abs(0)).toBe(0);
  // expect(abs('helloworld')).toThrow((TypeError));
})