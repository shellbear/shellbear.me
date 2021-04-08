import React from 'react';
import styled, { css } from 'styled-components';
import {
  gridGap,
  padding,
  margin,
  grid,
  layout,
  justifyItems,
  alignItems,
  compose,
  GridProps as StyledGridProps,
  LayoutProps,
  JustifyItemsProps,
  AlignItemsProps,
  GridGapProps,
  PaddingProps,
  MarginProps,
} from 'styled-system';

export type GridProps = GridGapProps &
  PaddingProps &
  MarginProps &
  StyledGridProps &
  LayoutProps &
  JustifyItemsProps &
  AlignItemsProps;

const Grid = styled.div<GridProps>`
  display: grid;
  
  grid-template-columns: ${({ children }) =>
    children && css`repeat(${React.Children.toArray(children).length}, auto);`}
  
  ${compose(gridGap, alignItems, grid, padding, margin, layout, justifyItems)}
  
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: end;
  justify-content: flex-end;
`;

Grid.defaultProps = {};

export default Grid;
