import { Flex, Padding, Text } from '@/@dble_layout';
import { CardContainer } from '@/@widgets/card/CardContainer';
import { MotionDiv } from '@/@widgets/motion/MotionDiv';
import dynamic from 'next/dynamic';
import React, { forwardRef, useRef } from 'react';

type Types = {
  title: string;
  description: string;
  children: React.ReactNode;
  delay?: number;
};

const WWidgetContainerComponent = forwardRef<HTMLDivElement, Types>((props, ref) => {
  const motionRef = useRef<HTMLDivElement>(null);

  const currentRef = ref || motionRef;

  return (
    <MotionDiv y={0} delay={props.delay} ref={currentRef}>
      <CardContainer fill='rgba(255,255,255,0.5)'>
        <Padding top={10} horizontal={10} bottom={15}>
          <Flex gap={4}>
            <Text as='strong' size={16}>
              {props.title}
            </Text>

            <Text size={14} color='#797979'>
              {props.description}
            </Text>
          </Flex>
        </Padding>

        <Flex>{props.children}</Flex>
      </CardContainer>
    </MotionDiv>
  );
});

const WidgetContainer = dynamic(() => Promise.resolve(WWidgetContainerComponent), {
  ssr: false,
  loading: () => <></>,
});

export default WidgetContainer;
