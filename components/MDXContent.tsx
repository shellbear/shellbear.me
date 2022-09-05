import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import { memo } from 'react';
import styled from 'styled-components';
import Text from './Text';

interface MDXContentProps extends MDXRemoteProps {}

const List = styled.ul`
  padding-left: 2rem;
`;

const ListItem = styled.li`
  margin: 0.5rem 0;
  font-size: medium;
  margin: 0.75rem 0;
  color: rgba(0, 0, 0, 0.7);
  white-space: pre-wrap;
  line-height: 160%;
  letter-spacing: 0.02em;
`;

const MDXContent = ({ components, ...props }: MDXContentProps) => (
  <MDXRemote
    {...props}
    components={{
      p: Text,
      ul: List,
      li: ListItem,
      ...components,
    }}
  />
);

export default memo(MDXContent);
