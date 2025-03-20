import { Background, Flex, Padding, Spacing, Text } from '@/@dble_layout';
import { css, keyframes } from '@emotion/react';
import { useRef } from 'react';
import WidgetContainer from './_WidgetContainer';

const rotateY = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

const rotatingDivStyle = css`
  display: inline-block;
  animation: ${rotateY} 1.5s linear infinite;
  animation-timing-function: linear;
`;

export const 구매완료 = () => {
  const divRef = useRef<HTMLDivElement | null>(null);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       if (divRef.current) {
  //         divRef.current.style.animationPlayState = 'running';
  //         setTimeout(() => {
  //           if (divRef.current) {
  //             divRef.current.style.animationPlayState = 'paused';
  //           }
  //         }, 1000); // Pause after 1 second of running
  //       }
  //     }, 1100); // Total cycle time: 1s running + 0.1s paused

  //     return () => clearInterval(interval);
  //   }, []);

  return (
    <WidgetContainer title='결제완료 화면' delay={0.4} description='우리는 심플함을 추구하지만 멋은 포기할 수 없어요!'>
      <Padding horizontal={10} bottom={10}>
        <Background fill='#f7f7fa' border={{ radius: 20 }}>
          <Padding all={20}>
            <Flex align='center'>
              <div css={rotatingDivStyle} ref={divRef}>
                <svg width='45' height='45' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M2.562 14.8773L14.858 2.58128C15.7191 1.72011 17.1893 1.79001 18.1347 2.73541L25.2928 9.89345C26.2382 10.8389 26.3074 12.3083 25.4462 13.1695L13.1502 25.4655C12.289 26.3266 10.8189 26.2581 9.87352 25.3127L2.71548 18.1547C1.77008 17.2093 1.70083 15.7384 2.562 14.8773Z'
                    fill='#2d83f3'
                  />
                  <path
                    d='M10.076 20.0841C10.4264 19.7337 10.9052 19.5491 11.423 19.5644C11.6349 19.5703 11.817 19.746 11.8303 19.9576C11.8422 20.1691 11.682 20.3349 11.4734 20.3286C11.1528 20.3197 10.8575 20.434 10.6417 20.6498C10.1844 21.1071 10.2214 21.8875 10.7235 22.3895C11.2255 22.8915 12.0059 22.9286 12.4632 22.4713C12.679 22.2555 12.7926 21.9608 12.7845 21.6409C12.7787 21.4303 12.9451 21.2695 13.1562 21.2848C13.3671 21.2986 13.5435 21.4815 13.5493 21.6921C13.5627 22.2104 13.3786 22.6872 13.0289 23.037C12.2875 23.7783 11.0214 23.7193 10.2075 22.9054C9.39367 22.0915 9.33464 20.8255 10.076 20.0841Z'
                    fill='#F20A41'
                  />
                  <path
                    d='M12.9287 21.0753C12.9287 21.0753 13.7297 22.6389 12.4844 22.8235C11.2391 23.0081 11.2014 23.7756 10.2328 22.2028C9.85515 21.5636 10.0731 20.0644 11.8621 19.8438'
                    fill='#F20A41'
                  />
                  <path
                    d='M11.5832 18.5769C12.3246 17.8355 13.5913 17.8939 14.4052 18.7078C15.2191 19.5217 15.2775 20.7884 14.5361 21.5298C13.7947 22.2711 12.5287 22.2121 11.7148 21.3982C10.9009 20.5843 10.8419 19.3183 11.5832 18.5769Z'
                    fill='#FFAA00'
                  />
                  <path
                    d='M18.7763 11.6242L20.9773 9.42328C21.2993 9.10123 21.8479 9.1268 22.2015 9.48036L23.6333 10.9122C23.9869 11.2658 24.0125 11.8144 23.6904 12.1364L21.4895 14.3374C21.1675 14.6594 20.6182 14.6345 20.2647 14.2809L18.8328 12.849C18.4792 12.4955 18.4543 11.9462 18.7763 11.6242Z'
                    fill='white'
                  />
                  <path
                    d='M18.6559 3.2551L3.23663 18.6743L2.67024 18.108L18.0895 2.6887L18.6559 3.2551Z'
                    fill='#79B2F2'
                  />
                  <path
                    d='M20.5339 5.13318L5.11469 20.5524L4.54829 19.986L19.9675 4.56679L20.5339 5.13318Z'
                    fill='#79B2F2'
                  />
                  <path
                    d='M20.2159 4.77667L18.2572 2.81798L2.81797 18.2572L4.83111 20.2703L20.2159 4.77667Z'
                    fill='#79B2F2'
                  />
                </svg>
              </div>

              <Spacing size={10} />

              <Text size={16} weight='bold'>
                결제를 완료했어요!
              </Text>

              <Spacing size={4} />

              <Text size={13} color='#69696a'>
                주문번호는 1234567890 이에요
              </Text>
            </Flex>
          </Padding>
        </Background>
      </Padding>
    </WidgetContainer>
  );
};
