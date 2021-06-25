import { GetStaticPropsResult, NextPage } from 'next';
import { NotionAPI } from 'notion-client';
import { Container, Grid, Card, Image, Text } from '../../components';
import Head from 'next/head';
import { getPageFromPage, PageInfo, POSTS } from '../../posts/notion';
import Title from '../../components/Title';
import Link from '../../components/Link';

export interface Page extends PageInfo {
  uri: string;
}

interface BlogProps {
  pages: Page[];
}

const Blog: NextPage<BlogProps> = ({ pages }) => {
  return (
    <Container maxWidth={1200}>
      <Head>
        <title>Blog</title>
      </Head>
      <Container mb="3rem">
        <Title>Blog</Title>
        <Text textAlign="center">
          I like writing some stuff about tech and code. Check it out.
        </Text>
      </Container>
      <Grid gridTemplateColumns={['1fr', '1fr 1fr']} gridGap="2rem">
        {pages.map(({ title, uri, cover }, i) => (
          <Link key={i} href={uri}>
            <Card>
              <Grid
                gridTemplateColumns={['1fr', '1fr 3fr']}
                justifyItems={['center', 'flex-start']}
              >
                {cover && (
                  <Image src={cover} width="200px" height="auto" alt={title} />
                )}
                <Title as="h3" fontSize="1.5rem" textAlign={['center', 'left']}>
                  {title}
                </Title>
              </Grid>
            </Card>
          </Link>
        ))}
      </Grid>
    </Container>
  );
};

const notion = new NotionAPI();

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<BlogProps>
> => {
  const pages: Page[] = [];
  await Promise.all(
    Object.keys(POSTS).map(async (key) => {
      const page = await notion.getPage(POSTS[key as keyof typeof POSTS]);
      if (page) {
        const info = getPageFromPage(page);
        if (info.title !== 'Blog') {
          pages.push({
            ...info,
            uri: `/blog/${key}`,
          });
        }
      }
    }),
  );

  return {
    props: {
      pages: pages,
    },
  };
};

export default Blog;
