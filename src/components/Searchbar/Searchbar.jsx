import { Component } from 'react';
import {
  SearchForm,
  SearchFormBtn,
  SearchInput,
  SearchbarContainer,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.createSearchQuery(this.state.value);
  };

  render() {
    return (
      <SearchbarContainer onSubmit={this.handleSubmit}>
        <SearchForm>
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
      </SearchbarContainer>
    );
  }
}
