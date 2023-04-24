import { LoadMoreBtn } from './Button.styled';

export const Button = ({ incrementPage }) => {
  return (
    <LoadMoreBtn type="button" onClick={incrementPage}>
      Load More
    </LoadMoreBtn>
  );
};
