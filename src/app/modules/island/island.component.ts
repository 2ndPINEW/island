import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThreeService } from '../three/three.service';
import { IslandService } from './island.service';
import { islandBaseKey } from 'src/app/constants/model-name';
import { IslandState } from './island';

@Component({
  selector: 'app-island',
  templateUrl: './island.component.html',
  styleUrls: ['./island.component.scss'],
})
export class IslandComponent {
  @ViewChild('canvas', { static: true })
  canvasRef: ElementRef<HTMLCanvasElement> | undefined;

  constructor(
    private readonly store: Store<{
      island: IslandState;
    }>,
    private readonly threeService: ThreeService,
    private readonly islandService: IslandService
  ) {}

  ngAfterViewInit(): void {
    this.threeService.loadModel({
      path: '/assets/models/island.glb',
      name: islandBaseKey,
    });

    this.store
      .select((state) => state.island.inlandColor)
      .subscribe((inlandColor) => {
        this.islandService.changeInlandColor(inlandColor);
      });

    this.store
      .select((state) => state.island.beachColor)
      .subscribe((color) => {
        this.islandService.changeBeachColor(color);
      });

    this.store
      .select((state) => state.island.seaColor)
      .subscribe((color) => {
        this.islandService.changeSeaColor(color);
      });

    this.store
      .select((state) => state.island.skyColor)
      .subscribe((color) => {
        this.islandService.changeSkyColor(color);
      });
  }
}
