import { Flex, Padding, Text } from '@/@dble_layout';
import { LoadingSpinner } from '@/@widgets/loading/LoadingSpinner';
import WidgetContainer from './_WidgetContainer';

export const 로딩 = () => {
  return (
    <WidgetContainer
      title='로딩 화면'
      delay={0.4}
      description='우리는 작은 것에도 지나치지 않으며 오로지 디테일에 집중하고 있어요'
    >
      <Padding all={10}>
        <Flex align='center' justify='center' gap={15}>
          <LoadingSpinner />

          <Text size={13} color='#aaa'>
            현재 정보를 가져오는 중입니다 ...
          </Text>
        </Flex>
      </Padding>
    </WidgetContainer>
  );
};
