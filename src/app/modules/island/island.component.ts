import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThreeService } from '../three/three.service';
import { IslandService } from './island.service';

const islandBaseKey = 'IslandBase';

@Component({
  selector: 'app-island',
  templateUrl: './island.component.html',
  styleUrls: ['./island.component.scss'],
})
export class IslandComponent {
  inlandSurfaceColor$ = this.store.select('inlandSurfaceColor');

  @ViewChild('canvas', { static: true })
  canvasRef: ElementRef<HTMLCanvasElement> | undefined;

  constructor(
    private readonly store: Store<{
      inlandSurfaceColor: `#${string}`;
      beachSurfaceColor: `#${string}`;
    }>,
    private readonly threeService: ThreeService,
    private readonly islandService: IslandService
  ) {}

  ngAfterViewInit(): void {
    this.threeService.loadModel({
      path: '/assets/models/island.glb',
      name: islandBaseKey,
    });

    this.store.select('inlandSurfaceColor').subscribe((color) => {
      this.islandService.changeInlandColor(color);
    });

    this.store.select('beachSurfaceColor').subscribe((color) => {
      this.islandService.changeBeachColor(color);
    });
  }
}
