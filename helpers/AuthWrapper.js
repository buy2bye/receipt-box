import { getCookie } from 'helpers/cookie';
import { redirect } from 'helpers/utils';

const WrapAuthPage = (WrapperComponent) => {
  const Wrapper = (props) => {
    return <WrapperComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx) => {
    // token 검증
    const accessToken = getCookie('accessToken', ctx);
    const refreshToken = getCookie('refreshToken', ctx);
    if (!accessToken || !refreshToken) {
      redirect('/login', ctx);
    }

    const componentProps =
      WrapperComponent.getInitialProps &&
      (await WrapperComponent.getInitialProps(ctx));
    return componentProps;
  };

  return Wrapper;
};

export default WrapAuthPage;
