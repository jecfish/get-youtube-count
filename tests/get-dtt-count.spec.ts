import { test, expect } from '@playwright/test';
import { writeFileSync } from 'fs';
import { getFileName, getUrlsfromYoutubePlaylist, getViewsfromYoutubeVideo } from '../helpers/utils';

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

  writeFileSync(getFileName(`results/dtt`), JSON.stringify(result));
});
