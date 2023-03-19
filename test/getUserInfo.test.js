import { getUserInfo } from "../src/userIfno";

test('getUserInfo返回对深度相等', () => {
  expect(getUserInfo()).toEqual(getUserInfo());
})

test('getUserInfo返回的对象内存地址不相同', () => {
  expect(getUserInfo()).not.toBe(getUserInfo());
})

test('getUserInfo.name应该包含tia', () => {
  expect(getUserInfo().name).toMatch(/tia/i);
})