import React from 'react';
import glob from 'fast-glob';
import { Container, Title, Text, Grid, Card, Image } from '../../components';
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
    <Container alignContent="center">
      <a href={data.url} target="_blank">
        Website
      </a>
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
        <Grid
          gridGap=".5rem"
          justifyItems="center"
          width="100%"
          gridTemplateColumns={[
            'repeat(2, 1fr)',
            `repeat(${experiences.length}, 1fr)`,
          ]}
        >
          {experiences.map((exp, i) => (
            <TransparentLink
              key={i}
              href={`/about/${exp.data.slug}`}
              width="100%"
              height="100%"
            >
              <Card
                width="100%"
                height="100%"
                gridTemplateColumns="auto 100%"
                gridGap="1rem"
              >
                <Image
                  alt="logo"
                  src={exp.data.preview}
                  width="30px"
                  height="auto"
                />
                <Grid gridTemplateColumns="1fr" justifyItems="flex-start">
                  <Title as="h3" fontSize="1rem" margin={0}>
                    {exp.data.title}
                  </Title>
                  <Text fontSize="0.8rem" margin={0}>
                    {exp.data.date}
                  </Text>
                </Grid>
              </Card>
            </TransparentLink>
          ))}
        </Grid>
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
      experiences: [
        ...experiences.slice(0, index),
        ...experiences.slice(index + 1),
      ].sort((a, b) =>
        b.data.date.toString().localeCompare(a.data.date.toString()),
      ),
      data,
      source,
    },
  };
};

export default About;
