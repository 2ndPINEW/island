import { createAction } from '@ngrx/store';

export const setIslandSurfaceColor = createAction(
  '[Island Component] set island surface color',
  (color: `#${string}`) => ({ color })
);
