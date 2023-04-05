import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '33793722-2c477fdbe1dd0bab1af99cdbb';

export default class PixabayApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  async fetchImages() {
    const searchParams = new URLSearchParams({
      params: {
        key: API_KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: '12',
        page: this.page,
      },
    });

    const response = await axios(`?${searchParams}`);

    return response;
  }
}
