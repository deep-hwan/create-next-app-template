interface BackgroundType {
  fill?: never | string;
  imageUrl?: never | string;
  repeat?: 'repeat-x' | 'repeat-y' | 'repeat' | 'space' | 'round' | 'no-repeat';
  size?: 'contain' | 'cover' | string;
  position?: 'top' | 'bottom' | 'center' | 'left' | 'right' | 'string';
  clip?: 'border-box' | 'padding-box' | 'content-box' | 'initial' | 'inherit';
  blur?: number;
}
export type { BackgroundType };
