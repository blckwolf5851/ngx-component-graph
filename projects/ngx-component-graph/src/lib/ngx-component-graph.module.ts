import { NgModule } from '@angular/core';
import { NgxComponentGraphComponent } from './ngx-component-graph.component';
import { CommonModule } from '@angular/common';
import { AngularDraggableModule } from 'angular2-draggable';


@NgModule({
  declarations: [
    NgxComponentGraphComponent
  ],
  imports: [
    CommonModule,
    AngularDraggableModule,
  ],
  exports: [
    NgxComponentGraphComponent
  ]
})
export class NgxComponentGraphModule { }
