import { Background, Flex, Padding, Skeleton, Text, TouchableOpacity } from '@/@dble_layout';
import Dialog from '@/@widgets/modal/Dialog';
import { Modal } from '@/@widgets/modal/Modal';
import { useState } from 'react';
import WidgetContainer from './_WidgetContainer';

export const 모달 = () => {
  const [isOpen, setIsOpen] = useState<'모달' | '다이아로그' | null>(null);

  return (
    <>
      <WidgetContainer
        title='네이티브 모달'
        delay={0.5}
        description='네이티브 모달을 웹 환경에서도 부드러운 애니매이션으로 경험할 수 있어요'
      >
        <Padding horizontal={10} bottom={10}>
          <Flex gap={10}>
            {[
              {
                title: 'Modal 경험하기',
                description: '팝업 또는 상세 화면에 주로 사용해요',
                event: () => setIsOpen('모달'),
              },
              {
                title: 'Dialog 경험하기',
                description: '확인 유무 처리할 때 주로 사용해요',
                event: () => setIsOpen('다이아로그'),
              },
            ].map(el => (
              <TouchableOpacity onClick={el.event}>
                <Background fill='#f5f6fa' border={{ radius: 18 }}>
                  <Padding all={16}>
                    <Flex direc='row' gap={20} align='center' justify='space-between'>
                      <Flex gap={4}>
                        <Text as='b' size={15}>
                          {el.title}
                        </Text>
                        <Text size={13} color='#69696a'>
                          {el.description}
                        </Text>
                      </Flex>

                      <svg width='14' height='14' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <mask id='mask0_501_2' maskUnits='userSpaceOnUse' x='5' y='0' width='12' height='22'>
                          <path
                            d='M5.60231 22L16.3966 22L16.3966 4.76837e-07L5.6023 1.4205e-06L5.60231 22Z'
                            fill='white'
                          />
                        </mask>
                        <g mask='url(#mask0_501_2)'>
                          <path
                            d='M5.93238 2.123L13.4828 10.8669L6.12598 19.9001C5.91951 20.1311 5.80656 20.4307 5.80918 20.7405C5.80695 21.0709 5.93546 21.3888 6.16668 21.6249C6.28002 21.7423 6.41563 21.836 6.5656 21.9004C6.71557 21.9648 6.87687 21.9987 7.04008 22C7.20642 21.9966 7.37044 21.9603 7.52263 21.8931C7.67482 21.8258 7.81216 21.7291 7.92668 21.6084L16.0667 11.6908C16.2826 11.4551 16.4011 11.1463 16.3985 10.8267C16.3958 10.5071 16.2721 10.2003 16.0524 9.9682L7.69238 0.3828C7.58082 0.26188 7.44543 0.165376 7.29473 0.0993703C7.14403 0.0333646 6.9813 -0.000712048 6.81678 -0.000712034C6.65226 -0.00071202 6.48952 0.0333647 6.33882 0.0993704C6.18813 0.165376 6.05273 0.26188 5.94118 0.382801C5.72331 0.619356 5.60147 0.928636 5.59943 1.25022C5.5974 1.57181 5.71532 1.88261 5.93018 2.1219'
                            fill='#9b9ea4'
                          />
                        </g>
                      </svg>
                    </Flex>
                  </Padding>
                </Background>
              </TouchableOpacity>
            ))}
          </Flex>
        </Padding>
      </WidgetContainer>

      <Dialog
        open={isOpen === '다이아로그'}
        onClose={() => setIsOpen(null)}
        title='이어서 구경하시겠어요?'
        description='확인 버튼을 누르면 위젯을 이어서 볼 수 있어요'
        tabName='닫기'
        onResult={() => setIsOpen(null)}
      />

      <Modal
        open={isOpen === '모달'}
        onClose={() => setIsOpen(null)}
        isMobileBottomSheetMode
        headerExtanedComponent={
          <Padding all={20}>
            <Flex direc='row' justify='space-between'>
              <Text as='strong' size={20}>
                채팅 목록
              </Text>
            </Flex>
          </Padding>
        }
      >
        <Padding horizontal={20} bottom={20} top={10}>
          <Flex gap={15}>
            {Array.from({ length: 15 }).map((_, index) => (
              <ChatCard />
            ))}
          </Flex>
        </Padding>
      </Modal>
    </>
  );
};

const ChatCard = () => {
  return (
    <Flex direc='row' gap={10}>
      <Skeleton w={40} h={40} radius={12} />

      <Flex direc='column' gap={6}>
        <Skeleton w={100} h={12} />
        <Skeleton h={22} />
      </Flex>
    </Flex>
  );
};
