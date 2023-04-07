import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
export class App extends Component {
  state = {
    searchQuery: '',
  };

  createSearchQuery = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div>
        <Searchbar createSearchQuery={this.createSearchQuery} />
        <ImageGallery searchQuery={this.state.searchQuery} />
      </div>
    );
  }
}
