import { fetchUser } from "../src/services/fetchUser";

test('fetchUser请求到一个用户名为Krone', async () => {
  const data = await fetchUser()
  expect(data.name).toBe('Krone')
})