interface TypographyType {
  txtSize?: number | string;
  txtWeight?: 'lighter' | 'normal' | 'medium' | 'bold';
  txtAlign?: 'start' | 'end' | 'center';
  txtColor?: string;
  txtShadow?: string;
  txtTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'initial' | 'inherit';
  lineHeight?: number | string;
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line';
  ellipsis?: { isActive?: boolean; line?: number };
  txtDecoration?: 'underline' | string;
}

export type { TypographyType };
