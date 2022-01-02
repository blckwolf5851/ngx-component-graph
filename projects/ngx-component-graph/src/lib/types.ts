export interface Edge {
  id: string;
  source: string;
  target: string;
  bezierPath?: string;
}
export interface Node {
  id: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  style?: object;
  showHandle?: boolean;
}
export interface GetCenterParams {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition?: string;
  targetPosition?: string;
}
export interface GetBezierPathParams {
  sourceX: number;
  sourceY: number;
  sourcePosition?: string;
  targetX: number;
  targetY: number;
  targetPosition?: string;
  centerX?: number;
  centerY?: number;
}
