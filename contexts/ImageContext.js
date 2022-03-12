const { createContext, useState } = require('react');

const ImageContext = createContext({
  imageSrc: '',
  changeImageSrc: () => {},
  imageFile: {},
  changeImageFile: () => {},
});

const ImageProvider = ({ children }) => {
  const [imageSrc, setImageSrc] = useState('');
  const [imageFile, setImageFile] = useState({});

  const changeImageSrc = (src) => {
    setImageSrc(src);
  };

  const changeImageFile = (file) => {
    setImageFile(file);
  };

  return (
    <ImageContext.Provider
      value={{ imageSrc, changeImageSrc, imageFile, changeImageFile }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export { ImageContext, ImageProvider };
