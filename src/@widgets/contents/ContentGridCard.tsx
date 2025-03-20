import { Flex, Padding, Spacing, Text, TouchableOpacity } from '@/@dble_layout';
import { CardContainer } from '@/@widgets/card/CardContainer';
import Image from '@/@widgets/image/Image';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Types = {
  index: number;
  href: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  children?: never[];
};

export const ContentGridCard = ({ index, href, title, description, tags, thumbnail }: Types) => {
  const { push } = useRouter();

  return (
    <TouchableOpacity
      itemProp='itemListElement'
      itemScope
      itemType='https://schema.org/ListItem'
      key={index}
      as='li'
      w='100%'
      onClick={() => push(href)}
      _mq={{
        w768: { w: '100%' },
      }}
    >
      <meta itemProp='position' content={`${index}`} />

      <CardContainer>
        <Image
          size={{ minHeight: 207 }}
          ratio={{}}
          source={thumbnail}
          alt={title + '| 디블에이전시'}
          borderRadius={20}
          css={{ cursor: 'pointer' }}
        />

        <Padding top={20} bottom={10} horizontal={10}>
          <Flex>
            <Link href={href} itemProp='url'>
              <Text itemProp='name' as='strong' size={16} color='#47484a' ellipsis={{ isActive: true, line: 1 }}>
                {title}
              </Text>
            </Link>

            <Spacing size={10} />

            <Text itemProp='description' as='p' size={14} ellipsis={{ isActive: true, line: 2 }}>
              {description}
            </Text>

            <Spacing size={10} />

            <Flex direc='row' gap={5} wrap='wrap'>
              {tags.slice(0, 3).map((el: any) => (
                <Text itemProp='category' size={12} color='#89898a' whiteSpace='nowrap'>
                  {'#' + el}
                </Text>
              ))}
            </Flex>
          </Flex>
        </Padding>
      </CardContainer>
    </TouchableOpacity>
  );
};
