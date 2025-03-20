import { Flex, Padding, TouchableOpacity } from '@/@dble_layout';
import { menus } from '@/libs/site/menus';
import { fontSize, MQ } from '@/libs/themes';
import { CSSObject } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MotionDiv } from '../motion/MotionDiv';

export const Navbar = ({
  isDrawerOpen,
  setIsDrawerOpen,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isDrawerOpen: boolean) => void;
}) => {
  const { pathname } = useRouter();

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup function to reset overflow when component unmounts or isDrawer changes
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  return (
    <>
      <MotionDiv
        className='navbar'
        y={100}
        duration={0.2}
        css={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          [MQ[2]]: {
            zIndex: 9000,
            width: '100%',
            height: '100vh',
            minHeight: '100vh',
            position: 'fixed',
            top: 0,
            bottom: 0,
            right: isDrawerOpen ? 0 : '500%',
            backgroundColor: '#fff',
          },
        }}
      >
        <nav itemScope itemType='https://schema.org/SiteNavigationElement' className='navbar-nav' css={navbar_t}>
          <div css={{ width: '100%', display: 'none', [MQ[2]]: { display: 'flex' } }}>
            <Padding top={20} right={20}>
              <Flex align='end'>
                <TouchableOpacity onClick={() => setIsDrawerOpen(false)}>
                  <svg width={22} height={22} viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M19.1049 16.9875L18.8287 17.2453L19.0865 16.9875L12.8264 10.7458L19.0313 4.54088C19.3075 4.2647 19.4548 3.89646 19.4548 3.49139C19.4548 3.08632 19.3075 2.71808 19.0129 2.44189C18.7367 2.16571 18.3684 2.01841 17.9634 2.01841C17.5767 2.01841 17.2085 2.16571 16.9139 2.44189L10.709 8.6468L4.52247 2.42348C4.22788 2.1473 3.85963 2 3.47298 2C3.08632 2 2.69966 2.1473 2.42348 2.44189C2.1473 2.73649 2 3.10473 2 3.49139C2 3.87804 2.16571 4.24629 2.44189 4.52247L8.6468 10.7274L2.42348 16.9507C2.1473 17.2269 2 17.5951 2 18.0002C2 18.4053 2.1473 18.7735 2.44189 19.0681C2.71808 19.3259 3.08632 19.4732 3.47298 19.4732C3.85963 19.4732 4.22788 19.3259 4.52247 19.0497L10.7274 12.8632L16.9323 19.0497C17.0612 19.197 17.2269 19.3075 17.411 19.3811C17.5951 19.4548 17.7793 19.51 17.9634 19.51C18.0002 19.51 18.037 19.51 18.0738 19.51C18.2396 19.51 18.4053 19.4732 18.5526 19.4179C18.7367 19.3443 18.9208 19.2338 19.0313 19.1049C19.3075 18.8287 19.4732 18.4605 19.4916 18.0738C19.4916 17.6872 19.3627 17.3005 19.0865 17.0059L19.1049 16.9875Z'
                      fill='#848890'
                    />
                  </svg>
                </TouchableOpacity>
              </Flex>
            </Padding>
          </div>

          <ul className='nav-list' css={navList}>
            {menus.map((menu, index) => (
              <li itemProp='name' className='nav-item' key={menu.name}>
                <Link
                  itemProp='url'
                  className='nav-navigation'
                  href={'/' + menu.url}
                  css={{
                    userSelect: 'none',
                    padding: '10px 15px',
                    fontSize: fontSize.s16,
                    color: '#59595a',
                    opacity:
                      menu.url === '/' ? (pathname === menu.url ? 1 : 0.6) : pathname.includes(menu.url) ? 1 : 0.6,
                    fontWeight:
                      menu.url === '/' ? (pathname === menu.url ? 500 : 400) : pathname.includes(menu.url) ? 500 : 400,
                    [MQ[2]]: {
                      fontSize: fontSize.s18,
                      fontWeight:
                        menu.url === '/'
                          ? pathname === menu.url
                            ? 600
                            : 500
                          : pathname.includes(menu.url)
                            ? 600
                            : 500,
                    },
                  }}
                  onClick={() => {
                    setIsDrawerOpen(false);
                  }}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </MotionDiv>
    </>
  );
};

const navbar_t: CSSObject = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  [MQ[2]]: { width: '100%', height: '100%' },
};

const navList: CSSObject = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 20,

  [MQ[2]]: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'start',
    padding: '20px',
  },
};
