import { Component, ElementRef, ViewChild } from '@angular/core';
import { ThreeService } from './three.service';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss'],
})
export class ThreeComponent {
  @ViewChild('canvas', { static: true })
  canvasRef: ElementRef<HTMLCanvasElement> | undefined;

  constructor(private readonly threeService: ThreeService) {}

  ngAfterViewInit(): void {
    const canvasElement = this.canvasRef?.nativeElement;
    if (!canvasElement) {
      console.error('[ThreeComponent] Canvas element not found');
      return;
    }
    this.threeService.initScene(canvasElement);
  }
}
