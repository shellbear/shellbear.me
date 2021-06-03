import styled, { css } from 'styled-components';
import {
  color,
  background,
  layout,
  ColorProps,
  compose,
  fontSize,
  FontSizeProps,
  BackgroundProps,
  fontWeight,
  FontWeightProps,
  opacity,
  OpacityProps,
  LayoutProps,
  system,
} from 'styled-system';
import { Property } from 'csstype';

const textTransform = system({
  textTransform: true,
  textDecoration: true,
});

interface TextTransformProps {
  textTransform?: Property.TextTransform;
  textDecoration?: Property.TextDecoration;
}

interface Props {
  isSelected?: boolean;
}

type LinkProps = Props &
  ColorProps &
  OpacityProps &
  FontWeightProps &
  FontSizeProps &
  TextTransformProps &
  BackgroundProps &
  LayoutProps;

const Link = styled.a<LinkProps>`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  border-bottom: none;
  padding: 0;

  ${compose(
    opacity,
    color,
    fontWeight,
    fontSize,
    textTransform,
    background,
    layout,
  )}

  ${({ isSelected }) =>
    isSelected &&
    css`
      border-radius: 25px;
      padding: 10px 20px;
      background: black;
      color: white;
      opacity: 0.9;
    `}

  :hover {
    opacity: 1;
  }
`;

export default Link;
