import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable({
  providedIn: 'root',
})
export class ThreeService {
  private scene: THREE.Scene | undefined;

  private camera: THREE.Camera | undefined;

  private renderer: THREE.Renderer | undefined;

  private _objects: THREE.Object3D[] = [];

  initScene(canvasElement: HTMLCanvasElement) {
    if (!canvasElement) {
      return;
    }
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );
    this.camera.position.x = 12;
    this.camera.position.y = 10;
    this.camera.position.z = 12;
    this.camera.lookAt(new THREE.Vector3(0, 2, 0));

    const axesHelper = new THREE.AxesHelper(1000);
    this.scene.add(axesHelper);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this._objects.push(ambientLight);
    this.scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(50, 50, 50);
    this._objects.push(light);
    this.scene.add(light);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasElement,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    timer(0, 16).subscribe(() => {
      this.rerender();
    });
  }

  loadModel({ path, name }: { path: string; name: string }) {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      const model = gltf.scene;
      model.name = name;
      if (!this.scene) {
        return;
      }
      this._objects.push(model);
      this.scene.add(model);
      this.rerender();
    });
  }

  rerender() {
    if (!this.renderer || !this.scene || !this.camera) {
      return;
    }
    this.renderer.render(this.scene, this.camera);
  }

  get objects() {
    return this._objects;
  }
}
