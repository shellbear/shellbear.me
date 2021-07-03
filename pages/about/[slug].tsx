import { GetStaticPaths, GetStaticPropsResult, NextPage } from 'next';
import { NotionRenderer, NotionRendererProps, Code } from 'react-notion-x';
import { NotionAPI } from 'notion-client';
import { getPageInfo, Page, EXPERIENCES } from '../../posts/notion';
import { Container } from '../../components';
import Head from 'next/head';

interface BlogProps {
  page: Page;
  recordMap: NotionRendererProps['recordMap'];
}

const About: NextPage<BlogProps> = ({ page, recordMap }) => (
  <Container
    width={['100%', 1200]}
    maxWidth="100vw"
    marginBottom={['1rem', '4rem']}
  >
    <Head>
      <title>{page.title}</title>
      <meta property="og:title" content={page.title} />
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
    paths: Object.keys(EXPERIENCES).map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};

type Params = {
  params: {
    slug: keyof typeof EXPERIENCES;
  };
};

const notion = new NotionAPI();

export const getStaticProps = async ({
  params: { slug },
}: Params): Promise<GetStaticPropsResult<BlogProps>> => {
  const { uri, date } = EXPERIENCES[slug];
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

export default About;
