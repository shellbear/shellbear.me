import styled from 'styled-components';
import {
  compose,
  flexbox,
  layout,
  FlexboxProps,
  LayoutProps,
} from 'styled-system';

const Image = styled.img<FlexboxProps & LayoutProps>`
  ${compose(flexbox, layout)}
`;

export default Image;
