import { Appbar } from '@/@widgets/navigator/Appbar';
import { useRouter } from 'next/router';
import { ConfirmProvider } from './ConfirmProvider';
import { DialogProvider } from './DialogProvider';
import { JengaProvider } from './JengaProvider';

//
export default function AppProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const { pathname } = useRouter();

  const errPath = pathname === '/404';

  return (
    <JengaProvider>
      <ConfirmProvider>
        <DialogProvider>
          <div id='layout' css={{ ...styleSheet, minHeight: '100vh' }}>
            {!errPath && <Appbar />}

            <main id='main_layer' css={styleSheet}>
              {children}
            </main>
          </div>
        </DialogProvider>
      </ConfirmProvider>
    </JengaProvider>
  );
}

const styleSheet = {
  width: '100%',
  height: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
} as any;
