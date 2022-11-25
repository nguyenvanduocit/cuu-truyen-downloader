import puppeteer from 'puppeteer';
import fs from 'fs';
import { listChapters } from './listChapthers.js'
import { DownloadChapter } from './downloadChapter.js'

// chapterUrl: https://cuutruyen.net/mangas/446/chapters/10605


(async () => {

  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    defaultViewport: { width: 885, height: 1300 }
  });

  const page = await browser.newPage();

  // mangaInfo = await getMangaData()
  //

  const chapters = await listChapters("446");

  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    await DownloadChapter(page, chapter);
  }

  await page.close()
  await browser.close();
})();
