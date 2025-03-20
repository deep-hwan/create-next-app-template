import Avatar from '@/@widgets/image/Avatar';
import Image from '@/@widgets/image/Image';
import { useMoment } from '@/libs/hooks';
import { colors } from '@/libs/themes';
import { Background, Flex, Padding, Text } from '@/@dble_layout';

const ChatMessageCard = ({
  isSender,
  avatarUrl,
  name,
  message,
  avatarOnClick,
  maxWidth = 240,
  file,
  createdAt,
}: {
  isSender?: boolean;
  avatarUrl: string;
  name: string;
  message: string;
  avatarOnClick?: () => void;
  maxWidth?: number;
  file?: { name: string; url: string } | null;
  createdAt?: Date;
}) => {
  const splitImages = () => {
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      return fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'jpeg';
    }
    return false;
  };

  return (
    <Padding left={isSender ? 30 : 0} right={isSender ? 0 : 30}>
      <Flex align='end'>
        <Flex
          direc='row'
          justify={isSender ? 'end' : 'start'}
          align='end'
          transition={{ duration: 0, type: 'ease-in-out' }}
        >
          <Flex w='auto' direc='row' gap={6} align='start' order={isSender ? 1 : 0}>
            {!isSender && <Avatar source={avatarUrl} alt='avatar' size={32} onClick={avatarOnClick} />}
            <Flex gap={3} w='auto' maxW={maxWidth}>
              {!isSender && (
                <Text size={11} color='#9298a4'>
                  {name}
                </Text>
              )}

              <Flex align={isSender ? 'end' : 'start'}>
                {!!message && (
                  <Background
                    fill={isSender ? colors.keyColor : '#ebecef'}
                    border={{ radius: isSender ? '14px 2px 14px 14px' : '2px 14px 14px 14px' }}
                  >
                    <Padding vertical={7} horizontal={10}>
                      <Text size={14} color={isSender ? '#fff' : '#59595a'}>
                        {message}
                      </Text>
                    </Padding>
                  </Background>
                )}

                {!!file && splitImages() && (
                  <Image
                    source={file?.url}
                    alt={file?.name ?? 'image'}
                    size={{ minWidth: 180, maxWidth: 180 }}
                    objectFit='cover'
                    borderRadius={isSender ? '14px 2px 14px 14px' : '2px 14px 14px 14px'}
                  />
                )}

                {!!file && !splitImages() && (
                  <Background
                    border={{
                      radius: isSender ? '14px 2px 14px 14px' : '2px 14px 14px 14px',
                      stroke: 1,
                      color: '#eee',
                    }}
                    fill='#f6f6fa'
                  >
                    <Padding horizontal={16} vertical={25}>
                      <Flex align='center' gap={6}>
                        <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M11.002 14.664C10.908 14.6643 10.8149 14.646 10.7281 14.6101C10.6412 14.5743 10.5624 14.5215 10.496 14.455L5.59601 9.50299C5.50334 9.40656 5.44151 9.28471 5.41839 9.15299C5.39528 9.02127 5.41193 8.88565 5.46623 8.76344C5.52052 8.64122 5.60999 8.53795 5.72323 8.46681C5.83647 8.39566 5.96834 8.35987 6.10201 8.36399H8.66701V3.18899C8.67305 2.88538 8.79914 2.59654 9.01768 2.38569C9.23621 2.17484 9.52938 2.05917 9.83301 2.06399H12.165C12.4686 2.05917 12.7618 2.17484 12.9803 2.38569C13.1989 2.59654 13.325 2.88538 13.331 3.18899V8.36399H15.896C16.0305 8.35904 16.1634 8.39452 16.2775 8.46584C16.3916 8.53716 16.4817 8.64105 16.5362 8.7641C16.5906 8.88715 16.607 9.0237 16.583 9.15612C16.5591 9.28855 16.4961 9.41076 16.402 9.50699L11.502 14.464C11.368 14.5936 11.1885 14.6655 11.002 14.664Z'
                            fill='#afb5c8'
                          />
                          <path
                            d='M20.393 19.936H1.6C1.17949 19.9381 0.775217 19.7738 0.475443 19.4789C0.17567 19.184 0.0047491 18.7825 0 18.362L0 17.912C0.00422429 17.4911 0.174914 17.0891 0.474744 16.7938C0.774575 16.4984 1.17915 16.3338 1.6 16.336H20.393C20.8149 16.332 21.2211 16.4956 21.5224 16.7909C21.8237 17.0862 21.9955 17.4891 22 17.911V18.361C21.9955 18.7829 21.8237 19.1857 21.5224 19.481C21.2211 19.7763 20.8149 19.94 20.393 19.936Z'
                            fill='#afb5c8'
                          />
                        </svg>

                        <Text size={12} color='#9298a4'>
                          파일을 다운로드하세요
                        </Text>
                      </Flex>
                    </Padding>
                  </Background>
                )}
              </Flex>
            </Flex>
          </Flex>

          <Flex w='auto' order={!isSender ? 1 : 0}>
            <Text
              size={9}
              color='#aaa'
              align={isSender ? 'end' : 'start'}
              padding={{ horizontal: 4, vertical: 2 }}
              transition={{ duration: 0, type: 'ease-in-out' }}
              whiteSpace='nowrap'
            >
              {useMoment(createdAt ?? new Date()).fromNow()}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Padding>
  );
};

export default ChatMessageCard;
