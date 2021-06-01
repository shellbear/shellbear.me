import styled from 'styled-components';
import {
  textAlign,
  margin,
  fontSize,
  fontWeight,
  display,
  compose,
  TextAlignProps,
  MarginProps,
  FontWeightProps,
  DisplayProps,
  FontSizeProps,
} from 'styled-system';

const Text = styled.p<
  TextAlignProps & MarginProps & FontSizeProps & FontWeightProps & DisplayProps
>`
  font-size: 1.125rem;
  line-height: 1.75rem;
  margin: 0.75rem 0 2rem;
  color: rgba(0, 0, 0, 0.7);
  text-align: justify;
  white-space: pre-wrap;

  ${compose(textAlign, margin, fontSize, fontWeight, display)}
`;

export default Text;
