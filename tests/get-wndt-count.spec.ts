import { test, expect } from '@playwright/test';
import { writeFileSync } from 'fs';
import { getFileName, getUrlsfromYoutubePlaylist, getViewsfromYoutubeVideo } from '../helpers/utils';

test('Get WNDT view counts', async ({ page }) => {
  const playlist = 'https://www.youtube.com/playlist?list=PLNYkxOF6rcIBDSojZWBv4QJNoT4GNYzQD';

  const urls = await getUrlsfromYoutubePlaylist(playlist, page);
  console.log(urls);

  const result: any[] = [];

  for (const link of urls.slice(0,10)) {
    const item = await getViewsfromYoutubeVideo(link, page);
    console.log(item);
    result.push(item);
  }

  writeFileSync(getFileName(`docs/wndt`), JSON.stringify(result));
});