import { ImageItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = () => {
  const { webformatURL, tags, largeImageURL } = this.props.imageData;

  return (
    <ImageItem className="gallery-item">
      <img src={webformatURL} alt={tags} largeImageURL={largeImageURL} />
    </ImageItem>
  );
};
