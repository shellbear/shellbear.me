import styled from 'styled-components';
import { color, ColorProps } from 'styled-system';

const Tag = styled.small<ColorProps>`
  background: rgb(252, 116, 76);
  color: white;
  font-weight: bold;
  padding: 8px 20px;
  border-radius: 0.375rem;

  ${color}
`;

export default Tag;
