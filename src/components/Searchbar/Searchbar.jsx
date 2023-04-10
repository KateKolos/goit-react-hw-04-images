import { Component } from 'react';
import {
  SearchForm,
  SearchFormBtn,
  SearchInput,
  SearchbarContainer,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = { searchQuery: '' };

  handleChange = e => {
    this.setState({
      searchQuery: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { searchQuery } = this.state;

    if (searchQuery.trim() === '') {
      return;
    }
    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <SearchbarContainer>
        <header className="searchbar">
          <SearchForm onSubmit={this.handleSubmit}>
            <SearchFormBtn type="submit" className="button">
              <span className="button-label">Search</span>
            </SearchFormBtn>

            <SearchInput
              name="value"
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.searchQuery}
              onChange={this.handleChange}
            />
          </SearchForm>
        </header>
      </SearchbarContainer>
    );
  }
}
