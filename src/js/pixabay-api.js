import axios from 'axios';

export function requestImages(query) {
  const axiosConfig = {
    baseURL: 'https://pixabay.com/api/',
    params: {
      key: '48827874-cd9b9c73a8babeb73b5d7fdc9',
      q: `${query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    },
  };
  const pixabayAxios = new axios.create(axiosConfig);
  return pixabayAxios.get('');
}
