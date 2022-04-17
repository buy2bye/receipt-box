import styled from '@emotion/styled';

const FileInputLabel = ({
  skeletonImage,
  onChange,
  imageWidth,
  imageHeight,
}) => {
  return (
    <Container imageWidth={imageWidth} imageHeight={imageHeight}>
      <label htmlFor='upload-file'>
        <img src={skeletonImage} alt='skeleton' />
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

  label {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: ${(props) => props.imageWidth || '100%'};
    height: ${(props) => props.iamgeHeight || '100%'};
  }
`;
