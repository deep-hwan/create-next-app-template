import { Flex, Spacing } from '@/@dble_layout';
import { ChatRoomCard } from '@/@widgets/chat/ChatRoomCard';
import Pagination from '@/@widgets/switch/Pagination';
import { memo, useCallback, useRef, useState } from 'react';
import WidgetContainer from './_WidgetContainer';

const 채팅목록 = () => {
  const motionRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = useCallback((pageNumber: number) => {
    // Save the current scroll position
    const scrollPosition = window.scrollY;

    setActivePage(pageNumber);

    // Restore the scroll position
    window.scrollTo(0, scrollPosition);
  }, []);

  return (
    <WidgetContainer
      ref={motionRef}
      title='채팅 목록'
      description='DBLE 위젯으로 개인 채팅부터 단체 채팅까지 채팅 목록을 빠르게 만들 수 있어요!'
      delay={0.2}
    >
      <Flex align='center' gap={20}>
        <Flex gap={5}>
          <ViewWrapper isActive={activePage === 1}>
            <ChatRoomCard
              users={users.slice(0, 1)}
              lastMessage='다양한 위젯을 경험해보세요!'
              updatedAt='방금 전'
              unreadCount={5}
            />
            <ChatRoomCard
              users={users.slice(1, 2)}
              lastMessage='채팅방 디자인과 개발을 책임질게요'
              updatedAt='10분 전'
              unreadCount={1}
            />
            <ChatRoomCard
              users={users.slice(1, 3)}
              lastMessage='단체 채팅방도 쉽게 만들 수 있어요'
              updatedAt='1시간 전'
              unreadCount={10}
            />
          </ViewWrapper>

          <ViewWrapper isActive={activePage === 2}>
            <ChatRoomCard
              users={users.slice(3, 4)}
              lastMessage='빠른 성능과 효율적인 디자인 설계를 추구해요'
              updatedAt='어제'
            />
            <ChatRoomCard users={users.slice(5, 6)} lastMessage='채팅방 디자인과 개발을 책임질게요' updatedAt='어제' />
            <ChatRoomCard users={users.slice(1, 7)} lastMessage='당신의 상상을 책임질게요!' updatedAt='1시간 전' />
          </ViewWrapper>

          <ViewWrapper isActive={activePage === 3}>
            <ChatRoomCard users={users.slice(7, 8)} lastMessage='우리는 디자인에 진심이에요' updatedAt='어제' />
          </ViewWrapper>
        </Flex>

        <Pagination
          itemsCountPerPage={3}
          totalItemsCount={7}
          pageRangeDisplayed={3}
          activePage={activePage}
          activeScrollTop={false}
          onChange={handlePageChange}
        />
      </Flex>
      <Spacing size={5} />
    </WidgetContainer>
  );
};

export { 채팅목록 };

const users = [
  {
    id: '1',
    avatarUrl: '/assets/favicon/favicon-512x512.png',
    name: 'DBLE TEAM',
  },
  {
    id: '2',
    avatarUrl: '/assets/images/sample/avatar1.png',
    name: 'Micha',
  },
  {
    id: '3',
    avatarUrl: '/assets/images/sample/avatar2.png',
    name: 'Jane',
  },
  {
    id: '4',
    avatarUrl: '/assets/images/sample/avatar3.png',
    name: 'John',
  },
  {
    id: '5',
    avatarUrl: '/assets/images/sample/avatar4.png',
    name: 'Emily',
  },
  {
    id: '6',
    avatarUrl: '/assets/images/sample/avatar5.png',
    name: 'Michael',
  },
  {
    id: '7',
    avatarUrl: '/assets/images/sample/avatar6.png',
    name: 'Olivia',
  },
  {
    id: '8',
    avatarUrl: '/assets/images/sample/avatar7.png',
    name: 'William',
  },
];

const ViewWrapper = memo(({ children, isActive }: { children: React.ReactNode; isActive: boolean }) => (
  <div
    css={{
      height: isActive ? 'auto' : 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
    }}
  >
    {children}
  </div>
));
