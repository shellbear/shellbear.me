import { useRouter } from 'next/router';
import React from 'react';
import Grid from './Grid';
import Container from './Container';
import styled from 'styled-components';

const states: { [key: string]: React.CSSProperties } = {
  '/': {
    left: '6px',
    width: '61px',
  },
  '/about': {
    left: '81px',
    width: '65px',
  },
  '/blog': {
    left: '157px',
    width: '55px',
  },
  '/projects': {
    left: '224px',
    width: '79px',
  },
};

const NavLink = styled.a`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  border-bottom: none;
  margin: 0;
  padding: 0;
  z-index: 1;
  font-weight: 500;
  transition: opacity 0.3s ease 0s;

  &:hover {
    opacity: 0.5;
  }
`;

const Nav = (): JSX.Element => {
  const router = useRouter();
  let navStyle = states['/'];

  if (router.asPath !== '/') {
    for (const path of Object.keys(states).slice(1)) {
      if (router.asPath.startsWith(path)) {
        navStyle = states[path];
        break;
      }
    }
  }

  return (
    <Grid
      as="nav"
      alignContent="center"
      justifyContent="space-between"
      my="3rem"
      gridTemplateColumns={['1fr', '1fr', '1fr 1fr 1fr']}
    >
      <Container display={['none', 'none', 'flex']}>
        <NavLink href="/">Antoine Ordonez</NavLink>
      </Container>
      <Container alignContent="center">
        <Grid
          width="fit-content"
          gridGap="2rem"
          alignItems="center"
          justifyItems="center"
          gridTemplateColumns="repeat(4, auto)"
          style={{
            borderRadius: '25px',
            background: 'rgba(0, 0, 0, 0.04)',
            padding: '15px',
            position: 'relative',
          }}
        >
          <div
            style={{
              background: 'white',
              position: 'absolute',
              borderRadius: '25px',
              height: '85%',
              left: '6px',
              width: '60px',
              ...navStyle,
            }}
          />
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/projects">Projects</NavLink>
        </Grid>
      </Container>
      <Container alignContent="flex-end" display={['none', 'none', 'flex']}>
        <NavLink href="mailto:hello@shellbear.me">Contact</NavLink>
      </Container>
    </Grid>
  );
};

export default Nav;
