import { ComponentPropsWithoutRef } from "react";
import { LayoutElementType } from "./LayoutElementType";

export type LayoutPropsRef = Omit<
  ComponentPropsWithoutRef<LayoutElementType>,
  ExcludedProps
>;

export type ExcludedProps =
  | "size"
  | "sizes"
  | "color"
  | "title"
  | "hidden"
  | "title"
  | "translate"
  | "radioGroup"
  | "dir";
