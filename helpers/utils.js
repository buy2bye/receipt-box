<<<<<<< HEAD
import { Router } from 'next/router';
=======
import Router from 'next/router'
>>>>>>> 37e184c460d51467e43b50933ba866fcfbad3b30

export const redirect = (url, ctx) => {
  if (typeof window === 'undefined') {
    // is server side rnedered
    ctx.res.writeHead(302, { Location: url });
    ctx.res.end();
  } else {
    Router.push(url);
  }
  return {};
};
