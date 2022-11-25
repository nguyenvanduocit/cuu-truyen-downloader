import fs from 'fs'
import { downloadPage } from './downloadPage.js'

export const DownloadChapter = async (page, chapter) => {
  const chapterUrl = `https://cuutruyen.net/mangas/446/chapters/${chapter.id}`;
  // get chapterID
  const chapterId = chapter['id'];
  const chapterNumber = chapter['number'];

  // get mangaId
  const mangaId = chapterUrl.split('/')[4];
  const distPath = `./dist/${mangaId}/${chapterNumber}`;
  fs.mkdirSync(distPath, { recursive: true });

  console.log(`Downloading chapter ${chapterUrl}`);

  await page.goto(chapterUrl);
  // wait for al js loaded
  await new Promise(resolve => setTimeout(resolve, 5000));

  try {
    await page.waitForSelector("div[role=dialog]", { visible: true, timeout: 1000 });
    console.log('close popup');
    await page.click("div[role=dialog] a:nth-child(2)");
    await page.click("div[role=dialog] button[type=button]");
  } catch (error) {
    console.log("No pubup");
  }

  const chapterData = await page.evaluate(async (chapterId) => {
    const response = await fetch(`https://kakarot.cuutruyen.net/api/v1/readings/${chapterId}`)
    const data = await response.json()
    return JSON.parse(data.data.attributes.pages)
  }, chapterId)

  for (let i = 0; i < chapterData.length; i++) {
    const pageData = chapterData[i];
    await downloadPage(page, pageData, distPath)
  }
}
