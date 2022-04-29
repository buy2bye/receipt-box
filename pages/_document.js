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
          <title>바이투바이</title>
          <meta
            name='description'
            content='애장품관리 앱 바이투바이! 내 애장품을 처음 만났을 떄(Buy)부터 작별할 때(Bye)까지 그 여정을 함께 합니다'
          ></meta>
          <meta property='og:type' content='website'></meta>
          <meta property='og:title' content='바이투바이'></meta>
          <meta
            property='og:description'
            content='애장품관리 앱 바이투바이! 내 애장품을 처음 만났을 떄(Buy)부터 작별할 때(Bye)까지 그 여정을 함께 합니다'
          ></meta>
          <meta property='og:url' content='https://buy2bye.co.kr'></meta>
          <link rel='canonical' href='https://buy2bye.co.kr'></link>
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
