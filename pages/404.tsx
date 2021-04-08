import React from 'react';
import { Container, Title, Text } from '../components';

const NotFound: React.FC = () => (
  <Container alignItems="center">
    <Title>404 - Not found</Title>
    <Text>The page does not exist.</Text>
  </Container>
);

export default NotFound;
