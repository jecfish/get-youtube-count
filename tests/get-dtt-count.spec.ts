import { test, expect } from '@playwright/test';
import { writeFileSync } from 'fs';
import { getToday, processYoutubeUrls, getViewsfromYoutubeVideo, acceptTermsCondition } from '../helpers/utils';
import { list } from '../helpers/dtt';

test('Get DTT view counts', async ({ page }) => {
  const playlist = 'https://www.youtube.com/playlist?list=PLNYkxOF6rcIAcezfL8q0rjt13ufKseL5X';
  await acceptTermsCondition(playlist, page);

  const urlItems = await processYoutubeUrls(list);

  const result: any[] = [];

  for (const item of urlItems) {
    const { views } = await getViewsfromYoutubeVideo(item.url, page);
    result.push({...item, views});
  }

  const prefix = 'docs/dtt_';
  const today = getToday(); 
  const lastUpdated = today;

  writeFileSync(`${prefix}${today}.json`, JSON.stringify(result));
  writeFileSync(`${prefix}latest.json`, JSON.stringify(result));
  writeFileSync(`${prefix}last_updated.json`, JSON.stringify([{ lastUpdated }]));
});
