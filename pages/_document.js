import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
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
