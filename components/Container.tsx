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
  TextAlignProps,
} from 'styled-system';

const Container = styled.div<
  LayoutProps &
    AlignContentProps &
    JustifyContentProps &
    FlexDirectionProps &
    PaddingProps &
    MarginProps &
    TextAlignProps &
    AlignItemsProps &
    GridProps &
    JustifyItemsProps
>`
  display: flex;
  flex-direction: column;

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
  )};
`;

export default Container;
