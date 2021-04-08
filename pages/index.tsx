import React from 'react';
import Image from 'next/image';
import { Container, Title, Button, Grid, Link, Text } from '../components';
import { motion } from 'framer-motion';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <Container>
      <Container
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        textAlign="center"
        paddingY="25px"
        paddingBottom="40px"
        gridGap="4rem"
      >
        <Container alignItems="center" alignContent="center">
          <Image
            src="/me.jpg"
            alt="me"
            width="120px"
            height="120px"
            objectFit="cover"
            className={styles.image}
          />
          <Title>Antoine Ordonez</Title>
          <Title fontSize="2rem" color="rgba(0, 0, 0, 0.6)" fontWeight="500">
            I build cloud software.
          </Title>
        </Container>
        <Container maxWidth="900px" gridGap="3rem">
          <Container>
            <Text textAlign="center">
              I'm a Full Stack developer with experience in DevOps, Backend,
              Frontend and mobile development. <br />
              I'm currently <b>CTO</b> of <b>Shareview</b> and living in Seoul,
              South-Korea.
            </Text>
          </Container>
          <a href="/about">
            <Button>More about me &rarr;</Button>
          </a>
        </Container>
      </Container>

      <Container alignItems="center" paddingY="4rem">
        <Container maxWidth="600px" alignItems="center" alignContent="center">
          <Title fontSize="3rem">Get in touch</Title>
          <Text textAlign="center">
            Although I'm not actively looking for job opportunities, my inbox is
            still open for you. Feel free to ask me anything!
          </Text>
          <Grid gridGap="2rem">
            <Link href="mailto:hello@shellbear.me">
              <Button>
                <motion.span
                  initial={{ display: 'inline-block' }}
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: 2.5,
                  }}
                >
                  👋
                </motion.span>{' '}
                Say hello
              </Button>
            </Link>
            <Link href="https://calendly.com/antoine-ordonez/intro">
              <Button
                backgroundColor="rgb(226,232,240)"
                color="black"
                variant="secondary"
              >
                Schedule a meeting
              </Button>
            </Link>
          </Grid>
        </Container>
      </Container>
    </Container>
  );
};

export default Home;
