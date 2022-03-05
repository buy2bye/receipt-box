import styled from '@emotion/styled';

const AgreementWrapper = ({ children }) => {
  return <Container>{children}</Container>;
};

export default AgreementWrapper;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    width: 100%;
    text-align: center;
    font-size: 20px;
  }

  h3 {
    font-size: 14px;
    font-weight: 700;
  }

  p {
    font-size: 13px;
    line-height: 1.8;
  }

  table {
    width: 100%;
    border: 1px solid var(--grey600);
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid var(--grey600);
    padding: 8px;
    font-size: 12px;
  }
`;
