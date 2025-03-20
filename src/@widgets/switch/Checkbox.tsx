import { Flex, Text, TouchableOpacity } from '@/@dble_layout';
import { colors } from '@/libs/themes';
import React from 'react';

interface Props {
  name: string;
  checked: boolean;
  onClick: () => void;
}

export const Checkbox = React.memo(
  React.forwardRef<HTMLDivElement, Props>(({ name, checked, onClick }, ref) => {
    const checkboxSize = 18;

    return (
      <TouchableOpacity onClick={onClick}>
        <Flex direc='row' gap={9} align='start'>
          <div
            css={{
              minWidth: checkboxSize,
              maxWidth: checkboxSize,
              minHeight: checkboxSize,
              maxHeight: checkboxSize,
              border: checked ? `1px solid ${colors.keyColor}` : '1px solid #e2e2e2',
              backgroundColor: checked ? colors.keyColor : '#fff',
              borderRadius: checkboxSize - 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease-in-out',
              marginTop: 2.3,
            }}
          >
            <svg
              width={checkboxSize - 8}
              height={checkboxSize - 8}
              viewBox='0 0 22 22'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clip-path='url(#clip0_0_685)'>
                <path
                  d='M21.5709 4.40279C21.0155 3.86574 20.0436 3.86574 19.4756 4.40279L8.9868 14.558L2.52438 8.30863C2.2467 8.0401 1.86804 7.89364 1.47676 7.89364C1.08548 7.89364 0.706827 8.0401 0.429145 8.30863C0.151463 8.57716 0 8.94333 0 9.32171C0 9.70009 0.151463 10.0663 0.429145 10.3348L7.92656 17.585C8.48193 18.1221 9.45382 18.1221 10.0218 17.585L21.5709 6.42894C21.8485 6.16042 22 5.79425 22 5.41587C22 5.03749 21.8485 4.67132 21.5709 4.40279Z'
                  fill={checked ? '#fff' : '#dadbde'}
                />
              </g>
              <defs>
                <clipPath id='clip0_0_685'>
                  <rect width='22' height='14' fill='white' transform='translate(0 4)' />
                </clipPath>
              </defs>
            </svg>
          </div>

          <Text size={14} color='#5c5d62' userSelect='none'>
            {name}
          </Text>
        </Flex>
      </TouchableOpacity>
    );
  })
);
