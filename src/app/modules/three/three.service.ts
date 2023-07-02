import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { skyObjectKey } from 'src/app/constants/model-name';
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

  createFireflySwarm(count: number) {
    // パーティクルのジオメトリとマテリアルを作成する
    var particles = new THREE.BufferGeometry();
    var particlePositions = [];

    // 2. 指定された数のパーティクルを作成
    for (let i = 0; i < count; i++) {
      // パーティクルの位置をランダムに設定
      particlePositions.push(Math.random() * 15 - 7.5); // x
      particlePositions.push(Math.random() * 8); // y
      particlePositions.push(Math.random() * 15 - 7.5); // z
    }

    // 3. 位置データをジオメトリーに設定
    particles.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(particlePositions, 3)
    );

    // 4. パーティクルのマテリアルを作成
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffff00, // 蛍の色を黄色に設定
      size: 0.03, // パーティクルの大きさを設定
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.7,
    });

    // 5. パーティクルを作成し、コンテナに追加
    const particleSystem = new THREE.Points(particles, particleMaterial);
    this.scene?.add(particleSystem);

    // アニメーション関数を作成する
    function animate() {
      requestAnimationFrame(animate);

      particleSystem.rotation.y += 0.0001;

      const positions = particleSystem.geometry.attributes['position'].array;

      for (let i = 0; i < positions.length; i += 3) {
        (positions[i + 1] as any) += (Math.random() - 0.5) / 1000;
      }

      particleSystem.geometry.attributes['position'].needsUpdate = true;
    }

    animate();
  }

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

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    ambientLight.name = 'ambientLight';
    this._objects.push(ambientLight);
    this.scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xffffff, 1.8);
    light.name = 'directionalLight';
    light.position.set(-5, 30, 24);
    light.castShadow = true;
    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;
    light.shadow.radius = 2;

    light.shadow.camera.left = -80;
    light.shadow.camera.right = 80;
    light.shadow.camera.top = 80;
    light.shadow.camera.bottom = -80;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 80;
    this._objects.push(light);
    this.scene.add(light);

    // 焚き火大部分のポイントライト
    const pointLight = new THREE.PointLight(0xff6a45, 0.6, 8, 2);
    pointLight.name = 'pointLight';
    pointLight.position.set(2.6, 2.03, 0.7);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 4096;
    pointLight.shadow.mapSize.height = 4096;
    pointLight.shadow.radius = 2;
    pointLight.shadow.camera.near = 0.01;
    pointLight.shadow.camera.far = 80;
    this._objects.push(pointLight);
    this.scene.add(pointLight);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasElement,
      alpha: true,
    });
    // MEMO: これ型定義にないのなんで？
    (this.renderer as any).shadowMap.enabled = true;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    timer(0, 32).subscribe(() => {
      this.rerender();
    });

    this.createFireflySwarm(150);
  }

  loadModel({ path, name }: { path: string; name: string }) {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      const model = gltf.scene;
      model.name = name;
      this.enableReceiveShadow(model);
      if (!this.scene) {
        return;
      }
      this._objects.push(model);
      this.scene.add(model);
      this.rerender();
    });
  }

  enableReceiveShadow(object: THREE.Object3D) {
    // 空のオブジェクトは影を受け取らないし与えないようにする
    if (object.name === skyObjectKey) {
      return;
    }
    object.castShadow = true;
    object.receiveShadow = true;
    object.children.forEach((child) => {
      this.enableReceiveShadow(child);
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
