import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IslandState } from './island';

export const selectIsland = createFeatureSelector<IslandState>('island');

export const selectInlandColor = createSelector(
  selectIsland,
  (state) => state.inlandColor
);

export const selectBeachColor = createSelector(
  selectIsland,
  (state) => state.beachColor
);

export const selectSeaColor = createSelector(
  selectIsland,
  (state) => state.seaColor
);

export const selectSeaAlpha = createSelector(
  selectIsland,
  (state) => state.seaAlpha
);

export const selectSkyColor = createSelector(
  selectIsland,
  (state) => state.skyColor
);

export const selectLightStrength = createSelector(
  selectIsland,
  (state) => state.lightStrength
);
