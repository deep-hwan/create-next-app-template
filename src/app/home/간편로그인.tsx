import { Padding } from '@/@dble_layout';
import { OAuthTabs } from '@/@widgets/tab/OAuthTabs';
import WidgetContainer from './_WidgetContainer';

export const 간편로그인 = () => {
  return (
    <WidgetContainer title='간편 로그인' delay={0.5} description='간편 로그인 기능을 빠르게 연결하고 사용할 수 있어요'>
      <Padding horizontal={10} bottom={10} top={15}>
        <OAuthTabs
          onKakao={() => {}}
          onNaver={() => {}}
          onGoogle={() => {}}
          onApple={() => {}}
          onFacebook={() => {}}
          onGithub={() => {}}
        />
      </Padding>
    </WidgetContainer>
  );
};
