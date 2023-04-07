import { Component } from 'react';
import { fetchImages } from '../Services/FetchImages';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    images: [],
  };

  componentDidUpdate(prevProps) {
    const searchQuery = this.props.searchQuery.trim();

    if (prevProps.searchQuery !== this.props.searchQuery) {
      fetchImages(searchQuery).then(images => {
        this.setState({ images });
      });
    }
  }

  render() {
    const { images } = this.state;
    return (
      images && (
        // <ul className="gallery">
        //   {images.map(el => (
        //     <li key={el.id} className="gallery-item">
        //       <img src={el.webformatURL} alt="" />
        //     </li>
        //   ))}
        // </ul>
        <ImageList className="gallery">
          {images.map(image => (
            <ImageGalleryItem key={image.id} imageData={image} />
          ))}
        </ImageList>
      )
    );
  }
}
