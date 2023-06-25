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

/** 海面の色 */
export const setSeaSurfaceColor = createAction(
  '[IslandComponent] set sea surface color',
  (color: `#${string}`) => ({ color })
);

/** 海面の透明度 */
export const setSeaSurfaceAlpha = createAction(
  '[IslandComponent] set sea surface alpha',
  (alpha: number) => ({ alpha })
);

/** 空の色 */
export const setSkyColor = createAction(
  '[IslandComponent] set sky color',
  (color: `#${string}`) => ({ color })
);
