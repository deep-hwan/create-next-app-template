/** @jsxImportSource @emotion/react */
import { LoadingSpinner } from '@/@dble_layout';
import React, { ChangeEvent, ReactNode, useRef } from 'react';

interface Props {
  children?: ReactNode;
  theme?: 'light' | 'dark';
  onUpload: (e: any) => void;
  onCancel: () => void;
  loading?: boolean;
  source: string;
  alt?: string;
  size?: {
    zIndex?: number;
    width?: 'auto' | '100%' | '100vw';
    height?: 'auto' | '100%' | '100vh';
    minWidth?: number | string;
    maxWidth?: number | string;
    minHeight?: number | string;
    maxHeight?: number | string;
  };
  ratio?: { x?: number; y?: number };
  borderRadius?: number;
  backgroundColor?: string;
}

//
const ImageUploader = (props: Props) => {
  const { source, alt = '업로드 이미지', onUpload, onCancel, loading } = props;
  const { width = '100%', minWidth, maxWidth } = props.size ?? {};
  const { height, minHeight = 360, maxHeight } = props.size ?? {};
  const { theme = 'light', ratio = { x: 2, y: 1 } } = props;
  const { backgroundColor, borderRadius = 18 } = props;

  const uploadRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      encodeFileToBase64(e.dataTransfer.files[0]);
    }
  };

  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = () => onUpload(reader.result);
    reader.onerror = error => console.error('File reading error:', error);
  };

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      encodeFileToBase64(e.target.files[0]);
    }
  };

  const VARIANTS = {
    light: { readBg: '#f5f5f5', cancelTabColor: '#cccccc' },
    dark: { readBg: '#333', cancelTabColor: '#666' },
  } as const;

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        width: width,
        height: height,
        minWidth: minWidth,
        minHeight: minHeight,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        cursor: 'pointer',
        userSelect: 'none',
        aspectRatio: `${ratio?.x} / ${ratio.y}`,
      }}
    >
      {source ? (
        <>
          <img
            src={source}
            alt={alt}
            loading='lazy'
            onClick={() => uploadRef.current?.click()}
            css={{
              borderRadius,
              width: '100%',
              height: '100%',
              minWidth: minWidth,
              minHeight: minHeight,
              maxWidth: maxWidth,
              maxHeight: maxHeight,
              objectFit: 'cover',
            }}
          />
          <>
            {!!onCancel && (
              <div
                onClick={onCancel}
                css={{
                  zIndex: 10,
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 1000,
                  padding: '4px 6px',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  cursor: 'pointer',
                  userSelect: 'none',
                  '&:active': { opacity: 0.7 },
                }}
              >
                <span css={{ color: '#eee', fontSize: '0.75rem' }}>취소</span>
              </div>
            )}
          </>
        </>
      ) : (
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            aspectRatio: `${ratio?.x} / ${ratio.y}`,
            width: '100%',
            height: '100%',
            minWidth: minWidth,
            minHeight: minHeight,
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            backgroundColor: backgroundColor ?? VARIANTS[theme].readBg,
            borderRadius,
          }}
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>{props.children ?? <CameraIcon size={100} fill={VARIANTS[theme].cancelTabColor} />}</>
          )}
        </div>
      )}

      <input
        ref={uploadRef}
        type='file'
        accept='image/png, image/jpeg, image/jpg'
        onChange={handleOnUpload}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        css={themes.input}
      />
    </div>
  );
};

//
//
const CameraIcon = ({ size, fill }: { size: number; fill: string }) => {
  return (
    <svg width={`${size / 2.5}px`} viewBox='0 0 460 413' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M123.465 144.567H170.008V282.637C170.009 289.36 172.68 295.808 177.434 300.562C182.189 305.316 188.637 307.987 195.36 307.987H264.56C271.284 307.987 277.732 305.316 282.486 300.561C287.241 295.807 289.912 289.359 289.912 282.635V144.567H336.439C340.206 144.57 343.89 143.455 347.023 141.364C350.157 139.272 352.599 136.297 354.04 132.816C355.482 129.336 355.858 125.505 355.121 121.811C354.384 118.116 352.567 114.723 349.9 112.062L243.413 5.56716C239.837 2.00228 234.993 0.000488281 229.944 0.000488281C224.895 0.000488281 220.051 2.00228 216.475 5.56716L110.011 112.062C107.349 114.725 105.536 118.116 104.802 121.809C104.067 125.501 104.443 129.329 105.883 132.808C107.323 136.286 109.762 139.26 112.891 141.353C116.02 143.446 119.7 144.565 123.465 144.567Z'
        fill={fill}
      />
      <path
        d='M437.036 196.316C434.034 196.318 431.061 196.91 428.288 198.06C425.515 199.21 422.995 200.895 420.873 203.019C418.751 205.143 417.068 207.664 415.92 210.438C414.773 213.212 414.183 216.185 414.184 219.187V314.802C414.165 328.576 408.684 341.78 398.943 351.518C389.202 361.255 375.997 366.732 362.223 366.746H97.679C83.907 366.732 70.7032 361.255 60.9648 351.516C51.2264 341.778 45.7488 328.574 45.734 314.802V219.187C45.734 213.123 43.3248 207.306 39.0364 203.018C34.748 198.73 28.9317 196.32 22.867 196.32C16.8023 196.32 10.986 198.73 6.69759 203.018C2.40919 207.306 0 213.123 0 219.187L0 314.802C0.0293787 340.699 10.33 365.527 28.642 383.839C46.954 402.151 71.7819 412.452 97.679 412.481H362.223C388.12 412.451 412.948 402.15 431.26 383.837C449.571 365.525 459.871 340.697 459.9 314.799V219.187C459.901 216.184 459.31 213.211 458.161 210.436C457.012 207.661 455.328 205.14 453.205 203.016C451.082 200.892 448.561 199.208 445.787 198.058C443.013 196.908 440.039 196.317 437.036 196.316Z'
        fill={fill}
      />
    </svg>
  );
};

const themes: any = {
  button: {
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 10,
    maxWidth: 28,
    minWidth: 28,
    maxHeight: 28,
    minHeight: 28,
  },

  input: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: '0',
    cursor: 'pointer',
  },
};

export default ImageUploader;
