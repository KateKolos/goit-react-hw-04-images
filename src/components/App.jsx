import toast, { Toaster } from 'react-hot-toast';

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
    totalHits: 0,
    error: null,
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, images: [] });
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
        totalHits,
      }));

      if (images.length === totalHits) {
        this.setState({ isActiveBtn: false });
        return toast.error(
          'Sorry, there are no images matching your request. Please try again.'
        );
      }
      return toast.success(
        `Success! Here are the pictures on your ${searchQuery} request`
      );
    } catch (error) {
      this.setState({
        error: error.message,
        isActiveBtn: false,
      });
      return toast.error('Something went wrong. Please try again!');
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
    const {
      error,
      isLoading,
      isActiveBtn,
      showModal,
      largeImage,

      totalHits,
      images,
    } = this.state;

    const errorStyle = {
      textAlign: 'center',
      fontSize: '25px',
      fontWeight: '600',
    };
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          images={this.state.images}
          onGetImages={this.getLargeImage}
        />
        <Toaster position="top-right" reverseOrder={false} />
        {error && <div style={errorStyle}>{error}</div>}
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
        {isActiveBtn &&
          this.state.images &&
          totalHits > 1 &&
          images.length < totalHits && (
            <Button onLoadMore={() => this.getImages} />
          )}
        {showModal && (
          <Modal largeimage={largeImage} onClick={this.toggleModal} />
        )}
      </div>
    );
  }
}
