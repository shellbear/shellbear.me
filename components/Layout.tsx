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
import { useViewport } from '../hooks/viewport';

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
  grid-template-columns: repeat(5, 1fr);
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
  const { width } = useViewport();

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
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
        <Grid gridGap={width > 768 ? '40px' : '2rem'}>
          <Link
            href="/"
            fontSize="smaller"
            fontWeight="normal"
            className="mobile"
            isSelected={router.pathname === '/'}
          >
            <b>AO</b>
          </Link>
          <Link
            textTransform="uppercase"
            fontSize={width <= 768 ? '1rem' : '12px'}
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
            fontSize={width <= 768 ? '1rem' : '12px'}
            opacity={0.7}
            href="/projects"
            isSelected={router.pathname === '/projects'}
          >
            Projects
          </Link>
          {width > 768 && (
            <Link textTransform="uppercase" href="mailto:hello@shellbear.me">
              <Button padding="10px 12px" variant="secondary">
                hello@shellbear.me
              </Button>
            </Link>
          )}
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
            <Link opacity={0.7} href="https://github.com/shellbear">
              <SiGithub size={22} />
            </Link>
            <Link opacity={0.7} href="https://twitter.com/_shellbear">
              <SiTwitter size={22} />
            </Link>
            <Link opacity={0.7} href="mailto:hello@shellbear.me">
              <MdMail size={24} />
            </Link>
            <Link
              opacity={0.7}
              href="https://www.malt.fr/profile/antoineordonez"
            >
              <Malt size={22} />
            </Link>
            <Link
              opacity={0.7}
              href="https://www.linkedin.com/in/antoine-ordonez/"
            >
              <SiLinkedin size={22} />
            </Link>
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
