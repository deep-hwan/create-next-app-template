import { TypographyType } from "../types/piece/TypographyType";
import { TextElementType } from "../types/props/TextPropsType";

type Props = TypographyType & { as?: TextElementType };

type EllipsisStyles = {
  overflow: string;
  whiteSpace: string;
  textOverflow: string;
  display: string;
  WebkitBoxOrient: string;
  wordBreak: string;
  WebkitLineClamp: number;
  padding: number;
};

const typographyStylesProps = ({
  as,
  txtSize,
  txtWeight,
  txtAlign,
  txtColor,
  txtShadow,
  txtTransform,
  lineHeight,
  whiteSpace,
  ellipsis,
  txtDecoration,
}: Props) => {
  const TYPOGRAPH_WEIGHT = {
    thin: { fontWeight: "100" },
    extraLight: { fontWeight: "200" },
    lighter: { fontWeight: "300" },
    normal: { fontWeight: "400" },
    medium: { fontWeight: "500" },
    bold: { fontWeight: "600" },
    extraBold: { fontWeight: "700" },
    black: { fontWeight: "800" },
    heavy: { fontWeight: "900" },
  } as const;

  const txtWeightExtend = () => {
    if (txtWeight) return TYPOGRAPH_WEIGHT[txtWeight].fontWeight;
    if (as && !txtWeight) {
      if (as === "h1") return TYPOGRAPH_WEIGHT["bold"].fontWeight;
      if (as === "h2") return TYPOGRAPH_WEIGHT["bold"].fontWeight;
      if (as === "h3") return TYPOGRAPH_WEIGHT["bold"].fontWeight;
      if (as === "h4") return TYPOGRAPH_WEIGHT["bold"].fontWeight;
      if (as === "h5") return TYPOGRAPH_WEIGHT["bold"].fontWeight;
      if (as === "h6") return TYPOGRAPH_WEIGHT["bold"].fontWeight;
      if (as === "b") return TYPOGRAPH_WEIGHT["bold"].fontWeight;
      if (as === "strong") return TYPOGRAPH_WEIGHT["medium"].fontWeight;
      if (as === "i") return TYPOGRAPH_WEIGHT["normal"].fontWeight;
      if (as === "p") return TYPOGRAPH_WEIGHT["normal"].fontWeight;
      if (as === "span") return TYPOGRAPH_WEIGHT["normal"].fontWeight;
      if (as === "div") return TYPOGRAPH_WEIGHT["normal"].fontWeight;
    }
    return;
  };

  const txtSizeExtend = () => {
    if (txtSize)
      return typeof txtSize === "string"
        ? txtSize
        : (txtSize ?? 15) / 16 + "rem";
    if (as && !txtSize) {
      if (as === "h1") return 54 / 16 + "rem";
      if (as === "h2") return 46 / 16 + "rem";
      if (as === "h3") return 42 / 16 + "rem";
      if (as === "h4") return 38 / 16 + "rem";
      if (as === "h5") return 30 / 16 + "rem";
      if (as === "h6") return 26 / 16 + "rem";
      if (as === "b") return 18 / 16 + "rem";
      if (as === "strong") return 18 / 16 + "rem";
      if (as === "i") return 15 / 16 + "rem";
      if (as === "p") return 15 / 16 + "rem";
      if (as === "span") return 13 / 16 + "rem";
      if (as === "div") return 15 / 16 + "rem";

      return typeof txtSize === "string"
        ? txtSize
        : (txtSize ?? 15 / 16) + "rem";
    }
  };

  const ellipsisExtend: EllipsisStyles | object = ellipsis?.isActive
    ? {
        overflow: "hidden",
        whiteSpace: "normal",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        wordBreak: "keep-all",
        WebkitLineClamp: ellipsis.line ?? 1,
        padding: 0,
      }
    : {};

  return {
    fontSize: txtSizeExtend(),
    fontWeight: txtWeightExtend(),
    textAlign: txtAlign,
    color: txtColor,
    textShadow: txtShadow,
    textTransform: txtTransform,
    lineHeight: lineHeight,
    whiteSpace: whiteSpace,
    textDecoration: txtDecoration,
    ...ellipsisExtend,
  };
};

export { typographyStylesProps };
