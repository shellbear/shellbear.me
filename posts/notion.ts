import { ExtendedRecordMap } from 'notion-types';
import { getPageTitle } from 'notion-utils';

export const POSTS = {
  'go-graphql-api': {
    date: new Date('2021-06-25').toDateString(),
    uri: 'shblog/Production-ready-API-with-Go-and-GraphQL-4ebc1ab551e447c2ac14261a61da6032',
  },
  'go-dokku-deployment': {
    date: new Date('2021-06-28').toDateString(),
    uri: 'shblog/Deploying-a-Go-App-with-Dokku-c504be4c35b34d20918a5cf23c0c5588',
  },
  'styled-system': {
    date: new Date('2021-07-06').toDateString(),
    uri: 'shblog/Rapid-UI-development-with-styled-system-e1ce2f8a2e64485491b49e4e3a6a8f96',
  },
};

export const EXPERIENCES = {
  shareview: {
    date: '2020 - Now',
    uri: 'shblog/Shareview-CTO-b3f7d62a744d4cb7bd271d25f4790ece',
  },
  dispatcher: {
    date: '2020',
    uri: 'shblog/Dispatcher-Go-Backend-developer-fa13680ef8324bacb31b773a5f08c3ad',
  },
  tresorio: {
    date: '2019 - 2020',
    uri: 'shblog/Tresorio-12516126ddb84eb6abc72656731e1f26',
  },
  epitech: {
    date: '2018',
    uri: 'shblog/Epitech-Teaching-assistant-b8ee49774bd5423ba00a6921c026c1c6',
  },
  bilberry: {
    date: '2018 - 2020',
    uri: 'shblog/Bilberry-28dc7324b3e24fd6a4475a63c2ac0410',
  },
};

export interface PageInfo {
  title: string;
  cover?: string;
  coverPosition?: number;
}

export interface Page extends PageInfo {
  uri: string;
  date: string;
}

export const getPageInfo = (page: ExtendedRecordMap): PageInfo => {
  const info: PageInfo = {
    title: getPageTitle(page),
  };

  const block = Object.values(page.block)[0].value;
  if (block.type === 'page' && block.format?.page_cover) {
    info.coverPosition = block.format.page_cover_position;
    info.cover =
      'https://www.notion.so/image/' +
      encodeURIComponent(block.format.page_cover) +
      '?table=block&id=' +
      block.id;
  }

  return info;
};
