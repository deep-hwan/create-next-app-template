import { Background, Flex, Padding, TouchableOpacity } from '@/@dble_layout';
import onScrollToNextRef from '@/libs/handler/onScrollToRef';
import { useUid } from '@/libs/hooks';
import { colors } from '@/libs/themes';

import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

interface Types extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  children?: never[];
  onUpload: () => void;
  onFileUpload?: (fileName: string, fileUrl: string) => void;
  onImageUpload?: (fileName: string, fileUrl: string) => void;
  isFocus?: boolean;
}

export const ChatEditor = React.forwardRef<HTMLTextAreaElement, Types>((props, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [textareaHeight, setTextareaHeight] = useState(0);

  // rasize
  useEffect(() => {
    const handleRasie = () => {
      if (props.value && props.value !== '' && textareaRef && 'current' in textareaRef && textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        setTextareaHeight(textareaRef.current.scrollHeight);
      } else if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        setTextareaHeight(0);
      }
    };

    handleRasie();
  }, [props.value, textareaRef]);

  const handleUpload = useCallback(() => {
    props.onUpload?.();
    fixedWindowScroll();
  }, [props]);

  return (
    <Flex direc='row' align='end' gap={10} ref={editorRef}>
      <Flex w='auto' maxH={44} minH={44} direc='row' align='center' gap={10}>
        <TouchableOpacity padding={{ all: 4 }} cursor='pointer' onClick={() => fileInputRef.current?.click()}>
          <FileUploadIcon />

          <FileInput
            accept='application/*,text/*'
            ref={fileInputRef}
            onUpload={(fileName, fileUrl) => {
              props.onFileUpload?.(fileName, fileUrl);
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity padding={{ all: 2 }} cursor='pointer' onClick={() => imageInputRef.current?.click()}>
          <PhotoTabIcon />

          <FileInput
            accept='image/*'
            ref={imageInputRef}
            onUpload={(fileName, fileUrl) => {
              props.onImageUpload?.(fileName, fileUrl);
            }}
          />
        </TouchableOpacity>
      </Flex>

      <Background fill='#f6f6fa' border={{ radius: 15, stroke: 1, color: '#eee' }}>
        <Padding>
          <Flex direc='row' align='end'>
            <textarea
              {...props}
              rows={1}
              id={props.id ?? useUid()}
              ref={textareaRef}
              onFocus={() => props.isFocus && onScrollToNextRef(editorRef)}
              value={props.value}
              onKeyPress={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  if (!props.value || (typeof props.value === 'string' && props.value.trim() === ''))
                    e.preventDefault();
                }
              }}
              css={{
                width: '100%',
                height: textareaHeight,
                maxHeight: 120,
                minHeight: 22,
                padding: '11px 5px 11px 14px',
                fontSize: '0.875rem',
                color: '#58595a',
                lineHeight: 1.6,
                appearance: 'none',
                border: 'none',
                outline: 'none',
                '&::placeholder': { color: '#c2c2c2' },
                overflow: 'hidden',
                resize: 'none',
              }}
            />

            <Padding w='auto' vertical={6} right={3}>
              <TouchableOpacity as='button' padding={{ all: 5 }} disabled={props.value === ''} onClick={handleUpload}>
                <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M-4.80825e-07 11C-3.85727e-07 13.1756 0.645138 15.3023 1.85383 17.1113C3.06253 18.9202 4.78049 20.3301 6.79048 21.1627C8.80047 21.9952 11.0122 22.2131 13.146 21.7886C15.2798 21.3642 17.2398 20.3165 18.7782 18.7782C20.3166 17.2398 21.3642 15.2798 21.7886 13.146C22.2131 11.0122 21.9952 8.80046 21.1627 6.79048C20.3301 4.78049 18.9202 3.06252 17.1113 1.85383C15.3023 0.645131 13.1756 -6.29797e-06 11 -6.20287e-06C8.08262 -6.07535e-06 5.28472 1.15892 3.22182 3.22182C1.15892 5.28472 -6.08348e-07 8.08261 -4.80825e-07 11ZM11.486 5.92299L15.53 9.15299C15.6167 9.22803 15.6872 9.31993 15.7372 9.42307C15.7872 9.52622 15.8157 9.63847 15.821 9.75299C15.8213 9.86278 15.7994 9.9715 15.7568 10.0727C15.7142 10.1739 15.6517 10.2655 15.573 10.342C15.4227 10.4871 15.2231 10.5702 15.0142 10.5747C14.8053 10.5791 14.6024 10.5046 14.446 10.366L11.811 8.27799L11.811 15.467C11.8061 15.6789 11.7191 15.8806 11.5683 16.0295C11.4175 16.1785 11.2147 16.263 11.0027 16.2652C10.7908 16.2674 10.5863 16.1871 10.4324 16.0414C10.2785 15.8956 10.1873 15.6957 10.178 15.484L10.178 8.253L7.548 10.453C7.39517 10.5864 7.19858 10.659 6.99571 10.6568C6.79284 10.6545 6.59788 10.5777 6.448 10.441C6.29077 10.2995 6.19599 10.1015 6.18437 9.89029C6.17275 9.67909 6.24524 9.47188 6.386 9.314L6.431 9.27L10.386 5.91999C10.5382 5.78673 10.7337 5.71327 10.936 5.71327C11.1383 5.71327 11.3338 5.78673 11.486 5.91999'
                    fill={props.value === '' ? '#ccc' : colors.keyColor}
                  />
                </svg>
              </TouchableOpacity>
            </Padding>
          </Flex>
        </Padding>
      </Background>
    </Flex>
  );
});

