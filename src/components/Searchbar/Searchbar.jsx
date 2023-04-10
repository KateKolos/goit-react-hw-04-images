import { Component } from 'react';
import {
  SearchForm,
  SearchFormBtn,
  SearchInput,
  SearchbarContainer,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = { value: '' };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { value } = this.state;

    if (value.trim() === '') {
      return;
    }
    this.props.onSubmit(value);
    this.setState({ value: '' });
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
              value={this.state.value}
              onChange={this.handleChange}
            />
          </SearchForm>
        </header>
      </SearchbarContainer>
    );
  }
}
