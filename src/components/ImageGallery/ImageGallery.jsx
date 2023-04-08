import { Component } from 'react';
import { fetchImages } from '../Services/FetchImages';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    searchQuery: '',
    page: 1,
    hits: [],
    totalHits: 0,
    error: null,
  };

  componentDidUpdate(prevState, prevProps) {
    // const searchQuery = this.props.searchQuery.trim();

    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchImages(searchQuery, page);
    }
  }

  fetchImages = async (query, page) => {
    try {
      const { hits, totalHits } = await fetchImages(query, page);
      this.setState({ hits, totalHits });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { hits } = this.state;
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
