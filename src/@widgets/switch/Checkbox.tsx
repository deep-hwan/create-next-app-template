/** @jsxImportSource @emotion/react */
'use client';
import { Interpolation, Theme } from '@emotion/react';
import { ForwardedRef, HTMLAttributes, useState } from 'react';
//
import { colors } from '@/libs/themes';

//
type Types = {
  themes?: {
    check?: {
      defaultColor?: string;
      checkColor?: string;
      hoverColor?: string;
      disabledColor?: string;
      borderColor?: string;
      borderRadius?: string | number;
      checkSize?: number;
    };

    label?: {
      titleColor?: string;
      titleSize?: number;
      titleWeight?: 'lighter' | 'normal' | 'medium' | 'bold';
      txtColor?: string;
      txtSize?: number;
      opacity?: number;
    };
  };

  label?: {
    title: string;
    edgeTitle?: string;
    txt?: string;
    txtOnClick?: any;
  };

  labelActive?: boolean;
  checked: boolean;
  disabled?: boolean;
  onClick?: any;
  css?: Interpolation<Theme>;
  children?: never[];
} & Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>;
//
//
function Checkbox(props: Types & { ref?: ForwardedRef<HTMLDivElement> }) {
  const [hover, setHover] = useState(false);

  const checkColors = () => {
    if (props?.disabled) return props?.themes?.check?.disabledColor ?? '#fafafa';
    if (!!props?.checked) return props?.themes?.check?.checkColor ?? colors.keyColor;
    return props?.themes?.check?.defaultColor ?? '#e2e2e2';
  };

  const checkBorderColors = () => {
    if (props?.disabled) return props?.themes?.check?.disabledColor ?? '#e0e0e0';
    if (!!props?.checked) return props?.themes?.check?.checkColor ?? colors.keyColor;
    return props?.themes?.check?.defaultColor ?? '#e2e2e2';
  };

  const checkIconColors = () => {
    if (props?.disabled) return props?.themes?.check?.disabledColor ?? '#aaa';
    if (!!props?.checked) return props?.themes?.check?.checkColor ?? '#fff';
    return props?.themes?.check?.defaultColor ?? '#fff';
  };

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (typeof props.onClick === 'function') props.onClick(event);
  };

  const TYPOGRAPH_WEIGHT = {
    lighter: { fontWeight: '300' },
    normal: { fontWeight: '400' },
    medium: { fontWeight: '500' },
    bold: { fontWeight: '600' },
  } as const;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleOnClick}
      {...(props || {})}
      ref={props.ref}
      css={{ display: 'flex', alignItems: 'start', gap: 7 }}
    >
      <div
        css={{
          ...(props?.css as any),
          position: 'relative',
          minWidth: props.themes?.check?.checkSize ?? 17,
          maxWidth: props.themes?.check?.checkSize ?? 17,
          minHeight: props.themes?.check?.checkSize ?? 17,
          maxHeight: props.themes?.check?.checkSize ?? 17,
          borderRadius: props.themes?.check?.borderRadius ?? 6,
          border: `1px solid ${checkBorderColors()}`,
          backgroundColor: checkColors(),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: '0.2s ease-in-out',
          marginTop: props.themes?.check?.checkSize
            ? props.themes?.check?.checkSize - 14
            : (props?.themes?.label?.titleSize ?? 15) - 11.5,
          cursor: !props?.disabled && 'pointer',
        }}
      >
        {props?.disabled ? (
          <div
            css={{
              width: props.themes?.check?.checkSize ?? 18 - 9,
              height: 2,
              borderRadius: 100,
              backgroundColor: '#c2c2c2',
              borderRight: 1000,
            }}
          />
        ) : (
          <CheckIcon size={((props.themes?.check?.checkSize ?? 18) as number) - 9} fill={checkIconColors()} />
        )}
      </div>

      {!!props?.label && (
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 2,
            opacity: props?.themes?.label?.opacity
              ? props?.themes?.label?.opacity
              : props?.labelActive
                ? 1
                : !!props.checked
                  ? 1
                  : 0.85,
          }}
        >
          <p
            css={{
              userSelect: 'none',
              fontSize: props?.themes?.label?.titleSize ?? 15,
              fontWeight: TYPOGRAPH_WEIGHT[props?.themes?.label?.titleWeight ?? 'normal'].fontWeight as any,
              color: props?.themes?.label?.titleColor ?? '#616066',
              cursor: !props?.disabled && ('pointer' as any),
            }}
          >
            {props?.label.title}

            {!!props?.label.edgeTitle && (
              <span
                css={{
                  userSelect: 'none',
                  fontSize: 13,
                  color: '#8f8e98',
                  paddingLeft: 4,
                }}
              >
                {props?.label.edgeTitle}
              </span>
            )}
          </p>

          <p
            css={{
              userSelect: 'none',
              fontSize: props?.themes?.label?.txtSize ?? 13,
              color: props?.themes?.label?.txtColor ?? '#9d9d9f',
            }}
          >
            {props?.label.txt}
          </p>
        </div>
      )}
    </div>
  );
}

const CheckIcon = ({ size, fill }: { size: any; fill: string }) => (
  <svg width={size} height={size} viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clip-path='url(#clip0_1025_25)'>
      <path
        d='M9.02563 18.3333C8.5739 18.3333 8.1492 18.1573 7.82912 17.8377L0.495816 10.5043C0.176301 10.1846 0 9.75962 0 9.30763C0 8.85564 0.176301 8.43064 0.495816 8.111C0.815332 7.79135 1.24059 7.61548 1.69232 7.61548C2.14405 7.61548 2.56932 7.79135 2.88883 8.11087L9.02567 14.2477L19.1112 4.16225C19.4307 3.84261 19.8559 3.66674 20.3077 3.66674C20.7594 3.66674 21.1847 3.84261 21.5042 4.16213C21.8237 4.4819 22 4.9069 22 5.35893C22 5.81097 21.8237 6.23593 21.5042 6.55557L10.2221 17.8376C9.90211 18.1573 9.47736 18.3333 9.02563 18.3333Z'
        fill={fill}
      />
    </g>
    <defs>
      <clipPath id='clip0_1025_25'>
        <rect width='22' height='22' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

export { Checkbox };
