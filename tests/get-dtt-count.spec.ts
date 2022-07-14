import { test, expect } from '@playwright/test';
import { writeFileSync } from 'fs';
import { getToday, getUrlsfromYoutubePlaylist, getViewsfromYoutubeVideo } from '../helpers/utils';

test('Get DTT view counts', async ({ page }) => {
  const playlist = 'https://www.youtube.com/playlist?list=PLNYkxOF6rcIAcezfL8q0rjt13ufKseL5X';

  const urls = await getUrlsfromYoutubePlaylist(playlist, page);
  console.log(urls);

  const result: any[] = [];

  for (const link of urls) {
    const item = await getViewsfromYoutubeVideo(link, page);
    console.log(item);
    result.push(item);
  }

  const prefix = 'docs/dtt_';
  const today = getToday(); 
  const lastUpdated = today;

  writeFileSync(`${prefix}${today}.json`, JSON.stringify(result));
  writeFileSync(`${prefix}latest.json`, JSON.stringify(result));
  writeFileSync(`${prefix}last_updated.json`, JSON.stringify([{ lastUpdated }]));
});
