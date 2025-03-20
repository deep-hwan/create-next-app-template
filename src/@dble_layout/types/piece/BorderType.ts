interface BorderType {
  radius?: number | string;
  stroke?: number;
  position?: "all" | "left" | "right" | "top" | "bottom";
  color?: string;
  shape?:
    | "solid"
    | "dotted"
    | "dashed"
    | "double"
    | "outset"
    | "inset"
    | "groove"
    | "ridge";
}

export type { BorderType };
