// describe  作用域 分组 
// expect it  断言 期望 
import { fetchEnv } from "../src/featchEnv";

describe("fetchEnv", () => {
  it('判断是否为dev环境',()=>{
    expect(fetchEnv('https://dev.baidu.com')).toBe('dev');
  });
    it('判断是否为test环境',()=>{
    expect(fetchEnv('https://test.baidu.com')).toBe('test');
  });
    it('判断是否为pre环境',()=>{
    expect(fetchEnv('https://pre.baidu.com')).toBe('pre');
  });
    it('判断是否为prod环境',()=>{
    expect(fetchEnv('https://prod.baidu.com')).toBe('prod');
  });
});