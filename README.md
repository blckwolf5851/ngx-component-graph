# NgxComponentGraph

[The Demo](https://blckwolf5851.github.io/ngx-component-graph/)
[Documentation](https://github.com/blckwolf5851/ngx-component-graph)

This library is the component graph version of [ngx-graph](https://www.npmjs.com/package/@swimlane/ngx-graph), it is also very similar to angular version of [react-flow-renderer](https://www.npmjs.com/package/react-flow-renderer). 

ngx-graph provided the ability to use svgs as nodes, this library extends its functionality and allows user to pass in any angular component to be nodes of the graph. Specifically the features include:
1. Customize node style from your component
2. Pass in different component for each node
3. Customize edges
4. Panzoom
5. Drag and drop
6. Extending Node type to adding payload and carry extra data

## Basic Usage
This example shows how you can pass custom style and data into the nodes.

![image](https://user-images.githubusercontent.com/47068763/147889432-ae0a10b7-950a-4810-9f05-064cdfe32b6b.png)

```html
<ngx-component-graph
  [nodes]="raw_nodes"
  [edges]="raw_edges"
  [viewportWidth]="600"
  [viewportHeight]="400"
>
</ngx-component-graph>
```

Where `raw_nodes` and `raw_edges` are defined in `.ts` file as:
```js
import { Edge, Node } from 'ngx-component-graph';

// This is how you can pass in your own data
interface CustomNode extends Node {
  payload?: object;
}

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
      style: { width: '200px', border: 'dotted 4px #cc3' }, // pass custom style to node
      payload: { title: 'Nice component!' }, // carry custom data for display
    },
    {
      id: 'node2',
      style: { width: '300px', border: 'dotted 2px #ccc' },
    },
    {
      id: 'node3',
    },
    {
      id: 'node4',
    },
    {
      id: 'node5',
    },
  ];
```

## Custom Templates

If you want to add custom components into each node, or customize the handle / edges. You would want to pass your components into the templates, in example below, an angular material expansion-panel + card is passed into nodes. This example is an extension of above example, all the styles and data extension are used.

![Alt Text](https://media.giphy.com/media/ZEUsR1niIzmCwtDlSu/giphy.gif)

```html
<ngx-component-graph
  [nodes]="raw_nodes"
  [edges]="raw_edges"
  [viewportWidth]="600"
  [viewportHeight]="400"
>
  <!-- Custom Drag Handle (changed color and shape) -->
  <ng-template #handleTemplate>
    <svg width="24px" fill="currentColor" viewBox="0 0 24 24">
      <rect fill="#cc3" x="15" y="5" width="20" height="20" rx="5"></rect>
    </svg>
  </ng-template>
  <!-- Custom Nodes (passed in components) -->
  <ng-template #nodeTemplate let-node>
    <mat-accordion>
      <mat-expansion-panel hideToggle>
        <mat-expansion-panel-header>
          <mat-panel-title>
            {{
              node.payload ? node.payload.title : "placeholder"
            }}</mat-panel-title
          >
        </mat-expansion-panel-header>
        <mat-card class="example-card">
          <mat-card-header>
            <div mat-card-avatar class="example-header-image"></div>
            <mat-card-title>Shiba Inu</mat-card-title>
            <mat-card-subtitle>Dog Breed</mat-card-subtitle>
          </mat-card-header>
          <img
            mat-card-image
            src="https://material.angular.io/assets/img/examples/shiba2.jpg"
            alt="Photo of a Shiba Inu"
          />
          <mat-card-content>
            <p>
              The Shiba Inu is the smallest of the six original and distinct
              spitz breeds of dog from Japan. A small, agile dog that copes very
              well with mountainous terrain, the Shiba Inu was originally bred
              for hunting.
            </p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button>LIKE</button>
            <button mat-button>SHARE</button>
          </mat-card-actions>
        </mat-card>
      </mat-expansion-panel>
    </mat-accordion>
  </ng-template>
  <!-- Custom Edges (just changed the color here) -->
  <ng-template #edgeTemplate let-edge>
    <svg:path [attr.d]="edge.bezierPath" fill="transparent" stroke="green" />
  </ng-template>
</ngx-component-graph>
```

## Feedback

For feedback and questions, email sherry.shanli.yuan@gmail.com
