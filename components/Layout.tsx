import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import styles from '../styles/Home.module.css';
import Malt from '../icons/Malt';
import Grid from './Grid';
import Link from './Link';

import { SiGithub, SiTwitter, SiLinkedin } from 'react-icons/si';
import { MdMail } from 'react-icons/md';
import Button from './Button';
import Text from './Text';
import Container from './Container';
import Instagram from '../icons/Instagram';

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
};

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  padding: 60px 20px 100px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 30px;
  margin-bottom: 30px;
  margin-top: 20px;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-box-pack: center;
`;

const Nav = styled.nav`
  height: 15vh;
  display: flex;
  position: static;
  top: 0;
  left: 0;
  right: 0;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 4vw;
  background: white;
  z-index: 1;

  @media (max-width: 768px) {
    position: sticky;
    height: 10vh;
    background: white;
    justify-content: center;
  }
`;

const Layout: React.FC<LayoutProps> = ({
  title = 'Antoine Ordonez',
  children,
}) => {
  const router = useRouter();

  const links = React.useMemo(
    () => [
      {
        url: 'https://github.com/shellbear',
        icon: SiGithub,
      },
      {
        url: 'https://twitter.com/_shellbear',
        icon: SiTwitter,
      },
      {
        url: 'mailto:hello@shellbear.me',
        icon: MdMail,
      },
      {
        url: 'https://malt.fr/profile/antoineordonez',
        icon: Malt,
      },
      {
        url: 'https://linkedin.com/in/antoine-ordonez',
        icon: SiLinkedin,
      },
      {
        url: 'https://instagram.com/croissant2france',
        icon: Instagram,
      },
    ],
    [],
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="author" content="Antoine Ordonez" />
        <meta name="keywords" content="HTML, CSS, JavaScript" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Nav>
        <Link
          href="/"
          fontSize="smaller"
          fontWeight="normal"
          className="desktop"
          isSelected={router.pathname === '/'}
        >
          <span className="desktop">
            Antoine
            <b>Ordonez</b>
          </span>
        </Link>
        <Grid
          gridGap={['2rem', '40px']}
          gridTemplateColumns={['repeat(3, 1fr)', 'repeat(4, auto)']}
          justifyItems="center"
        >
          <Link
            href="/"
            fontSize={['1rem', '12px']}
            className="mobile"
            isSelected={router.pathname === '/'}
          >
            <b>AO</b>
          </Link>
          <Link
            textTransform="uppercase"
            fontSize={['1rem', '12px']}
            fontWeight="bold"
            opacity={0.7}
            href="/about"
            isSelected={router.pathname === '/about'}
          >
            About
          </Link>
          <Link
            textTransform="uppercase"
            fontWeight="bold"
            fontSize={['1rem', '12px']}
            opacity={0.7}
            href="/projects"
            isSelected={router.pathname === '/projects'}
          >
            Projects
          </Link>
          <Link
            textTransform="uppercase"
            href="mailto:hello@shellbear.me"
            className="desktop"
          >
            <Button padding="10px 12px" variant="secondary">
              hello@shellbear.me
            </Button>
          </Link>
        </Grid>
      </Nav>
      <Container justifyContent="space-between" alignContent="space-between">
        <main className={styles.main}>{children}</main>
        <Footer>
          <Container paddingY="25px">
            <Grid gridGap="30px">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/projects">Projects</Link>
              <Link href="mailto:hello@shellbear.me">Contact</Link>
            </Grid>
          </Container>
          <FooterGrid>
            {links.map(({ url, icon: Icon }) => (
              <Link key={url} target="_blank" opacity={0.7} href={url}>
                <Icon size={22} />
              </Link>
            ))}
          </FooterGrid>
          <Text margin={0} fontSize="0.9rem" color="rgba(0, 0, 0, 0.7)">
            @ {new Date().getFullYear()} Antoine Ordonez
          </Text>
        </Footer>
      </Container>
    </div>
  );
};

export default Layout;