//
//
const fixedWindowScroll = () => {
  const scrollPosition = window.scrollY;
  setTimeout(() => {
    window.scrollTo(0, scrollPosition);
  }, 0);
};

//
//
const FileInput = forwardRef<
  HTMLInputElement,
  { accept: string; onUpload: (fileName: string, fileUrl: string) => void }
>((props, ref) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileName = file.name;
      const fileUrl = URL.createObjectURL(file);
      props.onUpload?.(fileName, fileUrl);
      fixedWindowScroll();
    }
  };

  return <input type='file' accept={props.accept} css={{ display: 'none' }} ref={ref} onChange={handleFileChange} />;
});

const iconSize = 19;
const iconColor = '#acafb5';

const FileUploadIcon = () => (
  <svg
    width={iconSize}
    height={iconSize}
    viewBox='0 0 22 22'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    css={{ zIndex: 1 }}
  >
    <g clip-path='url(#clip0_0_679)'>
      <path
        d='M12.4792 15.7415L9.76715 18.4536C8.13612 20.1415 5.44301 20.2932 3.62232 18.8139C2.52232 17.8656 1.95336 16.4243 2.12405 14.9829C2.25681 13.9208 2.74991 12.9346 3.5275 12.1949L6.25853 9.46391C6.65681 9.04667 6.65681 8.38288 6.25853 7.9846C6.06888 7.79495 5.80336 7.68115 5.51888 7.68115C5.23439 7.68115 4.98784 7.79495 4.77922 7.9846L2.10508 10.6587C0.929221 11.8156 0.208532 13.2949 0.0188765 14.888C-0.303537 18.4536 2.33267 21.6398 5.89819 21.9622C7.83267 22.1518 9.71026 21.4501 11.0758 20.0846L13.9206 17.2208C14.1103 17.0312 14.224 16.7656 14.224 16.4812C14.224 16.1967 14.1103 15.9312 13.9206 15.7415C13.5223 15.3432 12.8396 15.3432 12.4413 15.7415H12.4792Z'
        fill={iconColor}
      />
      <path
        d='M20.0843 1.83977C19.8947 1.65011 19.686 1.46046 19.4585 1.28977C16.8033 -0.663681 13.0481 -0.360233 10.7533 2.01046L8.06018 4.70356C7.66191 5.1208 7.66191 5.78459 8.06018 6.18287C8.45846 6.58115 9.14122 6.58115 9.53949 6.18287L12.2705 3.45184C13.1619 2.54149 14.3378 2.06735 15.5326 2.06735C16.4998 2.06735 17.486 2.38977 18.3016 3.01563C20.1981 4.5708 20.4636 7.35873 18.9274 9.25528C18.8516 9.36908 18.7378 9.4639 18.6429 9.5777L15.7791 12.4415C15.3809 12.8587 15.3809 13.5036 15.7791 13.9208C16.1774 14.3191 16.8602 14.3191 17.2585 13.9208L20.1033 11.057C22.6447 8.51563 22.6257 4.36218 20.1033 1.83977H20.0843Z'
        fill={iconColor}
      />
      <path
        d='M9.52069 13.921L13.9397 9.4831C14.3379 9.06585 14.3379 8.40206 13.9397 8.00379C13.5414 7.60551 12.8586 7.60551 12.4603 8.00379L8.04138 12.4417C7.64311 12.859 7.64311 13.5228 8.04138 13.921C8.43966 14.3193 9.10345 14.3193 9.52069 13.921Z'
        fill={iconColor}
      />
    </g>
    <defs>
      <clipPath id='clip0_0_679'>
        <rect width='22' height='22' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const PhotoTabIcon = () => (
  <svg
    width={iconSize}
    height={iconSize}
    viewBox='0 0 22 22'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    css={{ zIndex: 1 }}
  >
    <g clip-path='url(#clip0_122_8)'>
      <path
        d='M13.9201 11.34C13.8301 11.43 13.8401 11.57 13.9401 11.65L21.8501 17.33C21.9501 16.9 22.0001 16.46 22.0001 16.01V13.5L16.8601 9.67998C16.4701 9.38998 15.9301 9.41998 15.5701 9.75998L13.9201 11.34Z'
        fill={iconColor}
      />
      <path
        d='M0.76001 18.9202C1.78001 20.7602 3.74001 22.0002 6.00001 22.0002H16.01C18.05 22.0002 19.85 20.9802 20.94 19.4202L8.97001 10.8402C8.55001 10.5402 7.97001 10.6102 7.63001 11.0002L0.76001 18.9202Z'
        fill={iconColor}
      />
      <path
        d='M7.18 8.08979C7.37 7.87979 7.64 7.73979 7.93 7.70979C8.22 7.67979 8.51 7.75979 8.75 7.92979L11.89 10.1898L15.34 6.88979C15.54 6.69979 15.81 6.58979 16.09 6.56979C16.37 6.55979 16.65 6.63979 16.87 6.80979L22.01 10.6898V6.00979C22.01 2.69979 19.32 0.00979342 16.01 0.00979342H6C2.69 -0.000206584 0 2.68979 0 5.99979V15.9998C0 16.0998 0.01 16.1998 0.02 16.3098L7.18 8.08979Z'
        fill={iconColor}
      />
    </g>
    <defs>
      <clipPath id='clip0_122_8'>
        <rect width='22' height='22' fill='white' />
      </clipPath>
    </defs>
  </svg>
);
