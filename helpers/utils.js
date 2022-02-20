import Router from 'next/router';

export const redirect = (url, ctx) => {
  if (typeof window === 'undefined') {
    // is server side rendered
    ctx.res.writeHead(302, { Location: url });
    ctx.res.end();
  } else {
    Router.push(url);
  }
  return {};
};

export const calculateDateDiff = (date) => {
  if (isNaN(Date.parse(date))) return { okay: false, data: null };

  const today = new Date();
  const purchaseDay = new Date(date);
  const dateDiff = parseInt((today - purchaseDay) / 1000 / 60 / 60 / 24);

  return { okay: true, data: { dateDiff: dateDiff } };
};
