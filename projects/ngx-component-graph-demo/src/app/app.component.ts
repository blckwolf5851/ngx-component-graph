import { Component } from '@angular/core';
import { Edge, Node } from 'projects/ngx-component-graph/src/public-api';

interface CustomNode extends Node {
  payload?: object;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  raw_edges: Edge[] = [
    {
      id: '1',
      source: 'node1',
      target: 'node2',
    },
    {
      id: '2',
      source: 'node3',
      target: 'node4',
    },
    {
      id: '3',
      source: 'node1',
      target: 'node3',
    },
    {
      id: '4',
      source: 'node2',
      target: 'node5',
    },
  ];
  raw_nodes: CustomNode[] = [
    {
      id: 'node1',
      style: { width: '200px', border: 'dotted 4px #cc3' },
      payload: { title: 'Nice component!' },
    },
    {
      id: 'node2',
      style: { width: '300px', border: 'dotted 2px #ccc' },
    },
    {
      id: 'node3',
      // style: {'width': '400px', 'border': 'dotted 2px #ccc'}
    },
    {
      id: 'node4',
    },
    {
      id: 'node5',
    },
  ];
  constructor() {}
}
