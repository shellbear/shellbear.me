import React from 'react';
import Layout from '../components/Layout';
import '../styles/globals.css';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism.css';
import 'prismjs/prism.js';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-bash';

import { motion } from 'framer-motion';

const App: React.FC<any> = ({ Component, pageProps }) => (
  <Layout>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Component {...pageProps} />
    </motion.div>
  </Layout>
);

export default App;
