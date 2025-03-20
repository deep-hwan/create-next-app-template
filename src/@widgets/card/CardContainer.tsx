import { Background, Padding } from '@/@dble_layout';

export const CardContainer = ({
  children,
  fill,
  isShadow,
}: {
  children: React.ReactNode;
  fill?: string;
  isShadow?: boolean;
}) => {
  return (
    <Background
      fill={fill ?? '#f7f7fa'}
      border={{ stroke: 1, color: '#eee', radius: 25 }}
      shadow={isShadow ? { x: 0, y: 1, blur: 25, color: '#e8e8e8' } : undefined}
    >
      <Padding all={10}>{children}</Padding>
    </Background>
  );
};
