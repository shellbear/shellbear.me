import React from 'react';
import { Title, Text, Container } from '../components';
import Head from 'next/head';

const Projects: React.FC = () => (
  <Container>
    <Head>
      <title>Projects</title>
    </Head>
    <Title>Projects</Title>
    <Container maxWidth={800} alignItems="center">
      <Text>Coming soon...</Text>
    </Container>
  </Container>
);

export default Projects;
