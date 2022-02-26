import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';

const ReceiptApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <Script src='https://code.jquery.com/jquery-1.12.4.min.js'></Script>
        <Script src='https://cdn.iamport.kr/js/iamport.payment-1.1.8.js'></Script>
      </Head>
      <Component {...pageProps} />
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
