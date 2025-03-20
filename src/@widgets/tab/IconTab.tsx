import { Flex, TouchableOpacity } from '@/@dble_layout';
import { css } from '@emotion/react';

interface IconTabProps {
  icon: React.ReactNode;
  iconSize?: number;
  children?: never[];
  onClick?: () => void;
}

export const IconTab = ({ icon, iconSize = 20, onClick }: IconTabProps) => {
  const tabSize = iconSize + 10;

  return (
    <TouchableOpacity
      padding={{ all: 2 }}
      onClick={onClick}
      css={css`
        position: relative;
        svg,
        img,
        picture {
          z-index: 1;
          min-width: ${iconSize}px;
        }
      `}
      _hover={{ opacity: 0.8 }}
      _active={{ opacity: 0.6 }}
    >
      <Flex align='center' justify='center'>
        {icon}
      </Flex>
    </TouchableOpacity>
  );
};
