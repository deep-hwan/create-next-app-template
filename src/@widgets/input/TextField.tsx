/** @jsxImportSource @emotion/react */
'use client';

import { Background, Flex, Padding, Text, TouchableOpacity } from '@/@dble_layout';
import onScrollToNextRef from '@/libs/handler/onScrollToRef';
import { fontSize } from '@/libs/themes';
import { CSSObject } from '@emotion/react';
import { InputHTMLAttributes, forwardRef, memo, useCallback, useEffect, useId, useRef, useState } from 'react';

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, 'size' | 'type'> {
  type?: 'text' | 'number' | 'tel' | 'price' | 'password' | 'textarea' | 'select';
  autoRaise?: boolean;
  label: string;
  error?: boolean;
  errorMessage?: string;
  onClear?: () => void;
  children?: never[];
  isStroke?: boolean;
  fieldColor?: string;
  renderItem?: (item: unknown, index?: number) => React.ReactElement;
  options?: unknown[];
  focus?: boolean;
  isFocus?: boolean;
}

const TextField = memo(
  forwardRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, Props>(
    (
      {
        type = 'text',
        autoRaise = true,
        label,
        value = '',
        error,
        errorMessage,
        onClear,
        isStroke = false,
        fieldColor = '#fff',
        options = [],
        renderItem,
        focus = true,
        isFocus = false,
        ...rest
      },
      ref
    ) => {
      const stableId = useId();
      const fieldRef = useRef<HTMLDivElement>(null);
      const textareaRef = useRef<HTMLTextAreaElement>(null);
      const [isFocused, setIsFocused] = useState<'focus' | 'error' | null>(null);

      const isError = value !== '' && error;
      const [textareaHeight, setTextareaHeight] = useState(0);

      //
      // events
      const handleFocus = useCallback(() => {
        if (fieldRef.current) {
          setIsFocused('focus');
          if (isFocus) onScrollToNextRef(fieldRef);
        }
      }, [isFocus]);

      const handleBlur = useCallback(() => {
        if (fieldRef.current) setIsFocused(null);
      }, []);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let newValue = e.target.value;
        if (type === 'tel') {
          newValue = formatPhoneNumber(newValue) || '';
        }
        if (type === 'price') {
          newValue = newValue.replace(/[^0-9]/g, '');
          newValue = new Intl.NumberFormat('ko-KR').format(Number(newValue));
        }
        if (rest.onChange) {
          rest.onChange({ ...e, target: { ...e.target, value: newValue } });
        }
      };

      // rasize
      useEffect(() => {
        const handleRasie = () => {
          if (value && value !== '' && textareaRef && 'current' in textareaRef && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
            setTextareaHeight(textareaRef.current.scrollHeight);
          } else if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            setTextareaHeight(0);
          }
        };

        if (type === 'textarea' && autoRaise) handleRasie();
      }, [type, value, textareaRef, autoRaise]);

      //
      // themes
      const bg = () => {
        if (isError) return '#f9f2f2';
        if (focus && isFocused === 'focus') return '#fff';
        return fieldColor;
      };

      const br = () => {
        if (isError) return '#f09696';
        if (focus && isFocused === 'focus') return '#c9ced7';
        return isStroke ? '#e5e5e5' : '#eaeaea';
      };

      const labelColor = () => {
        if (isError) return '#f56767';
        return '#7e7f84';
      };

      return (
        <Background
          className='text-field'
          ref={fieldRef}
          fill={bg()}
          border={{ radius: 18, color: br(), stroke: 1 }}
          shadow={focus && isFocused === 'focus' ? { x: 0, y: 1, blur: 18, color: '#e8e8ea' } : undefined}
        >
          <Padding horizontal={15} top={12} bottom={4}>
            <Flex direc='row' align='center' gap={10}>
              {isError && (
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 22 22'
                  xmlns='http://www.w3.org/2000/svg'
                  css={{ marginBottom: 10 }}
                >
                  <path
                    d='M10.999 22C8.82343 22 6.6967 21.3549 4.88776 20.1462C3.07882 18.9375 1.66892 17.2195 0.836354 15.2095C0.0037896 13.1995 -0.214047 10.9878 0.21039 8.85401C0.634828 6.72022 1.68248 4.76021 3.22085 3.22183C4.75923 1.68345 6.71924 0.635804 8.85303 0.211367C10.9868 -0.213071 13.1986 0.00476617 15.2085 0.83733C17.2185 1.66989 18.9365 3.07979 20.1452 4.88873C21.3539 6.69767 21.999 8.82441 21.999 11C21.999 13.9174 20.8401 16.7153 18.7772 18.7782C16.7143 20.8411 13.9164 22 10.999 22ZM12.129 6.631C12.129 6.283 11.622 5.93101 10.999 5.93101C10.347 5.93101 9.88403 6.27901 9.88403 6.631V12.149C9.88403 12.554 10.347 12.83 10.999 12.83C11.622 12.83 12.129 12.555 12.129 12.149V6.631ZM10.999 14.165C10.7043 14.15 10.4154 14.2506 10.1937 14.4454C9.97202 14.6402 9.83509 14.9138 9.81203 15.208C9.83607 15.5006 9.97382 15.7721 10.1957 15.9643C10.4176 16.1564 10.706 16.254 10.999 16.236C11.29 16.2515 11.5755 16.1527 11.7947 15.9606C12.0138 15.7686 12.1492 15.4985 12.172 15.208C12.15 14.916 12.0153 14.6439 11.7964 14.4493C11.5776 14.2547 11.2916 14.1528 10.999 14.165Z'
                    fill='#f56767'
                  />
                </svg>
              )}

              <Flex gap={0}>
                <Text as='label' size={13} color={labelColor()}>
                  {error && errorMessage ? errorMessage : label}
                </Text>

                <Flex direc='row' align='center' gap={10}>
                  {type === 'textarea' && (
                    <textarea
                      {...rest}
                      rows={1}
                      id={rest.id ?? stableId}
                      ref={textareaRef}
                      value={value}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      onKeyPress={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          if (!value || (typeof value === 'string' && value.trim() === '')) e.preventDefault();
                        }
                      }}
                      css={{
                        ...styles,
                        height: textareaHeight,
                      }}
                    />
                  )}

                  {type === 'select' && (
                    <>
                      <select
                        {...rest}
                        ref={ref as React.Ref<HTMLSelectElement>}
                        id={rest.id ?? stableId}
                        disabled={rest.disabled}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        css={{
                          ...styles,
                          color: value ? '#58595a' : '#c2c2c2',
                        }}
                      >
                        <option selected disabled>
                          {rest.placeholder}
                        </option>

                        {options?.map((item, index) => renderItem && renderItem(item, index)).flat()}
                      </select>
                    </>
                  )}

                  {type !== 'textarea' && type !== 'select' && (
                    <input
                      {...rest}
                      id={rest.id ?? stableId}
                      type={type === 'password' ? 'password' : 'text'}
                      ref={ref as React.Ref<HTMLInputElement>}
                      maxLength={type === 'tel' ? 13 : rest.maxLength}
                      value={value}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      onKeyPress={e => {
                        if (type === 'tel' || type === 'number' || type === 'price') {
                          if (!/[0-9]/.test(e.key)) e.preventDefault();
                        }
                      }}
                      css={styles}
                    />
                  )}

                  {type === 'select' && <SelectIcon fill='#ddddda' size={16} />}

                  {value !== '' && type !== 'textarea' && type !== 'select' && (
                    <TouchableOpacity onClick={onClear}>
                      <svg width='16' height='16' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M18.7791 3.222C17.2407 1.68358 15.2807 0.63588 13.1469 0.211403C11.0131 -0.213075 8.80134 0.00473368 6.79133 0.837283C4.78131 1.66983 3.06332 3.07973 1.8546 4.88868C0.645884 6.69763 0.000732422 8.82439 0.000732422 11C0.000732422 13.1756 0.645884 15.3024 1.8546 17.1113C3.06332 18.9203 4.78131 20.3302 6.79133 21.1627C8.80134 21.9953 11.0131 22.2131 13.1469 21.7886C15.2807 21.3641 17.2407 20.3164 18.7791 18.778C20.8419 16.7151 22.0007 13.9173 22.0007 11C22.0007 8.08271 20.8419 5.28489 18.7791 3.222ZM13.2171 14.507L11.0011 12.291L8.78308 14.508C8.61093 14.6745 8.38023 14.7668 8.14071 14.7648C7.9012 14.7628 7.67205 14.6668 7.50268 14.4974C7.33331 14.328 7.23728 14.0989 7.2353 13.8594C7.23332 13.6199 7.32554 13.3892 7.49208 13.217L9.71008 10.999L7.49708 8.78601C7.33054 8.61386 7.23832 8.38315 7.2403 8.14364C7.24228 7.90412 7.33831 7.67497 7.50768 7.50561C7.67705 7.33624 7.9062 7.24021 8.14571 7.23823C8.38523 7.23624 8.61593 7.32846 8.78808 7.49501L11.0011 9.70901L13.2141 7.496C13.3862 7.33171 13.6158 7.24128 13.8537 7.24405C14.0916 7.24682 14.319 7.34256 14.4873 7.51081C14.6555 7.67907 14.7513 7.90647 14.754 8.14439C14.7568 8.38232 14.6664 8.61189 14.5021 8.78401L12.2891 10.997L14.5071 13.213C14.6736 13.3852 14.7658 13.6159 14.7639 13.8554C14.7619 14.0949 14.6659 14.324 14.4965 14.4934C14.3271 14.6628 14.098 14.7588 13.8584 14.7608C13.6189 14.7628 13.3882 14.6705 13.2161 14.504'
                          fill='#ddddda'
                        />
                      </svg>
                    </TouchableOpacity>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </Padding>
        </Background>
      );
    }
  )
);

