const puppeteer = require('puppeteer')
// 等待3000毫秒
const sleep = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })

const url = `https://juejin.im/welcome/frontend`
;(async () => {
  console.log('Start visit')

  // 启动一个浏览器
  const brower = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false,
  })

  const page = await brower.newPage() // 开启一个新页面
  // 去豆瓣那个页面
  await page.goto(url, {
    // waitUntil: 'networkidle2', // 网络空闲说明已加载完毕
    waitUntil: 'domcontentloaded',
  })
  await page.mainFrame().addScriptTag({
    url: 'https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js',
  })

  await sleep(3000)

  // 结果
  const result = await page.evaluate(() => {
    // 拿到页面上的jQuery
    var items = $('.entry-link')
    var links = []

    if (items.length >= 1) {
      items.each((index, item) => {
        let it = $(item)
        let title = it.find('.title-row a').text()
        let url = it.find('.title-row a').attr('href')
        let author = it.find('.meta-row .username a').text()

        links.push({
          author,
          title,
          url,
        })
      })
    }
    return links
  })

  // 关闭浏览器
  brower.close()

  console.log(result.length)
})()
