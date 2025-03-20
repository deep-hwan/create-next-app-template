interface PositionType {
  type?: 'static' | 'relative' | 'fixed' | 'absolute' | 'sticky';
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
}

export type { PositionType };
