import React from 'react';
import styled, { css } from 'styled-components';
import {
  gridGap,
  space,
  grid,
  layout,
  flexbox,
  borders,
  compose,
  GridProps as StyledGridProps,
  LayoutProps,
  GridGapProps,
  SpaceProps,
  FlexboxProps,
  BordersProps,
} from 'styled-system';

export type GridProps = GridGapProps &
  SpaceProps &
  StyledGridProps &
  LayoutProps &
  FlexboxProps &
  BordersProps;

const Grid = styled.div<GridProps>`
  display: grid;
  align-items: center;
  justify-content: flex-end;

  grid-template-columns:
    ${({ children }) =>
      children &&
      css`repeat(${React.Children.toArray(children).length}, auto);`}
    ${compose(gridGap, grid, space, layout, flexbox, borders)};
`;

Grid.defaultProps = {};

export default Grid;
