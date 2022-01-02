import {
  ContentChild,
  TemplateRef,
  Input,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import panzoom from 'panzoom';
import { Edge, Node } from './types';
import { calcLayout } from './calc-layout';
import { getBezierPath } from './calc-bezier-edge-path';

@Component({
  selector: 'ngx-component-graph',
  templateUrl: './ngx-component-graph.component.html',
  styleUrls: ['./ngx-component-graph.component.scss'],
})
export class NgxComponentGraphComponent
  implements AfterViewInit, AfterViewChecked
{
  @Input() nodes: Node[] = [];
  @Input() edges: Edge[] = [];

  initializeEdge: number = 0;

  @Input() viewportWidth: number = 600;
  @Input() viewportHeight: number = 400;

  @ViewChild('viewport', { static: false }) viewport: ElementRef | undefined;
  @ContentChild('edgeTemplate') edgeTemplate: TemplateRef<any> | undefined;
  @ContentChild('nodeTemplate') nodeTemplate: TemplateRef<any> | undefined;
  @ContentChild('handleTemplate') handleTemplate: TemplateRef<any> | undefined;

  panZoomController: any;
  zoomLevels: number[];
  ispan: boolean = true;

  currentZoomLevel: number;
  title = 'angular-flowchart';
  cord: DOMRect = new DOMRect();
  constructor() {
    this.zoomLevels = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];
    this.currentZoomLevel = this.zoomLevels[4];
  }
  layout() {
    // calculate the w and h for each node
    this.nodes.forEach((n) => {
      let node: HTMLElement | null = document.getElementById(n.id);
      if (!node) return;
      n.width = node.offsetWidth;
      n.height = node.offsetHeight;
    });
    // calculate layout
    var layout: Map<string, { x: number; y: number }> = calcLayout(
      this.nodes,
      this.edges
    );
    layout.forEach((position: { x: number; y: number }, nodeId: string) => {
      let node = this.nodes.find((obj) => {
        return obj.id === nodeId;
      });
      if (!node) return;
      node.x = position.x;
      node.y = position.y;
    });
  }

  ngAfterViewInit() {
    this.currentZoomLevel = this.zoomLevels[4];
    if (this.viewport)
      this.panZoomController = panzoom(this.viewport.nativeElement);
    this.layout();
    this.renderEdge();
  }

  ngAfterViewChecked() {
    // this skips the first call after Init
    if (this.initializeEdge < 4) {
      this.layout();
      this.renderEdge();
      this.initializeEdge += 1;
    }
  }

  renderEdge() {
    var curTransformation = this.panZoomController.getTransform();
    let viewport: HTMLElement | null = document.getElementById('viewport');
    if (!viewport) {
      return;
    }
    var parentRect = viewport.getBoundingClientRect();
    this.edges.forEach((e) => {
      let source: HTMLElement | null = document.getElementById(e.source);
      let target: HTMLElement | null = document.getElementById(e.target);
      if (!source || !target) {
        return;
      }
      var sourceRect = source.getBoundingClientRect();
      var targetRect = target.getBoundingClientRect();
      // prepare x, y, width, height
      sourceRect.y = sourceRect.y - parentRect.y;
      sourceRect.x = sourceRect.x - parentRect.x;
      sourceRect.y = sourceRect.y / curTransformation.scale;
      sourceRect.x = sourceRect.x / curTransformation.scale;

      targetRect.y = targetRect.y - parentRect.y;
      targetRect.x = targetRect.x - parentRect.x;
      targetRect.y = targetRect.y / curTransformation.scale;
      targetRect.x = targetRect.x / curTransformation.scale;

      var sourceWidth: number = source.offsetWidth;
      var sourceHeight: number = source.offsetHeight;
      var targetWidth: number = target.offsetWidth;
      var targetHeight: number = target.offsetHeight;

      var sourceCenterX = sourceRect.x + Math.floor(sourceWidth / 2);
      var sourceCenterY = sourceRect.y + Math.floor(sourceHeight / 2);
      var targetCenterX = targetRect.x + Math.floor(targetWidth / 2);
      var targetCenterY = targetRect.y + Math.floor(targetHeight / 2);

      var sourceHandlePos: string;
      var targetHandlePos: string;

      var sourceX: number;
      var sourceY: number;
      var targetX: number;
      var targetY: number;

      if (targetCenterX > sourceCenterX && targetCenterY < sourceCenterY) {
        // element is at top right corner
        if (targetRect.x < sourceRect.x + sourceWidth) {
          // the target is roughly above the source
          sourceHandlePos = 'top';
          targetHandlePos = 'bot';

          sourceX = sourceCenterX;
          sourceY = sourceRect.y;

          targetX = targetCenterX;
          targetY = targetRect.y + targetHeight;
        } else if (targetRect.y + targetHeight < sourceRect.y) {
          // target is to the top right
          sourceHandlePos = 'top';
          targetHandlePos = 'left';

          sourceX = sourceCenterX;
          sourceY = sourceRect.y;

          targetX = targetRect.x;
          targetY = targetCenterY;
        } else {
          // target is roughly to the right
          sourceHandlePos = 'right';
          targetHandlePos = 'left';

          sourceX = sourceRect.x + sourceWidth;
          sourceY = sourceCenterY;

          targetX = targetRect.x;
          targetY = targetCenterY;
        }
      } else if (
        targetCenterX < sourceCenterX &&
        targetCenterY < sourceCenterY
      ) {
        // element is at top left corner
        if (targetRect.x + targetWidth > sourceRect.x) {
          // the target is roughly above the source
          sourceHandlePos = 'top';
          targetHandlePos = 'bot';

          sourceX = sourceCenterX;
          sourceY = sourceRect.y;

          targetX = targetCenterX;
          targetY = targetRect.y + targetHeight;
        } else if (targetRect.y + targetHeight < sourceRect.y) {
          // target is to the top left
          sourceHandlePos = 'top';
          targetHandlePos = 'right';

          sourceX = sourceCenterX;
          sourceY = sourceRect.y;

          targetX = targetRect.x + targetWidth;
          targetY = targetCenterY;
        } else {
          // target is roughly to the left
          sourceHandlePos = 'left';
          targetHandlePos = 'right';

          sourceX = sourceRect.x;
          sourceY = sourceCenterY;

          targetX = targetRect.x + targetWidth;
          targetY = targetCenterY;
        }
      } else if (
        targetCenterX > sourceCenterX &&
        targetCenterY > sourceCenterY
      ) {
        // element is at bot right corner
        if (targetRect.x < sourceRect.x + sourceWidth) {
          // the target is roughly below the source
          sourceHandlePos = 'bot';
          targetHandlePos = 'top';

          sourceX = sourceCenterX;
          sourceY = sourceRect.y + sourceHeight;

          targetX = targetCenterX;
          targetY = targetRect.y;
        } else if (targetRect.y > sourceRect.y + sourceHeight) {
          // target is to the bot right
          sourceHandlePos = 'bot';
          targetHandlePos = 'left';

          sourceX = sourceCenterX;
          sourceY = sourceRect.y + sourceHeight;

          targetX = targetRect.x;
          targetY = targetCenterY;
        } else {
          // target is roughly to the right
          sourceHandlePos = 'right';
          targetHandlePos = 'left';

          sourceX = sourceRect.x + sourceWidth;
          sourceY = sourceCenterY;

          targetX = targetRect.x;
          targetY = targetCenterY;
        }
      } else {
        // element is at bot left corner
        if (targetRect.x + targetWidth > sourceRect.x) {
          // the target is roughly below the source
          sourceHandlePos = 'bot';
          targetHandlePos = 'top';

          sourceX = sourceCenterX;
          sourceY = sourceRect.y + sourceHeight;

          targetX = targetCenterX;
          targetY = targetRect.y;
        } else if (targetRect.y + targetHeight < sourceRect.y) {
          // target is to the bot left
          sourceHandlePos = 'bot';
          targetHandlePos = 'right';

          sourceX = sourceCenterX;
          sourceY = sourceRect.y + sourceHeight;

          targetX = targetRect.x + targetWidth;
          targetY = targetCenterY;
        } else {
          // target is roughly to the left
          sourceHandlePos = 'left';
          targetHandlePos = 'right';

          sourceX = sourceRect.x;
          sourceY = sourceCenterY;

          targetX = targetRect.x + targetWidth;
          targetY = targetCenterY;
        }
      }
      e.bezierPath = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition: sourceHandlePos,
        targetX,
        targetY,
        targetPosition: targetHandlePos,
      });
    });
  }

  onNodeMoved() {
    this.panZoomController.pause();
    this.renderEdge();
    this.panZoomController.resume();
  }
}
