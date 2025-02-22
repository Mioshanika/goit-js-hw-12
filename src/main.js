import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import simpleLightBox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { requestImages } from './js/pixabay-api';
import { imagesTemplate } from './js/render-functions';

const refs = {
  queryForm: document.querySelector('[data-image-query]'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};
const optionsLightBox = {
  close: false,
  showCounter: false,
  captionDelay: 250,
  captionsData: 'alt',
  scrollZoom: 'false',
  scrollZoomFactor: 'false',
  disableScroll: 'true',
};
const galleryLightBox = new simpleLightBox('.gallery a', optionsLightBox);

refs.queryForm.addEventListener('submit', event => {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  const queryText = event.target.elements.query.value.trim();
  if (!queryText) {
    iziToast.warning({
      message: 'Query field is empty. Please enter your query!',
      position: 'center',
    });
    return;
  }
  refs.loader.classList.remove('hidden');
  requestImages(queryText)
    .then(response => {
      if (response.data.hits.length) {
        refs.loader.classList.add('hidden');
        refs.gallery.innerHTML = imagesTemplate(response.data.hits);
        galleryLightBox.refresh();
      } else {
        refs.loader.classList.add('hidden');
        iziToast.info({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'center',
        });
      }
    })
    .catch(error => {
      refs.loader.classList.add('hidden');
      iziToast.error({
        message: `${error.message}`,
        position: 'center',
      });
    });
});
