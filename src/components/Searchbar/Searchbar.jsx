import { useState } from 'react';
import {
  SearchForm,
  SearchFormBtn,
  SearchInput,
  SearchbarContainer,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <SearchbarContainer>
      <header className="searchbar">
        <SearchForm onSubmit={handleSubmit}>
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
            value={searchQuery}
            onChange={handleChange}
          />
        </SearchForm>
      </header>
    </SearchbarContainer>
  );
}
