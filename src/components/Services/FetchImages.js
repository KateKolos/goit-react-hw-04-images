import axios from 'axios';

const API_KEY = '33793722-2c477fdbe1dd0bab1af99cdbb';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const fetchImages = async (searchQuery, page) => {
  const { data } = await axios.get(`?q=${searchQuery}&page=${page}`);

  // console.log(data);
  return data;
};
