import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';

const ReceiptApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
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
