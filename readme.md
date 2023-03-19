# 前端测试 

## 测试的目的  

- 提高代码质量  
- 可维护性 
    - 对现有代码进行修改 新增功能从而造成的成本越低,可维护性越高 
- 可靠性  
    - 如果依赖的第三方包有单测，则可靠性大大增加 
- 便于重构 
##  使用测试的时间 
- 开源包 
- 业务底层 npm包 

### 测试类型和框架

- 类型
    - 单元测试
    - 集成测试
    - 白盒测试 
    - 黑盒测试 
    - E2E测试(end-to-end端到端测试)

- 测试框架
  - jest
  - puppeteer 
  - cypress
  - Mocha 

### 单元测试  

模块测试 
  - 针对模块进行正确性检验的测试工作

对一个函数、 一个组件 、 一个类 、 (颗粒度小)

#### 前端为什么需要单元测试 

 - 必要性
 - 正确性: 验证代码的正确性
 - 自动化 
 - 保证重构 

## jest 

1. 安装 `yarn add jest -D`

2. 编辑 `main.js` 一个绝对值函数 进行测试

结果如下
若正确执行则如下 
![image.png](https://s2.loli.net/2023/02/28/MHvdcgGNB2FDyxk.png)

错误则报错如下  
![image.png](https://s2.loli.net/2023/02/28/hzjMFACXeKNEZPS.png)


3.  配置`coverage`查看覆盖率
```js
  "scripts": {
    "test":"jest --coverage"
  },
```
![image.png](https://s2.loli.net/2023/02/28/5lfFwuies3XjxQI.png)


>
> 若想要在node下使用esModule 则需要使用@babel/core @babel/preset-env 
>安装命令 `yarn add -D @babel/core @babel/preset-env`
> `touch .babelrc`  
>  若需要转化为ts 则`yarn add -D @babel/preset-typescript`
```js
//  .babelrc中如下 
{
  "presets": ["@babel/preset-env","@babel/preset-typescript"]
}
```


执行监听  ` "test": "jest --coverage  --watchAll"`

![image.png](https://s2.loli.net/2023/02/28/5lfFwuies3XjxQI.png)

若想进行全局或文件阈值设置则如下 
`touch jest.config.js`
```js
module.exports = {
  // 是否显示覆盖率报告 
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*'],
  // 覆盖率的阈值  
  coverageThreshold: {
    //  全局配置 
    global: {
      statements: 90, // 语句
      functions: 90,// 函数
      branches: 90,// 分支
    }
  }
}
```
未达到标准则会进行报错提醒 
![image.png](https://s2.loli.net/2023/02/28/7wYzVbT1txFKjhu.png)

#### 编写单元测试 
featchEnv方法编写 
```ts
enum IEnvEnum {
  DEV = 'dev',
  TEST = 'test',
  PRE = 'pre',
  PROD = 'prod',
}

export function fetchEnv(url: string): IEnvEnum {
  const envs = [IEnvEnum.DEV, IEnvEnum.TEST, IEnvEnum.PRE, IEnvEnum.PROD];

  return envs.find((env) => url.includes(env)) || IEnvEnum.PROD;
}
```
`fetchEnv.test.ts`文件
 - describe(name,fn) 是一个将多个相关的测试组合为一块==> 形成作用域
 - it 断言  
 - expect 期望 
 - test 测试 类似于it

```ts
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
```

常用断言方法  推荐[jest官网](https://www.jestjs.cn/docs/expect)


 - .not  修饰符允许测试结果不等于某一个值的情况
```js
// sum.test.js
test('sum(2,4) 不等于6', () => {
   expect(sum(2,4)).not.toBe(7);
})
```
 - .toEqual 递归检查所有属性和属性值是否相等 常用来检测引用类型 
 ```js
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
 ```
 - .toHaveLength 测试字符串或者数组类型长度是否满足预期
```js
// getArray.js
export const getArray = (num) => {
  if (!Number.isInteger(num)) {
    throw new TypeError('只接受证书类型的参数')
  }
  return [...new Array(num).keys()]
}
//  getArray.test.js
test('getArray返回长度为3', () => {
  expect(getArray(3)).toHaveLength(3);
})
test('getArray', () => {
  expect(getArray(3)).toEqual([0, 1, 2]);
})
```
 - .toMatch 传入一个正则表达式，允许我们来进行字符串类型的正则匹配
 ```js
// getUserInfo.test.js
 test('getUserInfo.name应该包含tia', () => {
  expect(getUserInfo().name).toMatch(/tia/i);
})
 ```
- .toThrow 让测试方法是否按照预期抛出异常
```js
//  getArray.test.js
// test('getArray', () => {
//   expect(getArray('3')).toThrow(TypeError);
// })
```

- 测试异步函数
```js
// src/services/fetchUser.js
export const fetchUser = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Krone',
        age: 2222
      });
    }, 1000)
  })
}
// fetchUser.test.js
import { fetchUser } from "../src/services/fetchUser";

test('fetchUser请求到一个用户名为Krone', async () => {
  const data = await fetchUser()
  expect(data.name).toBe('Krone')
})
```
若此时因为`@babel/preset-env`不支持async await导致的，这时候就需要对babel配置进行增强，则需安装
`@babel/plugin-transform-runtime` 并更改`.babelrc`内容
```js
{
 "presets": ["@babel/preset-env", "@babel/preset-typescript"],
 "plugins": ["@babel/plugin-transform-runtime"]
}
```
测试结果如下 

![image.png](https://s2.loli.net/2023/03/01/6Wak8sgEKfxbYRA.png)



## E2E测试  

### puppeteer (无头浏览器)
 node库  是chrome官方团队提供 
 通过过Devtools协议在Node层提供了一系列API来控制chrome或者chromium，
 控制浏览器行为 让puppetter模拟用户操作对内容进行截图 最终输出 

自动化 ：创建浏览器 打开页面 一开始默认截图 模拟用户输入 登录成功 截图
 - puppeteer
    - 生成页面快照：图片、pdf。
    - 抓取SPA并生成预先呈现的内容
    - 从网站抓取你需要的内容。
    - 自动表单提交，UI测试，键盘输入等
    - 创建一个最新的自动化测试环境
    - 抓取应用的性能数据(chrome performance timeline)
    - 测试chrome扩展程序  
- 安装时报错解决方案 `export PUPPETEER_SKIP_DOWNLOAD='true' `
 - `yarn add -D puppeteer`
 - `node node_modules/puppeteer/install.js`  手动安装chromeium
 - PUPPETEER_DOWNLOAD_HOST=https://storage.googleapis.com.cnpmjs.org yarn add -D puppeteer


 - 创建Browser实例 
   - launch  每次重新启动一个chrome进程，启动参数可以动态修改
      - headless  true  在不打开外部浏览器的情况下 去进行测试
   - connect 共同用一个chrome实例，可部署在不同的机器上 


 - 打开页面API如下
   - goto      打开新页面
   - goBack    回退到上一页面
   - goForward 前进到下一个页面
   - reload    重新加载页面
   - waitForNavigation 等待页面跳转

两个环境 
  
使用puppeteer时，经常在两个环境之间交换数据，运行puppeteer的node.js环境和Puppeteer操作的页面PageDOM
 - 使用ElementHandle jsHandle，将PageDOM Envriroment中的元素和对象封装成对应的node.js对象，用这些对象的封装函数进行操作Page DOM

 - 获取页面元素方式

  - page.${'#uniqueId'} 获取某个选择器对应的第一个元素
  - page.$${'div'}  获取某个选择器对应的所有元素
  - page.$x{'//img'}  获取某个 xPath 对应的所有元素
  - page.waitForXPath('//img')  等待某个xPath对应的元素出现page.waitForSelector('#uniqueId') 等待某个选择器对应的元素出现