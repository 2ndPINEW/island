import { createAction } from '@ngrx/store';

/** 内陸部分の色 */
export const setInlandColor = createAction(
  '[IslandComponent] set inland color',
  (color: `#${string}`) => ({ color })
);

/** 海岸部分の色 */
export const setBeachColor = createAction(
  '[IslandComponent] set beach color',
  (color: `#${string}`) => ({ color })
);

/** 海面の色 */
export const setSeaColor = createAction(
  '[IslandComponent] set sea color',
  (color: `#${string}`) => ({ color })
);

/** 海面の透明度 */
export const setSeaAlpha = createAction(
  '[IslandComponent] set sea alpha',
  (alpha: number) => ({ alpha })
);

/** 空の色 */
export const setSkyColor = createAction(
  '[IslandComponent] set sky color',
  (color: `#${string}`) => ({ color })
);
