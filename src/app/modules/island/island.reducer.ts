import { createReducer, on } from '@ngrx/store';
import { setBeachSurfaceColor, setInlandSurfaceColor } from './island.actions';

const initialInlandSurfaceColor = '#ffffff';
const initialBeachSurfaceColor = '#ffffff';

export const inlandSurfaceColorReducer = createReducer(
  initialInlandSurfaceColor,
  on(setInlandSurfaceColor, (state, { color }) => {
    state = color;
    return color;
  })
);

export const beachSurfaceColorReducer = createReducer(
  initialBeachSurfaceColor,
  on(setBeachSurfaceColor, (state, { color }) => {
    state = color;
    return color;
  })
);
