import { mySite } from '@/libs/site/site';
import { MQ } from '@/libs/themes';
import { Flex, TouchableOpacity } from 'dble-layout';
import Link from 'next/link';
import { useState } from 'react';
import { AppbarWrapper } from './AppbarWrapper';
import { Navbar } from './Navbar';

export const Appbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <AppbarWrapper>
      <Link href='/' itemProp='url' className='home-navigation' aria-label={mySite.title}>
        <img
          className='app-logo'
          src='/assets/favicons/favicon.png'
          alt={mySite.name}
          width={28}
          height='auto'
          css={{ [MQ[2]]: { width: '24px' } }}
        />
      </Link>

      <Navbar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />

      <Flex w='auto' direc='row' align='center' gap={15}>
        <TouchableOpacity
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          css={{ display: 'none', [MQ[2]]: { display: 'flex' } }}
        >
          <svg width={36} height={36} viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M27.6545 8.72728H8.34537C7.6525 8.72728 7.09082 9.28896 7.09082 9.98183C7.09082 10.6747 7.6525 11.2364 8.34537 11.2364H27.6545C28.3473 11.2364 28.909 10.6747 28.909 9.98183C28.909 9.28896 28.3473 8.72728 27.6545 8.72728Z'
              fill={'#69696a'}
            />
            <path
              d='M27.6545 16.7455H8.34537C7.6525 16.7455 7.09082 17.3071 7.09082 18C7.09082 18.6929 7.6525 19.2546 8.34537 19.2546H27.6545C28.3473 19.2546 28.909 18.6929 28.909 18C28.909 17.3071 28.3473 16.7455 27.6545 16.7455Z'
              fill={'#69696a'}
            />
            <path
              d='M27.6545 24.7636H8.34537C7.6525 24.7636 7.09082 25.3253 7.09082 26.0182C7.09082 26.7111 7.6525 27.2727 8.34537 27.2727H27.6545C28.3473 27.2727 28.909 26.7111 28.909 26.0182C28.909 25.3253 28.3473 24.7636 27.6545 24.7636Z'
              fill={'#69696a'}
            />
          </svg>
        </TouchableOpacity>
      </Flex>
    </AppbarWrapper>
  );
};
