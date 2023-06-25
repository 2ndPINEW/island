import { createReducer, on } from '@ngrx/store';
import {
  setBeachColor,
  setInlandColor,
  setLightStrength,
  setSeaAlpha,
  setSeaColor,
  setSkyColor,
} from './island.actions';
import { IslandState } from './island';

const initialState: IslandState = {
  inlandColor: '#3A9648',
  beachColor: '#E7E0AF',
  seaColor: '#7DB3E7',
  seaAlpha: 0.5,
  skyColor: '#78A3FF',
  lightStrength: 100,
};

export const islandReducer = createReducer(
  initialState,
  on(setInlandColor, (state, { color }) => {
    return { ...state, inlandColor: color };
  }),
  on(setBeachColor, (state, { color }) => {
    return { ...state, beachColor: color };
  }),
  on(setSeaColor, (state, { color }) => {
    return { ...state, seaColor: color };
  }),
  on(setSeaAlpha, (state, { alpha }) => {
    return { ...state, seaAlpha: alpha };
  }),
  on(setSkyColor, (state, { color }) => {
    return { ...state, skyColor: color };
  }),
  on(setLightStrength, (state, { strength }) => {
    return { ...state, lightStrength: strength };
  })
);
