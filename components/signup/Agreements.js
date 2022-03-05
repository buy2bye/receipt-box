import styled from '@emotion/styled';

const Agreements = ({
  privacyAgree,
  marketingAgree,
  setPrivacyAgree,
  setMarketingAgree,
  agreements,
  setAgreements,
}) => {
  const onTotalAgreeChange = (e) => {
    setAgreements({
      ageLimit: e.target.checked,
      termsAndConditions: e.target.checked,
      privacy: e.target.checked,
      marketing: e.target.checked,
    });
  };

  return (
    <Container>
      <li>
        <input
          type='checkbox'
          checked={privacyAgree && marketingAgree}
          onChange={onTotalAgreeChange}
          id='totalAgree'
        />
        <label htmlFor='totalAgree'>전체 동의</label>
      </li>
      <li>
        <input
          type='checkbox'
          checked={agreements.ageLimit}
          onChange={(e) =>
            setAgreements({ ...agreements, ageLimit: e.target.checked })
          }
          id='ageLimit'
        />
        <label htmlFor='ageLimit'>(필수) 만 14세 이상만 가입 가능합니다.</label>
      </li>
      <li>
        <input
          type='checkbox'
          checked={agreements.privacy}
          onChange={(e) =>
            setAgreements({ ...agreements, privacy: e.target.checked })
          }
          id='privacy'
        />
        <label htmlFor='privacy'>(필수) 이용약관 동의</label>
      </li>
      <li>
        <input
          type='checkbox'
          checked={agreements.termsAndConditions}
          onChange={(e) =>
            setAgreements({
              ...agreements,
              termsAndConditions: e.target.checked,
            })
          }
          id='termsAndConditions'
        />
        <label htmlFor='termsAndConditions'>
          (필수) 개인정보 수집 및 이용 동의
        </label>
      </li>
      <li>
        <input
          type='checkbox'
          checked={agreements.marketing}
          onChange={(e) =>
            setAgreements({ ...agreements, marketing: e.target.checked })
          }
          id='marketing'
        />
        <label htmlFor='marketing'>(선택) SMS/E-Mail 마케팅 수신 동의</label>
      </li>
    </Container>
  );
};

export default Agreements;

const Container = styled.ul`
  padding-top: 32px;
  li {
    display: flex;
    align-items: center;
    height: 24px;

    input {
      width: 16px;
    }

    label {
      flex: 1;
      font-size: 14px;
      color: var(--grey800);
    }
  }
`;