import { GetStaticPropsResult, NextPage } from 'next';
import { NotionAPI } from 'notion-client';
import { Container, Grid, Card, Image, Text } from '../../components';
import Head from 'next/head';
import { getPageInfo, Page, POSTS } from '../../posts/notion';
import Title from '../../components/Title';
import Link from '../../components/Link';
import styled from 'styled-components';

interface BlogProps {
  pages: Page[];
}

const BlogImage = styled(Image)`
  border-radius: 5px;
`;

const Blog: NextPage<BlogProps> = ({ pages }) => {
  return (
    <Container maxWidth={1200}>
      <Head>
        <title>Blog - Antoine Ordonez</title>
        <meta property="og:title" content="Blog – Antoine Ordonez" />
      </Head>
      <Container mb="3rem">
        <Title>Blog</Title>
        <Text textAlign="center">
          Posts about code, projects and various other things. <br />
          An RSS feed is available at this{' '}
          <a target="_blank" href="/blog/feed.xml">
            link
          </a>
          .
        </Text>
      </Container>
      <Grid gridTemplateColumns={['1fr', '1fr 1fr']} gridGap="2rem">
        {pages.map(({ title, uri, date, cover }, i) => (
          <Link key={i} href={uri}>
            <Card>
              <Grid
                gridTemplateColumns={'1fr'}
                justifyItems={['center', 'flex-start']}
                gridGap="1rem"
              >
                {cover && (
                  <BlogImage
                    src={cover}
                    width="100%"
                    height="auto"
                    alt={title}
                  />
                )}
                <Container gridGap=".5rem">
                  <Title
                    as="h2"
                    fontSize="1.5rem"
                    textAlign={['center', 'left']}
                    margin={0}
                  >
                    {title}
                  </Title>
                  <Text margin={0} fontWeight="initial" fontSize=".9rem">
                    {date}
                  </Text>
                </Container>
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
      const { uri, date } = POSTS[key as keyof typeof POSTS];
      const page = await notion.getPage(uri);
      if (page) {
        const info = getPageInfo(page);
        if (info.title !== 'Blog') {
          pages.push({
            ...info,
            date,
            uri: `/blog/${key}`,
          });
        }
      }
    }),
  );

  return {
    props: {
      pages: pages.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    },
  };
};

export default Blog;
