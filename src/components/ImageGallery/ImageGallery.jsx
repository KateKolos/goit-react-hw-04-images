import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';

export class ImageGallery extends Component {
  render() {
    const { hits } = this.props;
    return (
      <ImageList className="gallery">
        {hits.map(hit => (
          <ImageGalleryItem
            key={hit.id}
            webformatURL={hit.webformatURL}
            tags={hit.tags}
          />
        ))}
      </ImageList>
    );
  }
}
