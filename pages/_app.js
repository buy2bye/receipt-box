import { ImageProvider } from 'contexts/ImageContext';
import { bootChannelTalk, loadScriptChannelTalk } from 'helpers/channelTalk';
import Script from 'next/script';
import { useEffect } from 'react';
import '../styles/globals.css';

const ReceiptApp = ({ Component, pageProps }) => {
  useEffect(() => {
    !window.ChannelIO && loadScriptChannelTalk();
    bootChannelTalk(true);
  }, []);

  return (
    <>
      <Script
        id='gtm-initialize'
        dangerouslySetInnerHTML={{
          __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TB3FVSD');
`,
        }}
      />
      <Script
        id='gtm-import'
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-C3Y2KNT4G2'
      />
      <Script
        id='gtag-initialize'
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-C3Y2KNT4G2');`,
        }}
      />
      <Script
        id='pixel-import'
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '267078698896767');
fbq('track', 'PageView');`,
        }}
      />
      <noscript>
        <img
          height='1'
          width='1'
          style={{ display: 'none' }}
          src='https://www.facebook.com/tr?id=267078698896767&ev=PageView&noscript=1'
          alt='facebook'
        />
      </noscript>

      <ImageProvider>
        <Component {...pageProps} />
      </ImageProvider>
    </>
  );
};

ReceiptApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
    return { pageProps };
  }
  return { pageProps };
};

export default ReceiptApp;
