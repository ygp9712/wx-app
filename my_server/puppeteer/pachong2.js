const puppeteer = require('puppeteer')
 
const handleList = require('./helper/handleList');
 

 
(async () => {
 
  const browser = await puppeteer.launch({headless: false, slowMo: 250, defaultViewport: {width: 1280, height: 800}})
 
  const page = await browser.newPage()
 
  await page.goto('https://yz.chsi.com.cn/', {waitUntil: 'networkidle2'})
 

 
  console.log('前往目标网页')
 
  const list = await page.evaluate(() => {
 
    let item = document.querySelectorAll('body > div.main-wrapper > div.container > div.index-row.part02.clearfix > div.part-body > div.yz-main > div:nth-child(2) > div.list-content > ul > li > a')
    
    return Array.prototype.map.call(item, a => a.href)
  })
 
  list.forEach(async item => {
    let table = 'collegearticle'
    console.log(item);
    await handleList(item, table);
  })
 
  await browser.close()
})()
 