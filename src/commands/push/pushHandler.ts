import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import { YargsArgs } from '@/types/builder';
import { getConfig } from '@/utils';

const result = dotenv.config().parsed;

export const pushHandler = async (yarg: YargsArgs) => {
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
          rich_text: {
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

  if (res.results[0]) {
    await notion.pages.update({
      page_id: res.results[0].id,
      archived: true
    });
  }

  const newPageProperties = {
    projectName: {
      title: [
        {
          text: {
            content: yarg.repoName
          }
        }
      ]
    },
    filename: {
      rich_text: [
        {
          text: {
            content: filename
          }
        }
      ]
    }
  };

  const data = Object.keys(result || {})
    .map((key) => `${key}=${result?.[key]}`)
    .join('\n');

  const newPageContent = [
    {
      paragraph: {
        rich_text: [
          {
            text: {
              content: data
            }
          }
        ]
      }
    }
  ];

  await notion.pages.create({
    parent: {
      database_id: config.secret_id
    },
    properties: newPageProperties,
    children: newPageContent
  });

  console.log('sucess!');
};
