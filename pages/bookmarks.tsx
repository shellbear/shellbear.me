import React from 'react';
import Head from 'next/head';
import { GetStaticPropsResult } from 'next';
import Image from 'next/image';
import TimeAgo from 'javascript-time-ago';

import { Title, Container, Text, Grid, Link, Card } from '@components';

import en from 'javascript-time-ago/locale/en.json';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

export interface Bookmark {
  fields: Fields;
  id: string;
  created: number;
  last_edited: number;
}

export interface Fields {
  URL: string;
  Name: string;
}

interface BookmarksProps {
  bookmarks: Bookmark[];
}

const Bookmarks = ({ bookmarks }: BookmarksProps): JSX.Element => (
  <Container marginBottom="5rem">
    <Head>
      <title>Bookmarks</title>
    </Head>
    <Container alignItems="center" mb="3rem">
      <Title>Bookmarks</Title>
      <Text textAlign="center">
        Some interesting, useful and random stuff I want to read later.
      </Text>
    </Container>
    <Grid
      alignItems="baseline"
      gridTemplateColumns={['1fr 1fr', 'repeat(3, 1fr)']}
      gridGap={['1rem', '2rem']}
    >
      {bookmarks.map(({ id, fields, last_edited }) => (
        <Link
          target="_blank"
          rel="noreferrer noopener"
          key={id}
          href={fields.URL}
        >
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
                    fields.URL,
                  )}`}
                  alt={fields.Name}
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
                  {fields.Name}
                </Title>
                <Text
                  margin={0}
                  fontWeight="initial"
                  fontSize={['.6rem', '.9rem']}
                >
                  {timeAgo.format(new Date(last_edited))}
                </Text>
              </Container>
            </Grid>
          </Card>
        </Link>
      ))}
    </Grid>
  </Container>
);

const BOOKMARKS_URL =
  'https://potion-api.vercel.app/table?id=08ce7891a1824de8bac2ae8c77026383';

export const getServerSideProps = async (): Promise<
  GetStaticPropsResult<BookmarksProps>
> => {
  const result = await fetch(BOOKMARKS_URL);
  const bookmarks = await result.json();

  return {
    props: {
      bookmarks,
    },
  };
};

export default Bookmarks;
