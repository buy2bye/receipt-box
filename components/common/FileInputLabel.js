import styled from '@emotion/styled';

const FileInputLabel = ({ image, onChange, imageWidth, imageHeight }) => {
  return (
    <Container imageWidth={imageWidth} imageHeight={imageHeight}>
      <label htmlFor='upload-file'>
        <img src={image} alt='skeleton' />
      </label>
      <input
        type='file'
        id='upload-file'
        accept='image/*'
        onChange={onChange}
      />
    </Container>
  );
};

export default FileInputLabel;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  img {
    width: ${(props) => props.imageWidth || '100%'};
    height: ${(props) => props.imageHeight || '100%'};
    object-fit: cover;
  }
`;
