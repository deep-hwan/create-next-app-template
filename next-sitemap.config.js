/** @type {import('next-sitemap').IConfig} */

const siteUrl = 'https://dbleagency.com';

const menuItems = [
  { name: '홈', url: '/' },
  { name: '메뉴1', url: '/menu1' },
  { name: '메뉴2', url: '/menu2' },
  { name: '메뉴3', url: '/menu3' },
];

const additionalPaths = menuItems.map(item => ({
  loc: item.url,
  changefreq: 'daily',
  priority: item.url === '/' ? 1.0 : 0.8,
  // hreflang 정보 추가
  alternateRefs: [
    {
      href: `${siteUrl}${item.url}`,
      hreflang: 'x-default',
    },
  ],
}));

const sitemapConfig = {
  siteUrl: siteUrl,
  name: '디블에이전시',
  exclude: ['/404'],
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  outDir: './public',
  priority: 0.7,
  trailingSlash: false, //  true 시 항상 URL 끝에 / 붙임s
  alternateRefs: [
    {
      href: siteUrl,
      hreflang: 'x-default',
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/404', '/observer/jj', '/observer/ok'],
      },
    ],
    // additionalSitemaps: [`${siteUrl}/sitemap-0.xml`],
  },

  // 특정 경로 설정 -  우선순위 처리
  additionalPaths: async config => additionalPaths,
};

module.exports = sitemapConfig;
