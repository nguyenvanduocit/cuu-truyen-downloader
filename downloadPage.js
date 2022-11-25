export const downloadPage = async (page, pageData, distPath) => {
  const pageId = pageData["id"]
  await new Promise(resolve => setTimeout(resolve, 500));
  // eval scroll to page
  await page.evaluate((pageId) => {
    const page = document.querySelector(`#page-container-${pageId}`);
    page.scrollIntoView();
  }, pageId);

  await page.waitForSelector(`div.z-30[data-id="${pageId}"]`, { visible: true, timeout: 500 });
  console.log(`page ${pageId} is visible`);

  await new Promise(resolve => setTimeout(resolve, 500));
  const elementClip = await page.evaluate((pageId) => {
    const realCanvas = document.querySelector(`${pageId}`)
    let boundingBox = realCanvas.getBoundingClientRect();
    return {
      width: Math.round(boundingBox.width),
      height: Math.round(boundingBox.height),
      x: Math.round(boundingBox.x),
      y: Math.round(boundingBox.y),
    };
  }, `div.z-30[data-id="${pageId}"]`);

  const fileName = `${distPath}/${pageData['index']}-${pageData['order']}.jpg`;
  await page.screenshot({
    path: fileName,
    type: 'jpeg',
    skipBackground: true,
    captureBeyondViewport: true,
    fromSurface: true,
    clip: elementClip
  });
}
