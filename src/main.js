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
  loadmoreBtn: document.querySelector('.load-more-btn'),
  endMsg: document.querySelector('.end-msg'),
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
const queryParams = {
  query: '',
  page: 1,
  perPage: 40,
  lastPage: 1,
};
function showORhideLoadmoreBtn() {
  if (queryParams.page < queryParams.lastPage) {
    refs.loadmoreBtn.classList.remove('hidden');
  } else {
    refs.loadmoreBtn.classList.add('hidden');
    refs.endMsg.classList.remove('hidden');
  }
}
function scrollPage() {
  const info = refs.gallery.firstElementChild.getBoundingClientRect();
  scrollBy({
    behavior: 'smooth',
    top: info.height * 2,
  });
}
const submitHandler = async event => {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  refs.loadmoreBtn.classList.add('hidden');
  refs.endMsg.classList.add('hidden');
  queryParams.query = event.target.elements.query.value.trim();
  if (!queryParams.query) {
    refs.loadmoreBtn.classList.add('hidden');
    iziToast.warning({
      message: 'Query field is empty. Please enter your query!',
      position: 'center',
    });
    return;
  }
  refs.loader.classList.remove('hidden');
  queryParams.page = 1;
  try {
    const response = await requestImages(queryParams);
    refs.loader.classList.add('hidden');
    if (response.data.hits.length) {
      refs.gallery.innerHTML = imagesTemplate(response.data.hits);
      galleryLightBox.refresh();
      queryParams.lastPage = Math.ceil(
        response.data.totalHits / queryParams.perPage
      );
      showORhideLoadmoreBtn();
    } else {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'center',
      });
    }
  } catch (error) {
    refs.loader.classList.add('hidden');
    iziToast.error({
      message: `${error.message}`,
      position: 'center',
    });
  }
};
const loadmoreHandler = async () => {
  refs.loader.classList.remove('hidden');
  scrollBy({
    behavior: 'smooth',
    top: 44,
  });
  queryParams.page += 1;
  try {
    const response = await requestImages(queryParams);
    refs.loader.classList.add('hidden');
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      imagesTemplate(response.data.hits)
    );
    galleryLightBox.refresh();
    scrollPage();
    showORhideLoadmoreBtn();
  } catch (error) {
    refs.loader.classList.add('hidden');
    refs.loadmoreBtn.classList.add('hidden');
    refs.endMsg.classList.add('hidden');
    iziToast.error({
      message: `${error.message}`,
      position: 'center',
    });
  }
};

const galleryLightBox = new simpleLightBox('.gallery a', optionsLightBox);
refs.queryForm.addEventListener('submit', submitHandler);
refs.loadmoreBtn.addEventListener('click', loadmoreHandler);
