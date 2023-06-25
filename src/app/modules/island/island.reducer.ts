import { createReducer, on } from '@ngrx/store';
import {
  setBeachSurfaceColor,
  setInlandSurfaceColor,
  setSeaSurfaceAlpha,
  setSkyColor,
} from './island.actions';

const initialInlandSurfaceColor = '#3A9648';
const initialBeachSurfaceColor = '#E7E0AF';
const initialSeaSurfaceColor = '#7DB3E7';
const initialSeaSurfaceAlpha = 0.5;
const initialSkyColor = '#78A3FF';

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

export const seaSurfaceColorReducer = createReducer(
  initialSeaSurfaceColor,
  on(setBeachSurfaceColor, (state, { color }) => {
    state = color;
    return color;
  })
);

export const seaSurfaceAlphaReducer = createReducer(
  initialSeaSurfaceAlpha,
  on(setSeaSurfaceAlpha, (state, { alpha }) => {
    state = alpha;
    return alpha;
  })
);

export const skyColorReducer = createReducer(
  initialSkyColor,
  on(setSkyColor, (state, { color }) => {
    state = color;
    return color;
  })
);
