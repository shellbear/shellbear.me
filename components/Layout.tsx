import React from 'react';
import Head from 'next/head';
import Container from './Container';
import Footer from './Footer';
import Nav from './Nav';
import Script from 'next/script';

import styles from '@styles/Home.module.css';

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({
  title = 'Antoine Ordonez',
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
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
          content="https://shellbear.me/img/preview.webp"
        />
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-RZP6RWZ32F"
            />
            <Script
              id="gtm-script"
              strategy="afterInteractive"
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
      <Nav
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
      <Container justifyContent="space-between" alignContent="space-between">
        {!isOpen && <main className={styles.main}>{children}</main>}
        <Footer />
      </Container>
    </div>
  );
};

export default Layout;
