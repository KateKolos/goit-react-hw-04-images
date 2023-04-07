import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImages(searchQuery, page) {
  return await axios
    .get('', {
      params: {
        key: '33793722-2c477fdbe1dd0bab1af99cdbb',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: '12',
        page: page,
      },
    })
    .then(res => console.log(res))
    .catch(error => {
      console.log(error);
    });
}
