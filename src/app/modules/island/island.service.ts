import { Injectable } from '@angular/core';
import { ThreeService } from '../three/three.service';
import * as THREE from 'three';
import { interval, map, of, switchMap, take } from 'rxjs';

const islandBaseKey = 'IslandBase';
const islandObjectKey = 'Island';
const islandInlandKey = 'island';
const islandBeachKey = 'island_1';

const totalSteps = 100;

@Injectable({
  providedIn: 'root',
})
export class IslandService {
  constructor(private readonly threeService: ThreeService) {}

  private currentInlandSurfaceColor = { r: 0, g: 0, b: 0 };
  changeInlandColor(color: string) {
    of(color)
      .pipe(
        switchMap((targetHex) =>
          this.colorTransitionObservable(
            targetHex,
            this.currentInlandSurfaceColor
          )
        )
      )
      .subscribe((color) => {
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
      });
  }

  currentBeachSurfaceColor = { r: 0, g: 0, b: 0 };
  changeBeachColor(color: string) {
    of(color)
      .pipe(
        switchMap((targetHex) =>
          this.colorTransitionObservable(
            targetHex,
            this.currentInlandSurfaceColor
          )
        )
      )
      .subscribe((color) => {
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
      });
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