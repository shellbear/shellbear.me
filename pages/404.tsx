import React from 'react';
import { Container, Title, Text } from '@components';

const NotFound = (): JSX.Element => (
  <Container alignItems="center">
    <Title>404 - Not found</Title>
    <Text>The page does not exist.</Text>
  </Container>
);

export default NotFound;
