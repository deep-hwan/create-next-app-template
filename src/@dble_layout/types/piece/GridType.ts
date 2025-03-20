interface GridType {
  templateColumns?: string;
  templateRows?: string; // grid-template-rows
  templateAreas?: string; // grid-template-areas
  gap?: string | number; // grid-gap
  autoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense'; // grid-auto-flow
  autoColumns?: string; // grid-auto-columns
  autoRows?: string; // grid-auto-rows
  justifyItems?: 'start' | 'end' | 'center' | 'stretch'; // justify-items
  alignItems?: 'start' | 'end' | 'center' | 'stretch'; // align-items
  justifyContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around'; // justify-content
  alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around'; // align-content
}

export type { GridType };
