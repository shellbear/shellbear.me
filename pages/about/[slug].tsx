import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import { Container, Title, Text, MDXContent, Separator } from '@components';
import { getPosts, Post } from '@posts';
import Image from 'next/image';

const About: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  experience,
}) => (
  <Container
    width={['100%', 1200]}
    maxWidth="100vw"
    marginBottom={['1rem', '4rem']}
  >
    <Head>
      <title>{experience.data.title}</title>
      <meta property="og:title" content={experience.data.title} />
      <meta property="og:description" content={experience.data.description} />
    </Head>
    <Container alignItems="flex-start" mb="2rem">
      <Container flexDirection="row" gridColumnGap="1rem" gridRowGap=".2rem">
        {experience.data.tags.map((tag: string) => (
          <Text fontSize="small" color="plum" key={tag} m="0">
            #{tag}
          </Text>
        ))}
      </Container>
      <Title fontSize={['2.5rem', '4rem']} textAlign="start">
        {experience.data.title} - {experience.data.post}
      </Title>
      <Container
        flexDirection="row"
        gridGap="1.5rem"
        alignItems="center"
        mb="2rem"
      >
        <Text>📅 {experience.data.date}</Text>
        <a href={experience.data.link}>🔗 Website</a>
      </Container>
      <Container position="relative" width="100%" height="300px">
        <Image
          src={experience.data.image}
          alt={experience.data.title}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={experience.data.blurImage}
        />
      </Container>
      <Container mt="1rem" gridGap="1rem">
        <Container
          pl="2rem"
          backgroundColor="rgb(241, 241, 239)"
          borderRadius="3px"
        >
          <Text as="h3" fontWeight="normal">
            {experience.data.description}
          </Text>
        </Container>
        <Text m="0" fontSize="smaller">
          {experience.data.stack.join(', ')}
        </Text>
      </Container>
    </Container>
    <Separator />
    <MDXContent {...experience.source} />
  </Container>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const experiences = await getPosts('experiences');

  return {
    paths: experiences.map(({ data: { slug } }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  { experience: Post },
  { slug: string }
> = async ({ params }) => {
  const experiences = await getPosts('experiences');
  const experience = experiences.find(({ data }) => data.slug === params?.slug);

  if (!experience) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      experience,
    },
  };
};

export default About;
