import { ExtendedRecordMap } from 'notion-types/src/maps';
import { getPageTitle } from 'notion-utils';

export const POSTS = {
  'go-graphql-api':
    'shblog/Production-ready-API-with-Go-and-GraphQL-4ebc1ab551e447c2ac14261a61da6032',
};

export interface PageInfo {
  title: string;
  cover?: string;
  coverPosition?: number;
}

export const getPageFromPage = (page: ExtendedRecordMap): PageInfo => {
  const info: PageInfo = {
    title: getPageTitle(page),
  };

  const block = Object.values(page.block)[0].value;
  if (block.type === 'page' && block.format.page_cover) {
    info.coverPosition = block.format.page_cover_position;
    info.cover =
      'https://www.notion.so/image/' +
      encodeURIComponent(block.format.page_cover) +
      '?table=block&id=' +
      block.id;
  }

  return info;
};
