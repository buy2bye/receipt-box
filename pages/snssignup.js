import SNSSingup from "components/signup/SNSSignup";
import WrapAuthPage from 'helpers/AuthWrapper';

const SNSSignupPage = () => {
  return <SNSSingup />;
};

export default WrapAuthPage(SNSSignupPage, false, true);
