import { getCookie } from 'helpers/cookie';
import { redirect } from 'helpers/utils';
import apiController from './apiController';

const WrapAuthPage = (WrapperComponent, isLoginPage, isSNSSignupPage) => {
  const Wrapper = (props) => {
    return <WrapperComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx) => {
    const { bz_tracking_id } = ctx.query;

    const queryParams = ctx.asPath.slice(ctx.pathname.length);

    // token 검증
    const accessToken = getCookie('accessToken', ctx);
    const refreshToken = getCookie('refreshToken', ctx);
    if (!isLoginPage && (!accessToken || !refreshToken)) {
      if (bz_tracking_id) redirect(`/login${queryParams}`, ctx);
      else redirect(`/login${queryParams}`, ctx);
    } else if (isLoginPage && accessToken && refreshToken) {
      redirect('/', ctx);
    } else if (!isLoginPage) {
      const res = await apiController({ ctx: ctx }).get('/api/user/info');
      if (res) {
        const { data: userInfo } = res;
        if (!isSNSSignupPage && !userInfo.username && !userInfo.nickname) {
          // SNS 유저인데 닉네임 설정을 안했다
          redirect('/snssignup', ctx);
        }
      }
    }

    const componentProps =
      WrapperComponent.getInitialProps &&
      (await WrapperComponent.getInitialProps(ctx));
    return componentProps;
  };

  return Wrapper;
};

export default WrapAuthPage;
