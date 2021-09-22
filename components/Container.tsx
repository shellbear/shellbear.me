import styled from 'styled-components';
import {
  layout,
  alignContent,
  justifyContent,
  justifyItems,
  alignItems,
  position,
  flexDirection,
  grid,
  textAlign,
  padding,
  margin,
  color,
  borders,
  display,
  compose,
  LayoutProps,
  AlignItemsProps,
  AlignContentProps,
  GridProps,
  JustifyContentProps,
  JustifyItemsProps,
  FlexDirectionProps,
  PaddingProps,
  MarginProps,
  DisplayProps,
  TextAlignProps,
  ColorProps,
  BordersProps,
  PositionProps,
} from 'styled-system';

export type ContainerProps = PositionProps &
  LayoutProps &
  AlignContentProps &
  JustifyContentProps &
  FlexDirectionProps &
  PaddingProps &
  MarginProps &
  TextAlignProps &
  AlignItemsProps &
  GridProps &
  JustifyItemsProps &
  ColorProps &
  BordersProps &
  DisplayProps;

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  ${compose(
    position,
    alignContent,
    justifyContent,
    justifyItems,
    grid,
    layout,
    flexDirection,
    padding,
    borders,
    margin,
    textAlign,
    alignItems,
    color,
    display,
  )};
`;

export default Container;
