# TypeScript Next.js example

## How to use it?

```bash
yarn install
yarn dev
```

## Examples

See `pages\example.tsx` for an example of xarrow package usage.

## Xarrows Types

```typescript
type xarrowPropsType = {
  start: refType;
  end: refType;
  startAnchor?: anchorType | anchorType[];
  endAnchor?: anchorType | anchorType[];
  label?: labelType | labelsType;
  color?: string;
  lineColor?: string | null;
  headColor?: string | null;
  strokeWidth?: number;
  headSize?: number;
  path?: "smooth" | "grid" | "straight";
  curveness?: number;
  dashness?:
    | boolean
    | {
        strokeLen?: number;
        nonStrokeLen?: number;
        animation?: boolean | number;
      };
  passProps?: React.SVGProps<SVGPathElement>;
  extendSVGcanvas?: number;
  SVGcanvasProps?: React.SVGAttributes<SVGSVGElement>;
  arrowBodyProps?: React.SVGProps<SVGPathElement>;
  arrowHeadProps?: React.SVGProps<SVGPathElement>;
  divContainerProps?: React.HTMLProps<HTMLDivElement>;
};
type anchorType = anchorPositionType | anchorCustomPositionType;
type anchorPositionType =
  | "middle"
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "auto";
type anchorCustomPositionType = {
  position: anchorPositionType;
  offset: {
    rightness: number;
    bottomness: number;
  };
};
type reactRefType = {
  current: null | HTMLElement;
};
type refType = reactRefType | string;
type labelsType = {
  start?: labelType;
  middle?: labelType;
  end?: labelType;
};
type labelType = JSX.Element;
type domEventType = keyof GlobalEventHandlersEventMap;
type registerEventsType = {
  ref: refType;
  eventName: domEventType;
  callback?: CallableFunction;
};
const Xarrow: React.FC<xarrowPropsType>;
export default Xarrow;
```

## Source

https://github.com/Eliav2/react-xarrows
