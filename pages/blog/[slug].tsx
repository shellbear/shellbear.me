import Head from 'next/head';
import dynamic from 'next/dynamic';
import { GetStaticPaths, GetStaticPropsResult, NextPage } from 'next';
import { NotionRenderer } from 'react-notion-x';
import { NotionAPI } from 'notion-client';

import { getPageInfo, Page, POSTS } from '@posts/notion';
import { Container, Text } from '@components';
import { ComponentProps } from 'react';

const Code = dynamic(
  async () => (await import('react-notion-x/build/third-party/code')).Code,
);

interface BlogProps {
  page: Page;
  recordMap: ComponentProps<typeof NotionRenderer>['recordMap'];
}

const Blog: NextPage<BlogProps> = ({ page, recordMap }) => (
  <Container width={['100%', 1200]} maxWidth="100vw">
    <Head>
      <title>{page.title}</title>
      <meta property="og:title" content={page.title} />
    </Head>
    <NotionRenderer
      fullPage
      className="notion-container"
      recordMap={recordMap}
      components={{
        Code,
      }}
    />
    <Container textAlign="center" gridGap=".4rem" my="3rem">
      <Text margin={0}>Antoine Ordonez</Text>
      <small>{page.date}</small>
    </Container>
  </Container>
);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(POSTS).map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};

type Params = {
  params: {
    slug: keyof typeof POSTS;
  };
};

const notion = new NotionAPI();

export const getStaticProps = async ({
  params: { slug },
}: Params): Promise<GetStaticPropsResult<BlogProps>> => {
  const { uri, date } = POSTS[slug];
  const recordMap = await notion.getPage(uri);
  const pageInfo = getPageInfo(recordMap);
  const page: Page = {
    ...pageInfo,
    uri,
    date,
  };

  return {
    props: {
      page,
      recordMap,
    },
  };
};

export default Blog;
