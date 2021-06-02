import styled from 'styled-components';
import {
  layout,
  alignContent,
  justifyContent,
  justifyItems,
  alignItems,
  flexDirection,
  grid,
  textAlign,
  padding,
  margin,
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
} from 'styled-system';

export type ContainerProps = LayoutProps &
  AlignContentProps &
  JustifyContentProps &
  FlexDirectionProps &
  PaddingProps &
  MarginProps &
  TextAlignProps &
  AlignItemsProps &
  GridProps &
  JustifyItemsProps &
  DisplayProps;

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  ${compose(
    alignContent,
    justifyContent,
    justifyItems,
    grid,
    layout,
    flexDirection,
    padding,
    margin,
    textAlign,
    alignItems,
    display,
  )};
`;

export default Container;
