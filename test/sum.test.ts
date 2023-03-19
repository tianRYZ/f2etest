import { sum } from '../src/sum';

test('sum(2,4) to equal 6', () => {
  expect(sum(2,4)).not.toBe(5);
  expect(sum(2, 4)).toBe(6);
});

test('sum(2,4) 不等于6', () => {
   expect(sum(2,4)).not.toBe(7);
})