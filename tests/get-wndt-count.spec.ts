import { test, expect } from '@playwright/test';
import { writeFileSync } from 'fs';
import { acceptTermsCondition, getToday, getUrlsfromYoutubePlaylist, getViewsfromYoutubeVideo, processYoutubeUrls } from '../helpers/utils';
import { list } from '../helpers/wndt';

test('Get WNDT view counts', async ({ page }) => {
  const playlist = 'https://www.youtube.com/playlist?list=PLNYkxOF6rcIBDSojZWBv4QJNoT4GNYzQD';
  await acceptTermsCondition(playlist, page);

  const urlItems = await processYoutubeUrls(list);

  const result: any[] = [];

  for (const item of urlItems.filter(x => x.id >= 98)) {
    const { views } = await getViewsfromYoutubeVideo(item.url, page);
    result.push({...item, views});
  }

  const prefix = 'docs/wndt_';
  const today = getToday(); 
  const lastUpdated = today;

  writeFileSync(`${prefix}${today}.json`, JSON.stringify(result));
  writeFileSync(`${prefix}latest.json`, JSON.stringify(result));
  writeFileSync(`${prefix}last_updated.json`, JSON.stringify([{ lastUpdated }]));
});