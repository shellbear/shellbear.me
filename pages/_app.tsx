import React from 'react';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { motion } from 'framer-motion';
import { ViewportProvider } from '../hooks/viewport';

const App: React.FC<any> = ({ Component, pageProps }) => (
  <ViewportProvider>
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Component {...pageProps} />
      </motion.div>
    </Layout>
  </ViewportProvider>
);

export default App;
