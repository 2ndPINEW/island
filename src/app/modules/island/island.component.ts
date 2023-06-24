import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-island',
  templateUrl: './island.component.html',
  styleUrls: ['./island.component.scss'],
})
export class IslandComponent {
  islandSurfaceColor$ = this.store.select('islandSurfaceColor');

  constructor(private store: Store<{ islandSurfaceColor: `#${string}` }>) {}
}
