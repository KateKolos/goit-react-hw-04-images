import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from './Services/FetchImages';
export class App extends Component {
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

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery hits={this.state.hits} />
        {/* {this.state.error && (
          <p textAlign="center">Sorry. Something went wrong ... 😭</p>
        )} */}
        {/* <Loader />
        <BUtton /> */}
      </div>
    );
  }
}
