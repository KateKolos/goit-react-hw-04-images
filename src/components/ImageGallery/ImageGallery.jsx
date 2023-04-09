import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';

export const ImageGallery = ({ images, onGetImages }) => {
  return (
    <ImageList className="gallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          getItemOnClick={onGetImages}
        />
      ))}
    </ImageList>
  );
};
