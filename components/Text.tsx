import styled from 'styled-components';
import {
  textAlign,
  margin,
  fontSize,
  fontWeight,
  display,
  typography,
  compose,
  TextAlignProps,
  MarginProps,
  FontWeightProps,
  DisplayProps,
  FontSizeProps,
  TypographyProps,
} from 'styled-system';

const Text = styled.p<
  TextAlignProps &
    MarginProps &
    FontSizeProps &
    FontWeightProps &
    DisplayProps &
    TypographyProps
>`
  font-size: 1.125rem;
  margin: 0.75rem 0;
  color: rgba(0, 0, 0, 0.7);
  white-space: pre-wrap;
  line-height: 160%;
  letter-spacing: 0.02em;

  ${compose(textAlign, margin, fontSize, fontWeight, display, typography)}
`;

export default Text;
