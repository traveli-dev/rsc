import { Client } from '@notionhq/client';
import { YargsArgs } from '@/types/builder';
import { getConfig, safeAppendFileSync, safeWriteFileSync } from '@/utils/';

export const pullHandler = async (yarg: YargsArgs) => {
  const config = getConfig();

  const filename = yarg.path.split('/').slice(-1)[0];

  if (!filename) return;

  const notion = new Client({
    auth: config.token
  });

  const res = await notion.databases.query({
    database_id: config.secret_id,
    filter: {
      and: [
        {
          property: 'filename',
          select: {
            equals: filename
          }
        },
        {
          property: 'title',
          title: {
            equals: yarg.repoName
          }
        }
      ]
    }
  });

  if (!res.results[0] || res.results.length !== 1) return;

  const pageId = res.results[0].id;

  const page = await notion.blocks.children.list({ block_id: pageId });

  const texts = page.results.map((item) => {
    if ('paragraph' in item) {
      const richText = item.paragraph.rich_text[0];
      if (richText) {
        return richText.plain_text;
      }
    }
  });

  safeWriteFileSync(yarg.path, '');

  texts.forEach((item) => {
    if (item) safeAppendFileSync(yarg.path, item, { newline: true });
  });

  console.log('sucess!');
};
