import Head from 'next/head';
import '../styles/globals.css';

const ReceiptApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <script
          type='text/javascript'
          src='https://code.jquery.com/jquery-1.12.4.min.js'
        ></script>
        <script
          type='text/javascript'
          src='https://cdn.iamport.kr/js/iamport.payment-1.1.8.js'
        ></script>
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
