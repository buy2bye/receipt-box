import Layout from 'components/layout/Layout';
import 개인정보수집동의 from 'components/signup/agreements/개인정보수집동의';

const PrivacyAgreement = () => {
  return (
    <Layout hideBottom>
      <개인정보수집동의 />
    </Layout>
  );
};

export default PrivacyAgreement;
