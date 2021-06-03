import React from 'react';
import styled, { css } from 'styled-components';
import {
  gridGap,
  space,
  grid,
  layout,
  flexbox,
  compose,
  GridProps as StyledGridProps,
  LayoutProps,
  GridGapProps,
  SpaceProps,
  FlexboxProps,
} from 'styled-system';

export type GridProps = GridGapProps &
  SpaceProps &
  StyledGridProps &
  LayoutProps &
  FlexboxProps;

const Grid = styled.div<GridProps>`
  display: grid;

  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: end;
  justify-content: flex-end;

  grid-template-columns:
    ${({ children }) =>
      children &&
      css`repeat(${React.Children.toArray(children).length}, auto);`}
    ${compose(gridGap, grid, space, layout, flexbox)};
`;

Grid.defaultProps = {};

export default Grid;
