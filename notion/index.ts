import { Client } from '@notionhq/client';
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getBookmarks = async () => {
  return await notion.databases.query({
    database_id: process.env.NOTION_BOOKMARKS_ID!,
    page_size: 10000,
    sorts: [
      {
        property: 'Created',
        direction: 'descending',
      },
    ],
  });
};
