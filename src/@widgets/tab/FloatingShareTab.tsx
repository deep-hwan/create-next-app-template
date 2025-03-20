import { Background, Flex, Padding, Position, TouchableOpacity } from '@/@dble_layout';
import { useJenga } from '@/libs/provider/JengaProvider';
import { mySite } from '@/libs/site/site';
import { useEffect, useState } from 'react';

export function FloatingShareTab({
  title,
  description,
  imageUrl,
}: {
  title?: string;
  description: string;
  imageUrl?: string;
}) {
  const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

  const { addToast } = useJenga();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else setIsVisible(true);

      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 클립보드 공유
  function copyCurrentURL() {
    if (typeof window !== 'undefined') {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          addToast({
            title: 'URL 복사 완료',
            description: '복사한 URL을 원하는 곳에 첨부하세요',
          });
        })
        .catch(err => {
          console.error('Failed to copy URL: ', err);
        });
    }
  }

  // 카카오 공유
  const content = {
    title: title ?? mySite.title,
    description: description ?? mySite.description,
    imageUrl: imageUrl ?? mySite.imageUrl,
    link: {
      mobileWebUrl: typeof window !== 'undefined' && window.location.href,
      webUrl: typeof window !== 'undefined' && window.location.href,
    },
  };

  const shareKakao = () => {
    if ((window as any)?.Kakao) {
      const kakao = (window as any).Kakao;
      if (!kakao.isInitialized()) kakao.init(KAKAO_API_KEY);

      kakao.Link.sendDefault({
        objectType: 'feed',
        content,
      });
    }
  };

  return (
    isVisible && (
      <Position type='fixed' bottom={20} right={20}>
        <Background fill='#f4f4f4' border={{ radius: 20 }}>
          <Padding all={5}>
            <Flex gap={8}>
              <TouchableOpacity onClick={copyCurrentURL}>
                <svg width={36} height={36} viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M6.31398 15.208C7.01508 15.8692 7.94232 16.2374 8.90598 16.2374C9.86965 16.2374 10.7969 15.8692 11.498 15.208L15.998 10.889C16.2398 10.6603 16.4325 10.3847 16.5642 10.0789C16.6958 9.77323 16.7638 9.44387 16.7638 9.111C16.7638 8.77814 16.6958 8.44877 16.5642 8.14305C16.4325 7.83734 16.2398 7.5617 15.998 7.333C15.4972 6.8619 14.8355 6.5996 14.148 6.5996C13.4604 6.5996 12.7988 6.8619 12.298 7.333L8.16498 11.296C8.01978 11.4332 7.90411 11.5986 7.82505 11.7821C7.74599 11.9655 7.70522 12.1632 7.70522 12.363C7.70522 12.5628 7.74599 12.7605 7.82505 12.9439C7.90411 13.1274 8.01978 13.2928 8.16498 13.43C8.46545 13.7135 8.86291 13.8714 9.27598 13.8714C9.68906 13.8714 10.0865 13.7135 10.387 13.43L13.105 10.82C13.1534 10.7743 13.1919 10.7192 13.2183 10.6581C13.2446 10.5969 13.2582 10.5311 13.2582 10.4645C13.2582 10.3979 13.2446 10.3321 13.2183 10.2709C13.1919 10.2098 13.1534 10.1547 13.105 10.109C13.0049 10.0143 12.8723 9.96147 12.7345 9.96147C12.5967 9.96147 12.4641 10.0143 12.364 10.109L9.64598 12.719C9.54577 12.8135 9.41323 12.8662 9.27548 12.8662C9.13774 12.8662 9.0052 12.8135 8.90498 12.719C8.85659 12.6733 8.81804 12.6182 8.79169 12.5571C8.76534 12.4959 8.75175 12.4301 8.75175 12.3635C8.75175 12.2969 8.76534 12.2311 8.79169 12.1699C8.81804 12.1088 8.85659 12.0537 8.90498 12.008L13.032 8.044C13.3322 7.76009 13.7298 7.60189 14.143 7.60189C14.5562 7.60189 14.9537 7.76009 15.254 8.044C15.3992 8.18121 15.5149 8.34661 15.5939 8.53008C15.673 8.71355 15.7138 8.91122 15.7138 9.111C15.7138 9.31078 15.673 9.50845 15.5939 9.69192C15.5149 9.87539 15.3992 10.0408 15.254 10.178L10.754 14.497C10.2532 14.9681 9.59154 15.2304 8.90398 15.2304C8.21643 15.2304 7.55478 14.9681 7.05398 14.497C6.81173 14.2685 6.61873 13.993 6.48681 13.6872C6.35489 13.3815 6.28684 13.052 6.28684 12.719C6.28684 12.386 6.35489 12.0565 6.48681 11.7508C6.61873 11.445 6.81173 11.1695 7.05398 10.941L11.554 6.622C11.6024 6.57629 11.6409 6.52119 11.6673 6.46006C11.6936 6.39893 11.7072 6.33307 11.7072 6.2665C11.7072 6.19994 11.6936 6.13407 11.6673 6.07294C11.6409 6.01181 11.6024 5.95671 11.554 5.911C11.4539 5.81627 11.3213 5.76347 11.1835 5.76347C11.0457 5.76347 10.9131 5.81627 10.813 5.911L6.31298 10.23C5.97395 10.5499 5.70384 10.9357 5.51922 11.3637C5.33461 11.7917 5.23938 12.2529 5.23938 12.719C5.23938 13.1851 5.33461 13.6463 5.51922 14.0743C5.70384 14.5023 5.97395 14.8881 6.31298 15.208H6.31398Z'
                    fill='#9fa6b5'
                  />
                </svg>
              </TouchableOpacity>

              <TouchableOpacity onClick={shareKakao}>
                <svg width={36} height={36} viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22Z'
                    fill='#FEE500'
                  />
                  <path
                    d='M10.993 5.86598C7.85098 5.86598 5.30298 7.87799 5.30298 10.36C5.34563 11.1756 5.61543 11.9631 6.08192 12.6335C6.54842 13.3039 7.19302 13.8305 7.94298 14.154L7.40698 16.154C7.397 16.1835 7.39555 16.2152 7.4028 16.2454C7.41006 16.2757 7.42572 16.3032 7.44798 16.325C7.4758 16.3537 7.51354 16.3708 7.5535 16.3726C7.59345 16.3745 7.63261 16.361 7.66298 16.335L9.96799 14.778C10.3074 14.8272 10.65 14.8523 10.993 14.853C14.135 14.853 16.683 12.842 16.683 10.359C16.683 7.87599 14.135 5.86598 10.993 5.86598Z'
                    fill='#3C1E1E'
                  />
                </svg>
              </TouchableOpacity>
            </Flex>
          </Padding>
        </Background>
      </Position>
    )
  );
}
