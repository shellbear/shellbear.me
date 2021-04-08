import styled from 'styled-components';
import { color, ColorProps } from 'styled-system';

const Tag = styled.small<ColorProps>`
  color: rgb(237, 114, 226);

  ${color}
`;

export default Tag;
