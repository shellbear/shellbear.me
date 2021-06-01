import React from 'react';
import Head from 'next/head';
import { Title, Container, Text } from '../components';
import { GetStaticProps } from 'next';

import { getPosts, Post } from '../posts';
import Card from '../components/Card';
import Button from '../components/Button';
import Grid from '../components/Grid';
import Link from '../components/Link';
import Tag from '../components/Tag';
import List from '../components/List';

interface ProjectProps {
  projects: Post[];
}

const Projects: React.FC<ProjectProps> = ({ projects }) => (
  <Container marginBottom="5rem">
    <Head>
      <title>Projects</title>
    </Head>
    <Title>Projects</Title>
    <Grid
      maxWidth={['100%', 1200]}
      gridGap="4rem"
      gridTemplateColumns={['1fr', 'repeat(2, 1fr)']}
      paddingTop="4rem"
      alignItems="flex-start"
    >
      <Container flexDirection="column" alignItems="flex-start" width="100%">
        <Container flexDirection="row" alignItems="center" gridGap="1rem">
          <Title fontSize="2.5rem">{projects[0].data.title}</Title>
          <Tag>Featured</Tag>
        </Container>
        <Container paddingY="1rem" gridGap="1rem">
          <Text textAlign="start" margin={0}>
            {projects[0].data.caption}
          </Text>
          <List marginY="1rem">
            {projects[0].data.tags.map((tag: string) => (
              <li key={tag}>{tag}</li>
            ))}
          </List>
        </Container>
        <Link href={projects[0].data.url}>
          <Button>View project</Button>
        </Link>
      </Container>
      <Grid gridTemplateColumns="1fr" width="100%">
        {projects.slice(1).map(({ data }) => (
          <Card key={data.url} width="100%" selected>
            <Container
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              gridGap="2rem"
            >
              <Container
                flexDirection="row"
                justifyContent="space-between"
                width="100%"
              >
                <Title fontSize="2rem">{data.title}</Title>
                <Link href={data.url}>
                  <Button variant="secondary">View Project</Button>
                </Link>
              </Container>
              <Container gridGap="1rem">
                <Text textAlign="start" margin={0}>
                  {data.caption}
                </Text>
                <List marginY="1rem">
                  {projects[0].data.tags.map((tag: string) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </List>
              </Container>
            </Container>
          </Card>
        ))}
      </Grid>
    </Grid>
  </Container>
);

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getPosts('projects');

  return {
    props: {
      projects,
    },
  };
};

export default Projects;
