interface TransitionType {
  duration: number;
  type?:
    | "ease"
    | "linear"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "step-start"
    | "step-end"
    | "steps"
    | "cubic-bezier"
    | string;
}

export type { TransitionType };
