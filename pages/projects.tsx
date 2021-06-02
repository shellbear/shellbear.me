import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Title, Container, Text } from '../components';
import { GetStaticProps } from 'next';

import { getPosts, Post } from '../posts';
import Button from '../components/Button';
import Grid from '../components/Grid';
import Link from '../components/Link';
import List from '../components/List';

interface ProjectProps {
  projects: Post[];
}

const ProjectImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
  transition: 0.2s ease-in-out 0s;

  :hover {
    transform: scale(1.02);
  }
`;

const ProjectContainer = styled(Container)`
  :hover > * img {
    transform: scale(1.03);
  }
`;

const ProjectTag = styled.li`
  color: rgb(105, 105, 105);
  font-size: 13px;
  letter-spacing: 0.03em;
`;

const Projects: React.FC<ProjectProps> = ({ projects }) => (
  <Container marginBottom="5rem">
    <Head>
      <title>Projects</title>
    </Head>
    <Title>Projects</Title>
    <Grid
      py="4rem"
      gridTemplateColumns={['1fr', 'repeat(2, 1fr)']}
      width="100%"
      gridGap="10%"
    >
      {projects.map(({ data }) => (
        <ProjectContainer
          flexDirection="column"
          alignItems="flex-start"
          width="100%"
          gridGap="1.5rem"
        >
          <Link href={data.url}>
            <ProjectImage src={data.preview} />
          </Link>
          <Container
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Link href={data.url}>
              <Title fontSize="2rem">{data.title}</Title>
            </Link>
            <Link href={data.url}>
              <Button variant="secondary">View Project</Button>
            </Link>
          </Container>
          <Container gridGap="1rem">
            <Text
              textAlign="start"
              margin={0}
              lineHeight="180%"
              letterSpacing="0.02rem"
            >
              {data.caption}
            </Text>
            <List marginY="1rem">
              {data.tags.map((tag: string) => (
                <ProjectTag key={tag}>{tag}</ProjectTag>
              ))}
            </List>
          </Container>
        </ProjectContainer>
      ))}
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
