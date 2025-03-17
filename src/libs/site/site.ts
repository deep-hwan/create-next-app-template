import { menus } from './menus';

// 나의 사이트 정보
const siteUrl = 'https://dbleagency.com';
export const mySite = {
  name: '디블에이전시',
  title: '디블에이전시 - 트랜디한 웹디자인과 개발',
  url: siteUrl,
  description:
    '디블에이전시에서 웹디자인 및 개발까지! 우리는 일회성 작업이 아닌 지속적인 관계를 추구하고 있으며 디자인의 중요성을 누구보다 높게 평가하고 있는 웹디자인 및 개발 에이전시 팀이에요!',
  keywords: [
    '디블에이전시',
    'dbleui',
    'dbleagency',
    '웹에이전시',
    '디자인에이전시',
    '웹디자인',
    '웹사이트구축',
    '웹사이트제작',
    '관리자페이지',
    '반응형웹',
    '컴포넌트',
    '위젯',
    'ux',
    'ui',
    'it아웃소싱',
    '웹아웃소싱',
    '쇼핑몰개발',
    '무료디자인',
    '위시켓',
    '프리랜서',
    '디자인외주',
    '디자인알바',
    '외주',
    '디자인프리랜서',
    '어플제작',
    '앱개발업체',
    '프로그램개발',
    '프리랜서디자이너',
    '개발자프리랜서',
    '어플제작비용',
    '앱개발',
    '어플개발',
    '어플개발비용',
    '홈페이지제작',
    '어플리케이션',
  ],
  imageUrl: `${siteUrl}/assets/images/dble-banner.png`, // 1200x630
  logoUrl: `${siteUrl}/assets/favicons/logo.png`,
  author: 'dble',
  sameAs: [
    'https://pinterest.com/dble_ui/_created',
    'https://www.behance.net/dble2',
    'https://dribbble.com/dbleui',
    'https://www.instagram.com/dble_ui',
    'https://github.com/deep-hwan',
  ],

  // 추가 필드: 주소(PostalAddress)
  address: {
    streetAddress: '서울특별시 강남구 도곡로84길 6', // 실제 주소에 맞게 수정
    addressLocality: '서울특별시',
    addressRegion: '강남구',
    postalCode: '06282',
    addressCountry: 'KR',
  },

  // 추가 필드: 연락처(ContactPoint)
  contactPoint: {
    email: 'deep@deepcomu.com',
    tel: '+82-01-2224-4688',
    contactType: 'customer service',
    contactOption: 'TollFree', // 필요시 변경 (예: 'HearingImpairedSupported' 등)
    areaServed: 'KR',
    availableLanguage: ['Korean', 'English'],
  },

  // Person (창립자/대표)정보 추가
  founderInfo: {
    name: '정재환',
    jobTitle: '대표이사',
    email: 'deep@deepcomu.com',
    tel: '+82-01-1234-5678', // 실제 연락처로 수정 필요
    image: ``, // 대표 프로필 이미지
    sameAs: [
      'https://pinterest.com/dble_ui/_created',
      'https://www.behance.net/dble2',
      'https://dribbble.com/dbleui',
      'https://www.instagram.com/dble_ui',
      'https://github.com/deep-hwan',
    ],
    alumniOf: [
      {
        name: '', // 학교
        department: '', // 학과
        degree: '', // 학위
      },
    ],
    description:
      '디블에이전시의 창립자이자 대표이사로, 웹디자인 및 개발 분야에서 풍부한 경험을 가지고 있습니다. 트렌디한 디자인과 사용자 경험을 중시하는 웹 솔루션을 제공합니다.',
  },

  // 회사 정보 추가
  companyInfo: {
    legalName: '이게디자인',
    foundingDate: '2021-03-01', // 설립일
    taxID: '692-05-02175', // 실제 사업자등록번호로 수정 필요
    numberOfEmployees: '10-50',
    priceRange: '₩₩₩', // $ ~ $$$$$ 형식으로 가격대 표시
    openingHours: 'Mo-Fr 09:00-18:00',
    paymentAccepted: ['현금', '신용카드', '계좌이체'],
    currenciesAccepted: 'KRW',
  },
};

// 1) Organization
export const siteOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: mySite.name, // "디블에이전시"
  url: mySite.url,
  logo: mySite.logoUrl,
  description: mySite.description,
  sameAs: mySite.sameAs,
  foundingDate: mySite.companyInfo.foundingDate,
  areaServed: 'KR',
  address: {
    '@type': 'PostalAddress',
    streetAddress: mySite.address.streetAddress,
    addressLocality: mySite.address.addressLocality,
    addressRegion: mySite.address.addressRegion,
    postalCode: mySite.address.postalCode,
    addressCountry: mySite.address.addressCountry,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: mySite.contactPoint.tel,
      contactType: mySite.contactPoint.contactType,
      contactOption: mySite.contactPoint.contactOption,
      areaServed: mySite.contactPoint.areaServed,
      availableLanguage: mySite.contactPoint.availableLanguage,
    },
  ],
};

// 2) WebSite
export const siteWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: mySite.name, // "디블에이전시"
  url: mySite.url,
  // alternateName는 너무 많지 않게 최소화
  alternateName: ['디블 에이전시'],
  description: mySite.description,
  inLanguage: 'ko',
  keywords: mySite.keywords.join(', '),
  potentialAction: {
    '@type': 'SearchAction',
    target: `${mySite.url}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

// ========== (선택) 필요 시 주석 처리 ==========
// 3) WebPage (단순화 or 제거)
export const siteWebPage = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: mySite.title,
  description: mySite.description,
  keywords: mySite.keywords.join(', '),
  url: mySite.url,
  image: mySite.imageUrl,
  author: { '@type': 'Person', name: mySite.author },
};

// 4) Person (대표자 정보)
export const sitePerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '정재환',
  jobTitle: '대표이사',
  telephone: mySite.founderInfo.tel,
  image: mySite.founderInfo.image,
  description: mySite.founderInfo.description,
  sameAs: mySite.founderInfo.sameAs,
};

// 5) SiteNavigation (메뉴 구조)
export const siteNavigation = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: menus.map((menu, index) => ({
    '@type': 'SiteNavigationElement',
    position: index + 1,
    name: menu.name,
    url: `${mySite.url}${menu.url}`,
  })),
};
