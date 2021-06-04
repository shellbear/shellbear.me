import React from 'react';
import glob from 'fast-glob';
import { Container, Title, Text, Grid } from '../../components';
import { join } from 'path';
import { NextPage, GetStaticPaths, GetStaticPropsResult } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { GrayMatterFile } from 'gray-matter';
import Head from 'next/head';
import TransparentLink from '../../components/TransparentLink';
import { getPosts, Post } from '../../posts';

interface AboutProps {
  data: GrayMatterFile<string>['data'];
  source: MDXRemoteSerializeResult;
  experiences: Post[];
}

const About: NextPage<AboutProps> = ({ experiences, data, source }) => (
  <Container maxWidth={1200}>
    <Container
      alignItems="center"
      justifyContent="center"
      alignContent="center"
    >
      <Head>
        <title>{data.title}</title>
      </Head>
      <Grid gridTemplateColumns="1fr" justifyItems="center">
        <img alt="logo" src={data.preview} width="100rem" height="auto" />
        <Title fontSize="2rem" marginTop="2rem">
          {data.post} @ {data.title}
        </Title>
        <Text margin={0}>{data.date}</Text>
      </Grid>
    </Container>
    <MDXRemote {...source} />
    <Container
      alignContent="center"
      textAlign="center"
      borderBottom="1px solid rgba(0,0,0,0.1)"
      padding="40px 0"
    >
      <Text fontSize="16px" lineHeight="35px">
        <a href={data.url}>website</a>
      </Text>
    </Container>
    <Container width="100%" alignContent="center">
      <Container
        width="100%"
        marginTop="4rem"
        gridGap="2rem"
        maxWidth={['100%', '800px']}
      >
        <Title fontSize="2rem" as="h3">
          Other experiences
        </Title>
        <Container width="100%">
          {experiences.map(({ data }, i) => (
            <TransparentLink href={`/about/${data.slug}`}>
              <Grid
                key={i}
                gridTemplateColumns="1fr 4fr"
                justifyItems="flex-start"
                gridGap="1rem"
                paddingY="2rem"
                borderBottom="1px solid rgba(0,0,0,0.1)"
              >
                <Container width="100%">
                  <Text>0{experiences.length - i}</Text>
                </Container>
                <Grid width="100%" gridTemplateColumns="4fr 1fr">
                  <Container
                    width="100%"
                    alignItems="flex-start"
                    textAlign="start"
                  >
                    <Grid
                      width="100%"
                      gridTemplateColumns="repeat(2, auto)"
                      justifyItems="flex-start"
                      justifyContent="flex-start"
                      gridGap="1rem"
                    >
                      <Title fontSize="1.5rem" margin={0} as="h3">
                        {data.title}
                      </Title>
                      <Text
                        fontSize="smaller"
                        margin={0}
                        color="rgba(0, 0, 0, 0.1)"
                      >
                        {data.date}
                      </Text>
                    </Grid>
                    <Text fontSize="1rem">{data.caption}</Text>
                  </Container>
                  <Text fontSize="1.5rem">&rarr;</Text>
                </Grid>
              </Grid>
            </TransparentLink>
          ))}
        </Container>
      </Container>
    </Container>
  </Container>
);

type Params = {
  params: {
    slug: string;
  };
};

const baseDir = join(process.cwd(), './posts/experiences/');
const contentGlob = join(baseDir, '/*.mdx');

export const getStaticPaths: GetStaticPaths = async () => {
  const files = glob.sync(contentGlob);
  const paths = files.map((file) => {
    const split = file.split('/');
    const filename = split[split.length - 1];
    const slug = filename.replace('.mdx', '');

    return {
      params: {
        slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { slug },
}: Params): Promise<GetStaticPropsResult<AboutProps>> => {
  const experiences = await getPosts('experiences');
  const index = experiences.findIndex(({ data }) => data.slug === slug);
  const { data, source } = experiences[index];

  return {
    props: {
      experiences: experiences.sort((a, b) =>
        b.data.date.toString().localeCompare(a.data.date.toString()),
      ),
      data,
      source,
    },
  };
};

export default About;
