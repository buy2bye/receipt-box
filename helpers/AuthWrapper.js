import { getCookie } from 'helpers/cookie';
import { redirect } from 'helpers/utils';

const WrapAuthPage = (WrapperComponent, isLoginPage) => {
  const Wrapper = (props) => {
    return <WrapperComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx) => {
    // token 검증
    const accessToken = getCookie('accessToken', ctx);
    const refreshToken = getCookie('refreshToken', ctx);
    if (!isLoginPage && (!accessToken || !refreshToken)) {
      redirect('/login', ctx);
    }

    if (isLoginPage && accessToken && refreshToken) {
      redirect('/', ctx);
    }

    const componentProps =
      WrapperComponent.getInitialProps &&
      (await WrapperComponent.getInitialProps(ctx));
    return componentProps;
  };

  return Wrapper;
};

export default WrapAuthPage;
