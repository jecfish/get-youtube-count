import { Page } from "@playwright/test";

export async function getUrlsfromYoutubePlaylist(playlistURL, page: Page) {
  await page.goto(playlistURL);

  const acceptTermButtonCount = await page.locator('button:visible[aria-label="Accept all"]').count();

  if (acceptTermButtonCount)
    await page.locator('button[aria-label="Accept all"]').nth(acceptTermButtonCount-1).click();
  
  const list = page.locator(
    'ytd-playlist-video-renderer ytd-thumbnail a#thumbnail'
  );

  const urls = await list.evaluateAll((el) =>
    el.map((x) => 'https://www.youtube.com' + x.getAttribute('href') || '')
  );
  
  return urls;
}

export async function acceptTermsCondition(playlistURL, page: Page) {
  await page.goto(playlistURL);

  const acceptTermButtonCount = await page.locator('button:visible[aria-label="Accept all"]').count();

  if (acceptTermButtonCount)
    await page.locator('button[aria-label="Accept all"]').nth(acceptTermButtonCount-1).click();
}


export type UrlItem = { id: number, video: string, title: string };
export async function processYoutubeUrls(list: UrlItem[]) {
  return list.map(item => ({
    ...item,
    url: 'https://www.youtube.com/watch?v=' + item.video,
  }));
}

export async function getViewsfromYoutubeVideo(videoURL, page: Page) {
  await page.goto(videoURL);

  const title = await page
    .locator("yt-formatted-string.ytd-video-primary-info-renderer")
    .nth(1)
    .textContent();

  const rawViews = await page
    // .locator("#formatted-snippet-text span")
    .locator('span.ytd-video-view-count-renderer')
    .first()
    .textContent();
  console.log(rawViews);
  const views = +((rawViews || '').replace(' views', '').replaceAll(',', ''));

  return { title, url: videoURL, views}; 
}

export function getToday () {
  const dateObj = new Date();
  const year = dateObj.getUTCFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2,'0');
  const date = dateObj.getUTCDate().toString().padStart(2,'0');

  return `${year}${month}${date}`;
}
