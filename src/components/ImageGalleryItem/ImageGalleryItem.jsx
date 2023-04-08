import { ImageItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, tags }) => {
  return (
    <ImageItem className="gallery-item">
      <img src={webformatURL} alt={tags} />
    </ImageItem>
  );
};
