import Head from 'next/head';
import { useRouter } from 'next/router';
import { mySite } from './site';

interface SeoHeadProps {
  title?: string;
  description?: string;
  author?: string;
  url?: string;
  imageUrl?: string;
}

export default function SEOHead({
  title = mySite.title,
  description = mySite.description,
  author = mySite.author,
  url,
  imageUrl = mySite.imageUrl,
}: SeoHeadProps) {
  const { asPath } = useRouter();
  const thisUrl = `${mySite.url}${asPath}`;

  // 최신 날짜로 색인
  const currentDate = new Date().toISOString();

  return (
    <Head>
      {/* 기본 메타 태그 */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='generator' content='Next.js' />
      <meta name='creator' content={author} />
      <meta name='publisher' content={author} />
      <meta name='author' content={author} />
      <meta name='color-scheme' content='light' />
      <link rel='author' href={url ?? thisUrl} />

      {/* Open Graph */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />

      {/* <meta property='og:video' content='https://nextjs.org/video.mp4' />
      <meta property='og:video:width' content='800' />
      <meta property='og:video:height' content='600' />
      <meta property='og:audio' content='https://nextjs.org/audio.mp3' /> */}

      {/* Twitter */}
      <meta name='twitter:creator' content='@dble' />
      <meta name='twitter:creator:id' content='1467726470533754880' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:card' content='app' />
      <meta name='twitter:image' content={imageUrl} />
      <meta name='twitter:image:alt' content={title} />
      <meta name='twitter:app:name:iphone' content='twitter_app' />
      <meta name='twitter:app:id:iphone' content='twitter_app://iphone' />
      <meta name='twitter:app:id:ipad' content='twitter_app://ipad' />
      <meta name='twitter:app:id:googleplay' content='twitter_app://googleplay' />
      <meta name='twitter:app:url:iphone' content={thisUrl} />
      <meta name='twitter:app:url:ipad' content={thisUrl} />
      <meta name='twitter:app:name:ipad' content='twitter_app' />
      <meta name='twitter:app:name:googleplay' content='twitter_app' />

      {/* verification */}
      <meta name='google-site-verification' content='google' />

      {/* appLinks */}
      <meta property='al:web:url' content={mySite.url} />
      <meta property='al:web:should_fallback' content='true' />
      {/* <meta property='al:ios:url' content='https://nextjs.org/ios' />
      <meta property='al:ios:app_store_id' content='app_store_id' />
      <meta property='al:android:package' content='com.example.android/package' />
      <meta property='al:android:app_name' content='app_name_android' /> */}

      {/* JSON-LD (NewsArticle) */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: title,
            datePublished: currentDate,
            dateModified: currentDate,
          }),
        }}
      />
    </Head>
  );
}
