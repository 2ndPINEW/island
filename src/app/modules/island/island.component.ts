import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, map, switchMap, take } from 'rxjs';
import { ThreeService } from '../three/three.service';
import * as THREE from 'three';

const islandBaseKey = 'IslandBase';
const islandObjectKey = 'Island';
const islandInlandKey = 'island';
const islandBeachKey = 'island_1';

const totalSteps = 100;

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
    private readonly threeService: ThreeService
  ) {}

  ngAfterViewInit(): void {
    this.threeService.loadModel({
      path: '/assets/models/island.glb',
      name: islandBaseKey,
    });

    let currentInlandSurfaceColor = { r: 0, g: 0, b: 0 };
    let currentBeachSurfaceColor = { r: 0, g: 0, b: 0 };

    this.store
      .select('inlandSurfaceColor')
      .pipe(
        switchMap((targetHex) =>
          this.colorTransitionObservable(targetHex, currentInlandSurfaceColor)
        )
      )
      .subscribe((color) => {
        this.changeInlandColor(color);
      });

    this.store
      .select('beachSurfaceColor')
      .pipe(
        switchMap((targetHex) =>
          this.colorTransitionObservable(targetHex, currentBeachSurfaceColor)
        )
      )
      .subscribe((color) => {
        this.changeBeachColor(color);
      });
  }

  private changeInlandColor(color: string) {
    const islandBase = this.threeService.objects.find(
      (object) => object.name === islandBaseKey
    );
    const islandObject = islandBase?.children.find(
      (object) => object.name === islandObjectKey
    );
    const inlandMesh = islandObject?.children.find(
      (object) => object.name === islandInlandKey
    );
    if (inlandMesh && inlandMesh instanceof THREE.Mesh) {
      inlandMesh.material.color = new THREE.Color(color);
    }
  }

  private changeBeachColor(color: string) {
    const islandBase = this.threeService.objects.find(
      (object) => object.name === islandBaseKey
    );
    const islandObject = islandBase?.children.find(
      (object) => object.name === islandObjectKey
    );
    const beachMesh = islandObject?.children.find(
      (object) => object.name === islandBeachKey
    );
    if (beachMesh && beachMesh instanceof THREE.Mesh) {
      beachMesh.material.color = new THREE.Color(color);
    }
  }

  private colorTransitionObservable(
    targetHex: string,
    currentColor: { r: number; g: number; b: number }
  ) {
    const targetRgb = this.hexToRgb(targetHex);
    if (!targetRgb) {
      return [];
    }
    return interval(16).pipe(
      take(totalSteps),
      map((step) => {
        const amt = step / totalSteps;
        const r = Math.round(this.lerp(currentColor.r, targetRgb.r, amt));
        const g = Math.round(this.lerp(currentColor.g, targetRgb.g, amt));
        const b = Math.round(this.lerp(currentColor.b, targetRgb.b, amt));
        currentColor = { r, g, b };
        return this.rgbToHex(currentColor);
      })
    );
  }

  // ----------------------------
  // TODO: 以下utils に移動する
  // ----------------------------

  private hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  private rgbToHex(rgb: { r: number; g: number; b: number }) {
    return (
      '#' +
      ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1)
    );
  }

  private lerp(start: number, end: number, amt: number) {
    return (1 - amt) * start + amt * end;
  }
}
