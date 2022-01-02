import * as dagre from "dagre";
// import dagre, { graphlib } from "dagre";

import { Edge, Node } from "./types";

const BOTTOM_TO_TOP = 'TB';

/**
 * calculate the specific location of each node in the graph
 */
export function calcLayout(nodes: Node[], edges: Edge[]) {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: BOTTOM_TO_TOP });
  g.setDefaultEdgeLabel(() => ({}));

  // make a new instance of { width, height } per node, or dagre will get confused and place all nodes in the same spot
  nodes.forEach((n) => g.setNode(n.id, { width: n.width, height: n.height }));
  edges.forEach((e) => g.setEdge({ v: e.source, w: e.target }));

  // position items in graph
  dagre.layout(g);

  const positionsArr: [string, { x: number; y: number }][] = g.nodes().map((nodeId: string) => {
    const node = g.node(nodeId);

    const pos = {
      x: node.x - node.width / 2,
      y: node.y - node.height / 2,
    };

    return [nodeId, pos];
  });

  return new Map(positionsArr);
}