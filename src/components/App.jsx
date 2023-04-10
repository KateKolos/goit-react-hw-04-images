import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from './Services/FetchImages';
import { Button } from './Button/Button';

import { ThreeDots } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';

// import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    isActiveBtn: false,
    showModal: false,
    isLoading: false,
    largeImage: '',
    error: null,
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.getImages();
    }
  }

  getImages = async () => {
    const { searchQuery, page, images } = this.state;
    this.setState({ isActiveBtn: false, isLoading: true });

    try {
      const { hits, totalHits } = await fetchImages(searchQuery, page);

      this.setState(({ page, images }) => ({
        images: [...images, ...hits],
        page: page + 1,
        isActiveBtn: true,
      }));

      if (images.length === totalHits) this.setState({ isActiveBtn: false });
    } catch (error) {
      this.setState({
        error: error.message,
        isActiveBtn: false,
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  getLargeImage = largeImage => {
    this.setState({ largeImage, showModal: true });
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { error, isLoading, isActiveBtn, showModal, largeImage } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          images={this.state.images}
          onGetImages={this.getLargeImage}
        />
        {error && (
          <div
            style={
              ({ textAlign: 'center' },
              { fontSize: '25px' },
              { fontWeight: '600' })
            }
          >
            {error}
          </div>
        )}
        {isLoading && (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#3f51b5"
            ariaLabel="three-dots-loading"
            wrapperStyle={{
              display: 'flex',
              justifyContent: 'center',
            }}
            wrapperClassName=""
            visible={true}
          />
        )}
        {isActiveBtn && <Button onLoadMore={() => this.getImages} />}
        {showModal && (
          <Modal largeimage={largeImage} onClick={this.toggleModal} />
        )}
      </div>
    );
  }
}
