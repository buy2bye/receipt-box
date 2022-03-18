import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <title>바투바개발</title>
          <meta name="description" content="바이투바이 테스트서버입니다"></meta>
          <meta property="og:type" content="website"></meta>
          <meta property="og:title" content="바투바개발S"></meta>
          <meta property="og:description" content="바이투바이 테스트서버입니다S"></meta>
          <meta property="og:url" content="http://dev.buy2bye.co.kr"></meta>
        </Head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TB3FVSD"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
