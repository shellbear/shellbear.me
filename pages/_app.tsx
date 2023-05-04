import React from 'react';
import { AppProps } from 'next/app';
import { motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';

import { Layout } from '@components';

import '@styles/globals.css';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism.css';

import 'prismjs/prism.js';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-bash';

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <>
    <Analytics />
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Component {...pageProps} />
      </motion.div>
    </Layout>
  </>
);

export default App;
