import { View } from '@/app/_layout/View';
import { 간편로그인 } from '@/app/home/간편로그인';
import { 구매완료 } from '@/app/home/구매완료';
import { 달력 } from '@/app/home/달력';
import { 로딩 } from '@/app/home/로딩';
import { 모달 } from '@/app/home/모달';
import { 슬라이딩메뉴 } from '@/app/home/슬라이딩메뉴';
import { 인풋 } from '@/app/home/인풋';
import { 장바구니 } from '@/app/home/장바구니';
import { 채팅목록 } from '@/app/home/채팅목록';
import { 채팅방 } from '@/app/home/채팅방';

import { Flex } from '@/@dble_layout';
import SEOHead from '@/libs/site/SeoHead';

export default function Index() {
  return (
    <>
      <SEOHead
        title='Dble | 위젯, 컴포넌트'
        description='Dble | 디블에이전시에서 트랜디한 UIUX 디자인 및 컴포넌트 위젯을 무료로 다운로드하고 사용할 수 있어요'
      />

      <View maxWidth={1200}>
        <Flex align='center' maxW={1200} _mq={{ w1200: { maxW: 800 } }}>
          <Flex direc='row' gap={20} align='start' _mq={{ w768: { direc: 'column', gap: 14 } }}>
            <Flex gap={14} maxW={380} _mq={{ w768: { maxW: '100%' } }}>
              <슬라이딩메뉴 />
              <채팅목록 />
              <채팅방 />
            </Flex>

            <Flex direc='row' gap={20} _mq={{ w1200: { direc: 'column', gap: 14 } }}>
              <Flex gap={14}>
                <달력 />
                <로딩 />
                <간편로그인 />
                <인풋 />
              </Flex>

              <Flex gap={14}>
                <장바구니 />
                <구매완료 />
                <모달 />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </View>
    </>
  );
}
