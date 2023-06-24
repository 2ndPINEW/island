import { createReducer, on } from '@ngrx/store';
import { setIslandSurfaceColor } from './island.actions';

export const initialIslandSurfaceColor = '#ffffff';

export const islandSurfaceColorReducer = createReducer(
  initialIslandSurfaceColor,
  on(setIslandSurfaceColor, (state, { color }) => {
    state = color;
    return color;
  })
);
