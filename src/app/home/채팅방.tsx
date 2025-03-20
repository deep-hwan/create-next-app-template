import { Flex, Padding, Spacing } from '@/@dble_layout';
import { ChatEditor } from '@/@widgets/chat/ChatEditor';
import ChatMessageCard from '@/@widgets/chat/ChatMessageCard';
import { useUid } from '@/libs/hooks';
import { useRef, useState } from 'react';
import WidgetContainer from './_WidgetContainer';

type ChatMessage = {
  isSender: boolean;
  id: string;
  name: string;
  message: string;
  file?: { name: string; url: string } | null;
};

export const 채팅방 = () => {
  const chatMessagesListRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<ChatMessage[]>([
    { isSender: true, id: '1', name: '나', message: '위젯 디자인은 직접 만들었나요?? 성능은 어떤가요?', file: null },
    {
      isSender: false,
      id: '2',
      name: '디블',
      message:
        '라이브러리 없이 디블이 직접 만든 위젯 시스템이며, 빠른 렌더링 속도와 부드러운 애니메이션 효과를 제공하고 있어요!',
      file: null,
    },
  ]);

  const onUpload = async ({ message, file }: { message: string; file?: ChatMessage['file'] }) => {
    setChats(prevChats => [
      ...prevChats,
      { isSender: true, id: useUid(), name: '나', message: message ?? '', file: file },
    ]);
    setMessage('');
  };

  return (
    <WidgetContainer
      title='채팅방'
      delay={0.4}
      description='웹에서도 네이티브 앱처럼 부드러운 제스처의 채팅방을 쉽고 트랜디하게 만들 수 있어요!'
    >
      <Spacing size={10} />

      <div
        css={{
          width: '100%',
          maxHeight: 260,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Flex gap={12} transition={{ duration: 0 }}>
          {chats.map((chat: ChatMessage) => (
            <ChatMessageCard
              isSender={chat.isSender}
              avatarUrl='/assets/favicon/favicon-512x512.png'
              name={chat.name}
              message={chat.message}
              avatarOnClick={() => {}}
              file={chat.file}
            />
          ))}
        </Flex>
      </div>

      <Spacing size={10} />

      <Padding all={10}>
        <ChatEditor
          isFocus={false}
          placeholder='메시지를 입력하세요'
          value={message}
          onChange={e => setMessage(e.target.value)}
          onUpload={() => onUpload({ message, file: null })}
          onFileUpload={(fileName, fileUrl) => {
            onUpload({ message: '', file: { name: fileName, url: fileUrl } });
          }}
          onImageUpload={(fileName, fileUrl) => onUpload({ message: '', file: { name: fileName, url: fileUrl } })}
        />
      </Padding>
    </WidgetContainer>
  );
};
