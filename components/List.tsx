import styled from 'styled-components';
import {
  grid,
  layout,
  padding,
  margin,
  GridProps,
  LayoutProps,
  PaddingProps,
  MarginProps,
  compose,
} from 'styled-system';

const List = styled.ul<GridProps & LayoutProps & PaddingProps & MarginProps>`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  grid-gap: 0.75rem;

  ${compose(grid, layout, padding, margin)}
`;

export default List;
