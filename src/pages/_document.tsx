import { mySite, siteNavigation, siteOrganization, sitePerson, siteWebPage, siteWebSite } from '@/libs/site/site';

import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

type Breadcrumb = {
  position: number;
  name: string;
  url: string;
};

interface MyDocumentProps extends DocumentInitialProps {
  breadcrumbList: Breadcrumb[] | null;
  locale: string;
}

const MyDocument = ({ breadcrumbList, locale }: MyDocumentProps) => {
  const siteName = mySite.name ?? '디블에이전시';

  return (
    <Html lang={'ko'}>
      <Head>
        <meta charSet='utf-8' />
        <meta name='robots' content='index, follow' />

        {/* 기본 메타 태그 */}
        <meta name='application-name' content={siteName} />
        <meta name='keywords' content={mySite.keywords.join(', ')} />
        <meta itemProp='name' content={siteName} />
        <meta itemProp='alternateName' content={mySite.title} />

        {/* 페이지 표준정보 */}
        <link itemProp='url' href={mySite.url} />
        <link rel='canonical' href={mySite.url} />
        <link rel='alternate' href={mySite.url} hrefLang='x-default' />

        {/* open graph 정보 */}
        <meta property='og:site_name' content={siteName} />
        <meta property='og:type' content='website' />
        <meta property='og:locale' content='ko_KR' />
        <meta property='og:url' content={mySite.url} />
        <meta property='og:image' content={mySite.imageUrl} />
        <meta property='og:image:alt' content={mySite.title} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:image:type' content='image/png' />

        {/* article 정보 */}
        <meta property='article:published_time' content={new Date().toISOString()} />
        <meta property='article:modified_time' content={new Date().toISOString()} />
        <meta property='article:author' content={mySite.author} />

        {/* 아이콘 정보 */}
        <link rel='shortcut icon' href='/favicon.ico' />

        {/* rss 피드 정보 */}
        <link rel='alternate' type='application/rss+xml' title={siteName + ' RSS Feed'} href='/api/rss' />

        {/* PWA 셋팅 */}
        {/* <SplashScreens />
        <link rel='manifest' href='/manifest.json' /> */}
        <meta name='theme-color' content='#ffffff' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content={siteName} />
        <meta name='format-detection' content='telephone=no' />
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='msapplication-tap-highlight' content='no' />

        {/* 메뉴 목록 */}

        <Script
          type='application/ld+json'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: breadcrumbList?.map((breadcrumb: Breadcrumb) => ({
                '@type': 'ListItem',
                position: breadcrumb.position,
                name: breadcrumb.name,
                item: breadcrumb.url,
              })),
            }),
          }}
        />

        <Script
          strategy='afterInteractive'
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? ''}`}
        />

        {/* 조직 정보 */}
        <Script
          type='application/ld+json'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteOrganization),
          }}
        />

        {/* 사이트 정보 */}
        <Script
          type='application/ld+json'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteWebSite),
          }}
        />

        {/* 창립자 정보 */}
        <Script
          type='application/ld+json'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(sitePerson),
          }}
        />

        {/*페이지 정보 */}
        <Script
          type='application/ld+json'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteWebPage),
          }}
        />

        {/* 사이트 메뉴 정보 */}
        <Script
          type='application/ld+json'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteNavigation),
          }}
        />
      </Head>
      <body>
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-5CQBT9QD'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (ctx: DocumentContext): Promise<MyDocumentProps> => {
  const initialProps = await Document.getInitialProps(ctx);

  // Define breadcrumb list
  const breadcrumbs: { [key: string]: Breadcrumb[] } = {
    '/': [],
    '/menu': [{ position: 1, name: '메뉴', url: mySite.url + '/menu' }],
  };

  const breadcrumbList = breadcrumbs[ctx.pathname] || null;

  return {
    ...initialProps,
    breadcrumbList,
    locale: ctx.locale ?? 'ko',
  };
};

export default MyDocument;
