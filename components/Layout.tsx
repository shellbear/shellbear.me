import React from 'react';
import Head from 'next/head';
import Container from './Container';
import Footer from './Footer';
import Nav from './Nav';

import styles from '@styles/Home.module.css';

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({
  title = 'Antoine Ordonez',
  children,
}) => (
  <div className={styles.container}>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta charSet="utf-8" />
      <meta name="author" content="Antoine Ordonez" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Antoine Ordonez" />
      <meta
        property="og:description"
        content="I'm a Full Stack developer with experience in DevOps, Backend, Frontend and mobile development."
      />
      <meta property="og:type" content="website" />
      <meta property="twitter:site" content="@_shellbear" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="og:image"
        content="https://shellbear.me/img/preview.png"
      />
      {process.env.NODE_ENV === 'production' && (
        <>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-RZP6RWZ32F"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
      
                  gtag('config', 'G-RZP6RWZ32F');`,
            }}
          />
        </>
      )}
    </Head>
    <Nav />
    <Container justifyContent="space-between" alignContent="space-between">
      <main className={styles.main}>{children}</main>
      <Footer />
    </Container>
  </div>
);

export default Layout;
