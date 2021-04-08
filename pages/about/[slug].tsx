import React from 'react';
import glob from 'fast-glob';
import fs from 'fs';
import { Container, Title, Text } from '../../components';
import { join } from 'path';
import { NextPage, GetStaticPaths, GetStaticPropsResult } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import matter, { GrayMatterFile } from 'gray-matter';

interface AboutProps {
  data: GrayMatterFile<string>['data'];
  source: MDXRemoteSerializeResult;
}

const About: NextPage<AboutProps> = ({ data, source }) => (
  <Container maxWidth={900}>
    <Container
      alignItems="center"
      justifyContent="center"
      alignContent="center"
    >
      <Title>
        {data.post} @ {data.title}
      </Title>
      <Text>{data.date}</Text>
    </Container>
    <MDXRemote {...source} />
  </Container>
);

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

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticProps = async ({
  params: { slug },
}: Params): Promise<GetStaticPropsResult<AboutProps>> => {
  const path = join(baseDir, `${slug}.mdx`);
  const raw = fs.readFileSync(path, 'utf8');

  const { data, content } = matter(raw);
  const source = await serialize(content, {
    scope: data,
  });

  return {
    props: {
      data,
      source,
    },
  };
};

export default About;
