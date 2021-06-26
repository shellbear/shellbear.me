import { useRouter } from 'next/router';
import React from 'react';
import Grid from './Grid';
import TransparentLink from './TransparentLink';
import Container from './Container';

const states: { [key: string]: React.CSSProperties } = {
  '/': {
    left: '6px',
    width: '60px',
  },
  '/about': {
    left: '81px',
    width: '60px',
  },
  '/blog': {
    left: '157px',
    width: '50px',
  },
  '/projects': {
    left: '224px',
    width: '72px',
  },
};

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
    <Container as="nav" alignContent="center" margin="3rem">
      <Grid
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
        <TransparentLink href="/" style={{ zIndex: 1 }}>
          Home
        </TransparentLink>
        <TransparentLink href="/about" style={{ zIndex: 1 }}>
          About
        </TransparentLink>
        <TransparentLink href="/blog" style={{ zIndex: 1 }}>
          Blog
        </TransparentLink>
        <TransparentLink href="/projects" style={{ zIndex: 1 }}>
          Projects
        </TransparentLink>
      </Grid>
    </Container>
  );
};

export default Nav;
