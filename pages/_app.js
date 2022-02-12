import '../styles/globals.css';
import Layout from '/components/layout/Layout';

const ReceiptApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

ReceiptApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
    return { pageProps }
  }
  return { pageProps }
}

export default ReceiptApp;
