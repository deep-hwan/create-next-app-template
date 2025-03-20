import { Flex, Padding, Position, Skeleton, Text, TouchableOpacity } from '@/@dble_layout';
import Avatar from '@/@widgets/image/Avatar';
import React, { memo } from 'react';

type Type = {
  users: {
    id?: string;
    avatarUrl: string;
    name: string;
  }[];
  lastMessage: string;
  updatedAt: string;
  unreadCount?: number;
  isLoading?: boolean;
  onClick?: () => void;
  children?: never[];
};

// Memoize the ChatRoomCard component
export const ChatRoomCard = memo(({ users, lastMessage, updatedAt, unreadCount, isLoading, onClick }: Type) => {
  const ChatRoomName = () => {
    if (users?.length === 1) {
      return <Name name={users[0].name} />;
    }

    if (users?.length === 2) {
      return (
        <Flex direc='row' gap={3}>
          <Name name={users[0].name} />
          <Name name={','} />
          <Name name={users[1].name} />
        </Flex>
      );
    }

    return (
      <Flex direc='row' gap={3}>
        <Name name={users[0].name} />
        <Name name={','} />
        <Name name={users[1].name} />
        <Name name={`외 ${users.length - 2}명`} />
      </Flex>
    );
  };

  if (isLoading)
    return (
      <Padding all={10}>
        <Flex direc='row' gap={10}>
          <Skeleton w={44} h={44} radius={18} />
          <Flex direc='column' gap={3}>
            <Skeleton w={100} h={20} radius={6} />
            <Skeleton h={18} radius={5} />
          </Flex>
        </Flex>
      </Padding>
    );

  return (
    <TouchableOpacity className='chat-room-card' padding={{ all: 10 }} onClick={onClick}>
      <Flex direc='row' gap={10}>
        {users?.length === 1 && <Avatar source={users[0].avatarUrl} alt={users[0].name} size={44} borderRadius={18} />}
        {users?.length === 2 && (
          <AvatarWrapper>
            <Position type='absolute' top={0} left={0} zIndex={1}>
              <Avatar source={users[0].avatarUrl} alt={users[0].name} size={30} />
            </Position>
            <Position type='absolute' bottom={0} right={0}>
              <Avatar source={users[1].avatarUrl} alt={users[1].name} size={30} />
            </Position>
          </AvatarWrapper>
        )}
        {users?.length === 3 && (
          <AvatarWrapper>
            <Flex direc='row' gap={2}>
              <Avatar source={users[0].avatarUrl} alt={users[0].name} size={21} />
              <Avatar source={users[1].avatarUrl} alt={users[1].name} size={21} />
            </Flex>
            <Flex direc='row' gap={2}>
              <Avatar source={users[2].avatarUrl} alt={users[2].name} size={21} />
            </Flex>
          </AvatarWrapper>
        )}

        {users?.length > 3 && (
          <AvatarWrapper>
            <Flex direc='row' gap={2}>
              <Avatar source={users[0].avatarUrl} alt={users[0].name} size={21} />
              <Avatar source={users[1].avatarUrl} alt={users[1].name} size={21} />
            </Flex>
            <Flex direc='row' gap={2}>
              <Avatar source={users[2].avatarUrl} alt={users[2].name} size={21} />
              <Avatar source={users[3].avatarUrl} alt={users[3].name} size={21} />
            </Flex>
          </AvatarWrapper>
        )}

        <Flex direc='row' align='start' justify='space-between' gap={20}>
          <Flex w='auto' direc='column' align='start' gap={1}>
            <ChatRoomName />

            <Text size={13} color='#69696a' align='start' ellipsis={{ isActive: true, line: 2 }}>
              {lastMessage}
            </Text>
          </Flex>

          <Flex w='auto' direc='column' align='end' gap={4}>
            <Text size={11} color='#aaa' whiteSpace='nowrap'>
              {updatedAt}
            </Text>

            {unreadCount && unreadCount > 0 && (
              <div
                css={{
                  minWidth: 20,
                  maxWidth: 20,
                  minHeight: 20,
                  maxHeight: 20,
                  borderRadius: 100,
                  backgroundColor: '#f46969',
                  fontSize: 11,
                  color: '#fff',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </div>
            )}
          </Flex>
        </Flex>
      </Flex>
    </TouchableOpacity>
  );
});

const Name = memo(({ name }: { name: string }) => {
  return (
    <Text as='b' w='auto' maxW={120} size={15} align='start' ellipsis={{ isActive: true, line: 1 }}>
      {name}
    </Text>
  );
});

const AvatarWrapper = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w='auto' maxW={44} minW={44} maxH={44} minH={44} gap={2}>
      {children}
    </Flex>
  );
});
