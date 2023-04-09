import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from './Services/FetchImages';
import { Button } from './Button/Button';

import { ThreeDots } from 'react-loader-spinner';
import { Text } from './Text/Text';

// import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    total: 0,
    error: null,
    isActiveBtn: false,
    showModal: false,
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    // console.log('this.state:', this.state.total);
    // console.log('prev state:', prevState.total);
    if (prevState.searchQuery !== searchQuery) {
      this.getImages(searchQuery, page);
    }
  }

  getImages = async () => {
    const { searchQuery, page, images } = this.state;
    this.setState({ isActiveBtn: false, isLoading: true });

    try {
      const { hits, totalHits } = await fetchImages(searchQuery, page);
      this.setState(({ page, images }) => ({
        // searchQuery: searchQuery,
        images: [...images, ...hits],
        // total: totalHits,
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

    // const { searchQuery, page } = this.state;

    // try {
    //   this.setState({ isLoading: true });
    //   const response = await fetchImages(searchQuery, page);

    //   if (response.hits.length === 0) {
    //     return <p>No pictures</p>;
    //   }
    //   this.setState(prevState => ({
    //     images: [...prevState.images, ...response.hits],
    //   }));
    //   this.setState({ total: response.totalHits });
    // } catch (error) {
    //   return <p>Sorry, something went wrong...Please, try again</p>;
    // } finally {
    //   this.setState({ isLoading: false });
    // }
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  getLargeImage = largeImage => {
    this.setState({ largeImage, showModal: true });
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { error, isLoading, isActiveBtn } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          images={this.state.images}
          onGetImages={this.getLargeImage}
        />
        {error && <Text textAlign="center" />}
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
        {/* {this.state.showModal && (
          <Modal
            largeImage={this.state.largeImage}
            onClick={this.toggleModal}
          />
        )} */}
      </div>
    );
  }
}
