import styled from 'styled-components';
import {
  fontSize,
  fontWeight,
  color,
  textAlign,
  compose,
  FontSizeProps,
  FontWeightProps,
  TextAlignProps,
  ColorProps,
} from 'styled-system';

const Title = styled.h1<
  FontSizeProps & ColorProps & FontWeightProps & TextAlignProps
>`
  margin: 10px 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;

  ${compose(fontSize, fontWeight, color, textAlign)}
`;

export default Title;
