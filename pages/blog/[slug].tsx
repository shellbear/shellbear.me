import { GetStaticPaths, GetStaticPropsResult, NextPage } from 'next';
import { NotionRenderer, NotionRendererProps, Code } from 'react-notion-x';
import { NotionAPI } from 'notion-client';
import { getPageFromPage, PageInfo, POSTS } from '../../posts/notion';
import { Container } from '../../components';
import Head from 'next/head';

interface BlogProps {
  page: PageInfo;
  recordMap: NotionRendererProps['recordMap'];
}

const Blog: NextPage<BlogProps> = ({ page, recordMap }) => (
  <Container width={['100%', 1200]} maxWidth="100vw">
    <Head>
      <title>{page.title}</title>
    </Head>
    <NotionRenderer
      fullPage
      className="notion-container"
      recordMap={recordMap}
      components={{
        code: Code,
      }}
    />
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
  const recordMap = await notion.getPage(POSTS[slug]);
  const page = getPageFromPage(recordMap);

  return {
    props: {
      page,
      recordMap,
    },
  };
};

export default Blog;
