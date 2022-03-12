import { ImageProvider } from 'contexts/ImageContext';
import Script from 'next/script';
import '../styles/globals.css';

const ReceiptApp = ({ Component, pageProps }) => {
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
