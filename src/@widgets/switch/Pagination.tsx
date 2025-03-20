/** @jsxImportSource @emotion/react */
import { LoadingSpinner } from '@/@dble_layout';
import { colors } from '@/libs/themes';
import { Interpolation, Theme } from '@emotion/react';
import dynamic from 'next/dynamic';
import React from 'react';

interface PaginationProps {
  activePage: number;
  itemsCountPerPage: number;
  totalItemsCount: number;
  pageRangeDisplayed?: number;
  hideNavigation?: boolean;
  hideEndNavigation?: boolean;
  activeScrollTop?: boolean;
  onChange?: (pageNumber: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  activePage = 1,
  itemsCountPerPage = 10,
  totalItemsCount,
  pageRangeDisplayed = 4,
  hideNavigation = true,
  hideEndNavigation = true,
  activeScrollTop,
  onChange,
}) => {
  const totalPages = Math.ceil(totalItemsCount / itemsCountPerPage);
  const startPage = Math.max(1, activePage - Math.floor(pageRangeDisplayed / 2));
  const endPage = Math.min(totalPages, startPage + pageRangeDisplayed - 1);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== activePage) {
      onChange && onChange(pageNumber);
      activeScrollTop && window.scrollTo({ top: 0 });
    }
  };

  return (
    <div
      className='react-pagination'
      css={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <div css={tabWrapTheme}>
        {!hideEndNavigation && activePage !== 1 && (
          <button onClick={() => handlePageChange(1)} disabled={activePage === 1} css={tabTheme}>
            <FlowEndIcon as='prev' />
          </button>
        )}

        {!hideNavigation && activePage !== 1 && (
          <button onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1} css={tabTheme}>
            <FlowIcon as='prev' />
          </button>
        )}
      </div>

      <div css={numberWrapTheme}>
        {Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx).map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={pageNumber === activePage ? 'active' : ''}
            css={{
              ...(numberTheme as any),
              backgroundColor: pageNumber === activePage ? colors.keyColor : '',
              color: pageNumber === activePage ? '#fff' : '#666',

              '&:hover': {
                color: pageNumber === activePage ? '#fff' : colors.keyColor,
                backgroundColor: pageNumber === activePage ? colors.keyColor : '#f6f7fc',
              },
              '&:active': { scale: 0.9 },
            }}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <div css={tabWrapTheme}>
        {!hideNavigation && activePage !== totalPages && (
          <>
            <button
              onClick={() => handlePageChange(activePage + 1)}
              disabled={activePage === totalPages}
              css={tabTheme}
            >
              <FlowIcon />
            </button>
          </>
        )}

        {!hideEndNavigation && activePage !== totalPages && (
          <>
            <button onClick={() => handlePageChange(totalPages)} disabled={activePage === totalPages} css={tabTheme}>
              <FlowEndIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const Pagination = dynamic(() => Promise.resolve(PaginationComponent), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default Pagination;

const FlowIcon = ({ as, fill = '#999' }: { as?: 'prev' | 'next'; fill?: string }) => (
  <svg
    width='10'
    height='10'
    viewBox='0 0 22 22'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    css={{
      rotate: as === 'prev' ? '180deg' : '0deg',
    }}
  >
    <mask id='mask0_501_2' maskUnits='userSpaceOnUse' x='5' y='0' width='12' height='22'>
      <path d='M5.60231 22L16.3966 22L16.3966 4.76837e-07L5.6023 1.4205e-06L5.60231 22Z' fill='white' />
    </mask>
    <g mask='url(#mask0_501_2)'>
      <path
        d='M5.93238 2.123L13.4828 10.8669L6.12598 19.9001C5.91951 20.1311 5.80656 20.4307 5.80918 20.7405C5.80695 21.0709 5.93546 21.3888 6.16668 21.6249C6.28002 21.7423 6.41563 21.836 6.5656 21.9004C6.71557 21.9648 6.87687 21.9987 7.04008 22C7.20642 21.9966 7.37044 21.9603 7.52263 21.8931C7.67482 21.8258 7.81216 21.7291 7.92668 21.6084L16.0667 11.6908C16.2826 11.4551 16.4011 11.1463 16.3985 10.8267C16.3958 10.5071 16.2721 10.2003 16.0524 9.9682L7.69238 0.3828C7.58082 0.26188 7.44543 0.165376 7.29473 0.0993703C7.14403 0.0333646 6.9813 -0.000712048 6.81678 -0.000712034C6.65226 -0.00071202 6.48952 0.0333647 6.33882 0.0993704C6.18813 0.165376 6.05273 0.26188 5.94118 0.382801C5.72331 0.619356 5.60147 0.928636 5.59943 1.25022C5.5974 1.57181 5.71532 1.88261 5.93018 2.1219'
        fill={fill}
      />
    </g>
  </svg>
);

const FlowEndIcon = ({ as, fill = '#aaa' }: { as?: 'prev' | 'next'; fill?: string }) => (
  <svg
    width='10'
    height='10'
    viewBox='0 0 14 14'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    css={{
      rotate: as === 'prev' ? '180deg' : '0deg',
    }}
  >
    <mask id='mask0_1456_2' maskUnits='userSpaceOnUse' x='6' y='0' width='7' height='14'>
      <path d='M6.63567 13.4856L13 13.4856L13 0.514393L6.63567 0.514393L6.63567 13.4856Z' fill='white' />
    </mask>
    <g mask='url(#mask0_1456_2)'>
      <path
        d='M6.83029 1.76612L11.282 6.92153L6.94444 12.2475C6.82271 12.3837 6.75611 12.5604 6.75765 12.743C6.75634 12.9378 6.83211 13.1253 6.96844 13.2645C7.03526 13.3337 7.11522 13.3889 7.20364 13.4269C7.29206 13.4649 7.38717 13.4848 7.48339 13.4856C7.58147 13.4836 7.67817 13.4622 7.76791 13.4226C7.85764 13.3829 7.93861 13.3259 8.00613 13.2547L12.8055 7.4073C12.9328 7.26832 13.0027 7.08627 13.0011 6.89782C12.9995 6.70937 12.9266 6.52851 12.7971 6.39166L7.86799 0.740093C7.80222 0.668798 7.72239 0.6119 7.63354 0.572983C7.54469 0.534066 7.44874 0.513974 7.35174 0.513974C7.25473 0.513974 7.15878 0.534066 7.06993 0.572983C6.98108 0.6119 6.90125 0.668798 6.83548 0.740093C6.70703 0.879567 6.63519 1.06192 6.63399 1.25153C6.63279 1.44114 6.70232 1.62438 6.82899 1.76547'
        fill={fill}
      />
    </g>
    <mask id='mask1_1456_2' maskUnits='userSpaceOnUse' x='1' y='0' width='8' height='14'>
      <path d='M1.18183 14L8.05093 14L8.05093 0L1.18183 6.00516e-07L1.18183 14Z' fill='white' />
    </mask>
    <g mask='url(#mask1_1456_2)'>
      <path
        d='M1.39186 1.351L6.19666 6.9153L1.51506 12.6637C1.38368 12.8107 1.3118 13.0014 1.31346 13.1985C1.31204 13.4088 1.39382 13.6111 1.54096 13.7613C1.61309 13.836 1.69939 13.8956 1.79482 13.9366C1.89026 13.9776 1.99291 13.9992 2.09677 14C2.20262 13.9979 2.30699 13.9747 2.40384 13.932C2.50069 13.8892 2.58809 13.8276 2.66097 13.7508L7.84097 7.4396C7.97834 7.2896 8.05378 7.09311 8.0521 6.88971C8.05041 6.68631 7.97171 6.49111 7.83187 6.3434L2.51186 0.243601C2.44087 0.166651 2.35471 0.10524 2.25882 0.0632361C2.16292 0.0212325 2.05936 -0.000452948 1.95466 -0.000452939C1.84997 -0.00045293 1.74641 0.0212325 1.65051 0.0632361C1.55461 0.10524 1.46845 0.166651 1.39746 0.243601C1.25882 0.394137 1.18128 0.590951 1.17999 0.795598C1.17869 1.00024 1.25374 1.19802 1.39046 1.3503'
        fill={fill}
      />
    </g>
  </svg>
);

const numberWrapTheme = {
  display: 'flex',
  alignItems: 'center',
  gap: 5,
} as Interpolation<Theme>;

const numberTheme = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  //   minWidth: 34,
  //   minHeight: 34,

  minWidth: 27,
  minHeight: 27,
  padding: 4,
  fontSize: '0.813rem',
  lineHeight: '1rem',
  borderRadius: 100,
} as Interpolation<Theme>;

const tabWrapTheme = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
} as Interpolation<Theme>;

const tabTheme = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 27,
  minHeight: 27,
  borderRadius: 100,
  backgroundColor: '#f5f5f5',

  '&:hover': { backgroundColor: '#f4f4f4' },
  '&:active': { scale: 0.9 },
} as Interpolation<Theme>;
