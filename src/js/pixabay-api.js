import axios from 'axios';

export async function requestImages({ query, page, perPage }) {
  const axiosConfig = {
    baseURL: 'https://pixabay.com/api/',
    params: {
      key: '48827874-cd9b9c73a8babeb73b5d7fdc9',
      q: `${query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: `${page}`,
      per_page: `${perPage}`,
    },
  };
  const pixabayAxios = new axios.create(axiosConfig);
  return await pixabayAxios.get('');
}
