interface GradientType {
  type?: "linear" | "radial";
  colors: Array<{
    color: string;
    stop?: number;
  }>;
  degree: number;
}
export type { GradientType };
