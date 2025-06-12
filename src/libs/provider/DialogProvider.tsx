/** @jsxImportSource @emotion/react */
'use client';

import { colors } from '@/libs/themes';
import { CSSObject, Interpolation, Theme } from '@emotion/react';
import { ReactNode, createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

// ========== BlurLayer Component ==========
const BlurLayer = ({ zIndex }: { zIndex?: number }) => {
  return (
    <div
      css={{
        zIndex: zIndex ?? 900000000,
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        backgroundColor: 'rgba(0,0,0,0.35)',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overscrollBehavior: 'contain',
        paddingTop: `max(0px, env(safe-area-inset-top))`,
        paddingBottom: `max(0px, env(safe-area-inset-bottom))`,
        paddingLeft: `max(0px, env(safe-area-inset-left))`,
        paddingRight: `max(0px, env(safe-area-inset-right))`,
      }}
    />
  );
};

// ========== useModalStatic Hook ==========
function useModalStatic({
  ref,
  open,
  onCancel,
  clickOutSideClose = true,
  windowScreenScroll = false,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
  open: boolean;
  onCancel: () => void;
  clickOutSideClose?: boolean;
  windowScreenScroll?: boolean;
}) {
  const initialOverflowY = useRef<string | null>(null);
  const initialScrollY = useRef<number>(0);

  const clickModalOutside = useCallback(
    (event: MouseEvent) => {
      if (clickOutSideClose && open && ref.current && !ref.current.contains(event.target as Node)) {
        onCancel();
      }
    },
    [open, onCancel, clickOutSideClose, ref]
  );

  useEffect(() => {
    if (!windowScreenScroll) {
      if (open) {
        initialOverflowY.current = document.body.style.overflowY;
        initialScrollY.current = window.scrollY;

        if (initialOverflowY.current !== 'hidden') {
          document.body.style.top = `-${initialScrollY.current}px`;
          document.body.style.overflowY = 'hidden';
        }
      } else {
        if (initialOverflowY.current !== 'hidden') {
          document.body.style.top = '';
          document.body.style.overflowY = 'auto';
          window.scrollTo(0, initialScrollY.current);
        }
      }
    }
  }, [open, windowScreenScroll]);

  useEffect(() => {
    document.addEventListener('mousedown', clickModalOutside);
    return () => {
      document.removeEventListener('mousedown', clickModalOutside);
    };
  }, [clickModalOutside]);

  return null;
}

// ========== Dialog Component ==========
interface DialogProps {
  open: boolean;
  title: string;
  message: string;
  tabName?: string;
  onConfirm: () => void;
  onClose: () => void;
}

type TabProps = {
  name: string;
  buttonColor?: string;
  txtColor?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Dialog: React.FC<DialogProps> = ({ open, title, message, tabName, onConfirm, onClose }) => {
  const tabs: TabProps[] = [
    {
      name: '취소',
      txtColor: '#888',
      buttonColor: '#e2e2e2',
      onClick: onClose,
    },
    {
      name: tabName ?? '확인',
      txtColor: '#fff',
      buttonColor: colors.keyColor,
      onClick: onConfirm,
    },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const [delayedOpen, setDelayedOpen] = useState(false);

  const handleCancel = () => {
    setDelayedOpen(false);
    const timeout = setTimeout(() => onClose(), 100);
    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => setDelayedOpen(true), 50);
      return () => clearTimeout(timeout);
    } else {
      setDelayedOpen(false);
    }
  }, [open]);

  useModalStatic({
    ref,
    open: delayedOpen,
    onCancel: handleCancel,
    clickOutSideClose: true,
    windowScreenScroll: false,
  });

  return (
    <>
      {open && (
        <>
          <BlurLayer />

          <div
            css={{
              ...(flexT as unknown as CSSObject),
              overscrollBehavior: 'contain',
              justifyContent: 'center',
              position: 'fixed',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              opacity: delayedOpen ? 1 : 0,
              zIndex: 900000001,
              padding: '10px 20px 20px 20px',
            }}
          >
            <div
              ref={ref}
              css={{
                ...(flexT as []),
                height: 'auto',
                maxWidth: 340,
                minWidth: 320,
                padding: '30px 0 0',
                alignItems: 'start',
                borderRadius: 24,
                overscrollBehavior: 'contain',
                backgroundColor: '#fff',
              }}
            >
              <div css={{ ...(flexT as []), alignItems: 'start', rowGap: 10 }}>
                <div
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0 25px',
                    gap: 12,
                  }}
                >
                  <b
                    css={{
                      fontSize: '1.25rem',
                      color: '#5e5f69',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {title}
                  </b>

                  <p
                    css={{
                      fontSize: '0.938rem',
                      color: '#87888a',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {message}
                  </p>
                </div>

                {tabs?.length !== 0 && !!tabs && (
                  <div
                    css={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'stretch',
                      paddingTop: 28,
                    }}
                  >
                    {tabs?.map((item: TabProps, i: number) => (
                      <button
                        key={i}
                        onClick={() => {
                          handleCancel();
                          item.onClick?.();
                        }}
                        disabled={item?.disabled}
                        css={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          minHeight: 52,
                          backgroundColor: item?.buttonColor ?? colors.keyColor,
                          color: item?.txtColor ?? '#fff',
                          cursor: 'pointer',
                          outline: 'none',
                          border: 'none',
                          fontSize: '1rem',
                          transition: '0.3s ease-in-out',
                          userSelect: 'none',
                          borderRadius: i === 0 ? '0 0 0 24px' : i === tabs.length - 1 ? '0 0 24px 0' : '0',
                          '&:hover': { opacity: 0.9 },
                          '&:active': { opacity: 8, scale: 1 },
                          '&:focus': { outline: 'none', scale: 1 },
                        }}
                      >
                        {item?.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

// Common style
const flexT: Interpolation<Theme> = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  transition: '0.2s ease-in-out',
};

// ========== DialogProvider Context ==========
interface DialogContextProps {
  openDialog: (props: DialogProviderProps) => void;
  closeDialog: () => void;
  onBack: (onConfirm: () => void) => void;
}

interface DialogProviderProps {
  open?: boolean;
  title: string;
  message: string;
  tabName: string;
  onConfirm: () => void;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialogProps, setDialogProps] = useState<DialogProviderProps | null>(null);

  const openDialog = (props: DialogProviderProps) => {
    setDialogProps({ ...props, open: true });
  };

  const closeDialog = () => {
    setDialogProps(prev => (prev ? { ...prev, open: false } : prev));
  };

  const onBack = (onConfirm: () => void) => {
    setDialogProps({
      open: true,
      title: '이전으로 이동하시겠어요?',
      message: '이전 페이지로 이동하면\n입력 또는 저장된 정보는 초기화돼요',
      tabName: '뒤로가기',
      onConfirm,
    });
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, onBack }}>
      {children}
      {dialogProps && (
        <Dialog
          open={dialogProps.open!}
          title={dialogProps.title}
          message={dialogProps.message}
          tabName={dialogProps.tabName}
          onConfirm={() => {
            dialogProps.onConfirm();
            closeDialog();
          }}
          onClose={closeDialog}
        />
      )}
    </DialogContext.Provider>
  );
}

// Custom hook for using dialog context
export function useDialog() {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}