export { TextField };

const styles: CSSObject = {
  width: '100%',
  minHeight: 22,
  fontSize: fontSize.s15,
  padding: '8px 0',
  color: '#58595a',
  lineHeight: 1.6,
  appearance: 'none',
  border: 'none',
  outline: 'none',
  '&::placeholder': { color: '#c2c2c2' },
  overflow: 'hidden',
  resize: 'none',
};

const SelectIcon = ({ fill, size }: { fill: string; size: number }) => {
  return (
    <div css={{ display: 'flex', alignItems: 'center' }}>
      <svg width={size} height={size} viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M5.53775 7.85469C5.2579 8.19052 4.7421 8.19052 4.46225 7.85469L0.956773 3.64813C0.576833 3.1922 0.901043 2.5 1.49453 2.5L8.50547 2.5C9.09896 2.5 9.42317 3.1922 9.04323 3.64813L5.53775 7.85469Z'
          fill={fill}
        />
      </svg>
    </div>
  );
};

const formatPhoneNumber = (value: string | undefined) => {
  const inputVal = value?.trim().replace(/[^0-9]/g, '');
  let formattedVal = inputVal;

  if (value === '') return;
  else {
    if (inputVal?.length === 9) formattedVal = inputVal.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
    else if (inputVal?.length === 10) formattedVal = inputVal.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
    else if (inputVal && inputVal?.length > 10) formattedVal = inputVal.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  return formattedVal;
};
