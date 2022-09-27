import React from 'react';
import Head from 'next/head';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import TimeAgo from 'javascript-time-ago';
import { Title, Container, Text, Grid, Link, Card } from '@components';

import en from 'javascript-time-ago/locale/en.json';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { getBookmarks } from '../notion';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

const Bookmarks = ({
  bookmarks,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => (
  <Container marginBottom="5rem">
    <Head>
      <title>Bookmarks</title>
      <link rel="preconnect" href="https://rdl.ink" />
    </Head>
    <Container alignItems="center" mb="3rem">
      <Title>Bookmarks</Title>
      <Text textAlign="center">
        Some interesting, useful and random stuff I want to read later.
      </Text>
    </Container>
    <Grid
      alignItems="baseline"
      gridTemplateColumns={['repeat(2, minmax(0, 1fr))', 'repeat(3, 1fr)']}
      gridGap={['1rem', '2rem']}
    >
      {bookmarks.map(({ id, name, created, url }) => (
        <Link target="_blank" rel="noreferrer noopener" key={id} href={url}>
          <Card padding={0} margin={0} borderRadius="5px" display="block">
            <Grid
              gridTemplateColumns="1fr"
              justifyItems={['center', 'flex-start']}
              gridGap={['.2rem', '1rem']}
            >
              <Container width="100%" height="150px" position="relative">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={`https://rdl.ink/render/${encodeURIComponent(
                    url,
                  )}?width=400&height=150&mode=crop&format=avif`}
                  alt={name}
                />
              </Container>
              <Container
                width="100%"
                py=".5rem"
                px={['.3rem', '1rem']}
                gridGap={['.2rem', '.5rem']}
                alignItems="flex-start"
              >
                <Title
                  as="h2"
                  fontSize={['0.8rem', '1.2rem']}
                  textAlign="left"
                  margin={0}
                >
                  {name}
                </Title>
                <Text
                  margin={0}
                  fontWeight="initial"
                  fontSize={['.6rem', '.9rem']}
                >
                  {timeAgo.format(new Date(created))}
                </Text>
              </Container>
            </Grid>
          </Card>
        </Link>
      ))}
    </Grid>
  </Container>
);

export interface Bookmark {
  id: string;
  created: string;
  name: string;
  url: string;
}

const formatBookmarks = ({
  results,
}: QueryDatabaseResponse): ReadonlyArray<Bookmark> =>
  results.reduce<Array<Bookmark>>((acc, result) => {
    if (
      result.object === 'page' &&
      'url' in result &&
      result.properties?.Created?.type === 'created_time' &&
      result.properties?.URL?.type == 'url' &&
      result.properties.URL.url &&
      result.properties?.Name?.type == 'title' &&
      result.properties.Name.title?.[0]?.type === 'text'
    ) {
      return [
        ...acc,
        {
          id: result.id,
          url: result.properties.URL.url,
          created: result.properties.Created.created_time,
          name: result.properties.Name.title[0].plain_text,
        },
      ];
    }

    return acc;
  }, []);

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const bookmarks = await getBookmarks();

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=60',
  );

  return {
    props: {
      bookmarks: formatBookmarks(bookmarks),
    },
  };
};

export default Bookmarks;
