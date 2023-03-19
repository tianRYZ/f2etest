const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto('http://localhost:8080/login.html');

  //   3. 初始页面截图
  await page.screenshot({
    path: `screenshot_${new Date().getTime()}.png`,
  });

  //   4. 获取dom元素 输入内容
  await page.type('.account', 'admin');
  await page.type('.password', 'admin');

  //   5.模拟点击操作
  const btnConfirm = await page.$('#btn-login');
  await Promise.all([btnConfirm.click(), page.waitForNavigation()]);

  //   6.最后截屏
  await page.screenshot({
    path: `screenshot_${new Date().getTime()}.png`,
  });

  //   elementhandle
  //
  browser.close();
})();
