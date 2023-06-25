import { createAction } from '@ngrx/store';

/** 内陸部分の色 */
export const setInlandSurfaceColor = createAction(
  '[IslandComponent] set inland surface color',
  (color: `#${string}`) => ({ color })
);

/** 海岸部分の色 */
export const setBeachSurfaceColor = createAction(
  '[IslandComponent] set beach surface color',
  (color: `#${string}`) => ({ color })
);
