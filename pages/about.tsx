import React from 'react';
import { Title, Text, Container, Grid, Link, Card } from '../components';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import path from 'path';
import fs from 'fs';
import matter, { GrayMatterFile } from 'gray-matter';
import glob from 'fast-glob';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import {
  SiGo,
  SiKubernetes,
  SiElixir,
  SiPostgresql,
  SiTypescript,
  SiAmazonaws,
  SiGooglecloud,
  SiTerraform,
  SiReact,
  SiNextDotJs,
  SiPython,
  SiGraphql,
} from 'react-icons/si';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

interface Experience extends GrayMatterFile<string> {
  source: MDXRemoteSerializeResult;
}

interface AboutProps {
  experiences: Experience[];
}

const About: React.FC<AboutProps> = ({ experiences }) => {
  const [selected, setSelected] = React.useState(0);
  const { data, source } = experiences[selected];

  const stacks = React.useMemo(
    () => [
      {
        Icon: SiGo,
        url: 'https://golang.org/',
      },
      {
        Icon: SiKubernetes,
        url: 'https://kubernetes.io/',
      },
      {
        Icon: SiTypescript,
        url: 'https://www.typescriptlang.org/',
      },
      {
        Icon: SiReact,
        url: 'https://reactjs.org/',
      },
      {
        Icon: SiGraphql,
        url: 'https://graphql.org/',
      },
      {
        Icon: SiAmazonaws,
        url: 'https://aws.amazon.com/',
      },
      {
        Icon: SiNextDotJs,
        url: 'https://nextjs.org/',
      },
      {
        Icon: SiElixir,
        url: 'https://elixir-lang.org/',
      },
      {
        Icon: SiGooglecloud,
        url: 'https://cloud.google.com/',
      },
      {
        Icon: SiTerraform,
        url: 'https://www.terraform.io/',
      },
      {
        Icon: SiPostgresql,
        url: 'https://www.postgresql.org/',
      },
      {
        Icon: SiPython,
        url: 'https://www.python.org/',
      },
    ],
    [],
  );

  return (
    <Container gridGap="">
      <Head>
        <title>About</title>
      </Head>
      <Container alignContent="center" alignItems="center">
        <Title fontSize={['48px', '74px']}>From student to CTO</Title>
        <Container maxWidth={['100%', '60rem']}>
          <Text>
            I'm passionated by computers since I'm young. I always helped my
            family and friends to understand how stuff works.
            <br />
            <br />
            During my high school years I discovered the world of cybersecurity.
            I was writing malware for MacOS and Linux, created phishing pages,
            fake hotspots, bruteforcing wifi networks, accessing cameras in my
            town and playing with my jailbroken iPhone kernel.
          </Text>
        </Container>
      </Container>

      <Container
        paddingY="4rem"
        gridGap="2rem"
        alignContent="center"
        alignItems="center"
        textAlign="center"
        width="100%"
      >
        <Title fontSize="40px">Technologies I frequently use</Title>
        <Grid
          gridTemplateColumns={['repeat(3 , 1fr)', 'repeat(6 , 1fr)']}
          gridGap="1rem"
          justifyItems="center"
          maxWidth="40rem"
        >
          {stacks.map(({ Icon, url }, i) => (
            <Link href={url} key={url}>
              <Card key={i}>
                <Icon size="2rem" />
              </Card>
            </Link>
          ))}
        </Grid>
      </Container>

      <Container
        alignContent="center"
        alignItems="center"
        textAlign="center"
        width="100%"
      >
        <Title fontSize="40px">Work Experiences</Title>
        <Grid
          justifyItems={['center', 'flex-start']}
          alignItems="flex-start"
          gridTemplateColumns={['1fr', '1fr 50rem']}
          gridGap="60x"
          paddingY="4rem"
          maxWidth={['100%', '80rem']}
          width="100%"
        >
          <Container
            height="100%"
            alignItems="stretch"
            flexDirection="column"
            gridGap="12px"
            width="100%"
          >
            {experiences.map(({ data }, i) => (
              <Card
                key={i}
                selected={i == selected}
                onClick={() => setSelected(i)}
                gridTemplateColumns="1fr 3fr"
                gridGap="15px"
              >
                <Image
                  src={`/logos/${data.slug}.png`}
                  alt={data.slug}
                  width="40px"
                  height="40px"
                  objectFit="contain"
                  className={styles.image}
                />
                <Grid
                  justifyItems="left"
                  gridGap="1px"
                  gridTemplateColumns="100%"
                >
                  <b>
                    {data.title} / {data.date}
                  </b>
                  <Container
                    width="100%"
                    alignItems="flex-start"
                    justifyContent="space-between"
                  >
                    <small>{data.post}</small>
                    <Container
                      flexDirection="row"
                      justifyContent="flex-start"
                      width="100%"
                    >
                      <a href={`/about/${data.slug}`}>
                        <Text
                          margin={['0']}
                          fontSize=".75rem"
                          fontWeight="bold"
                          display={['block', 'none']}
                        >
                          READ MORE ➔
                        </Text>
                      </a>
                    </Container>
                  </Container>
                </Grid>
              </Card>
            ))}
          </Container>
          <Container
            display={['none', 'block']}
            alignItems="flex-start"
            paddingBottom="3rem"
            height="100%"
            width="100%"
          >
            <Container alignItems="center" width="100%">
              <Title fontSize="2rem">
                {data.post}
                {' @ '}
                <Link textDecoration="underline" href={data.url}>
                  {data.title}
                </Link>
              </Title>
            </Container>
            <Container maxWidth="100%" textAlign="justify">
              <MDXRemote {...source} />
            </Container>
          </Container>
        </Grid>
      </Container>
    </Container>
  );
};

const baseDir = path.join(process.cwd(), './posts/experiences/');
const contentGlob = path.join(baseDir, '/*.mdx');

export const getStaticProps: GetStaticProps = async () => {
  const files = glob.sync(contentGlob);
  const experiences = (
    await Promise.all(
      files.map(async (file) => {
        const basename = path.basename(file);
        const slug = basename.replace('.mdx', '');
        const raw = fs.readFileSync(file, 'utf8');
        const { data, content } = matter(raw);

        data.slug = slug;
        const source = await serialize(content, {
          scope: data,
        });

        return { data, content: content.trim(), source };
      }),
    )
  ).sort((first, second) => {
    return second.data.date
      .toString()
      .localeCompare(first.data.date.toString());
  });

  return {
    props: {
      experiences,
    },
  };
};

export default About;
