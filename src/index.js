import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

// create options for select

function createOptions(catsArray) {
  return catsArray.map(cat => {
    const option = document.createElement('option');
    option.textContent = cat.name;
    option.value = cat.id;
    return option;
  });
}

// cats loading

fetchBreeds()
  .then(catsArray => {
    const optionsArr = createOptions(catsArray);
    refs.select.append(...optionsArr);

    new SlimSelect({
      select: refs.select,
    });

    refs.loader.classList.add('hidden');
    refs.select.classList.remove('hidden');
  })
  .catch(error => {
    refs.loader.classList.add('hidden');
    refs.error.classList.remove('hidden');
    onError(error);
  });

// choose a cat => fetchCatByBreed

function onChange() {
  refs.catInfo.classList.add('hidden');
  refs.loader.classList.remove('hidden');

  fetchCatByBreed(this.value)
    .then(resp => {
      refs.catInfo.innerHTML = createMarkUp(resp);
      refs.catInfo.classList.remove('hidden');
      refs.loader.classList.add('hidden');
    })
    .catch(error => {
      refs.loader.classList.add('hidden');
      refs.error.classList.remove('hidden');
      onError(error);
    });
}

refs.select.addEventListener('change', onChange);

// mark up for a cat

function createMarkUp(array) {
  const {
    url,
    breeds: [{ name, description, temperament }],
  } = array[0];

  return `<div class = "img-container">
            <img src="${url}" alt="cat-${name}" />
            </div>
            <div class = "text-container">
            <h1>${name}</h1>
            <p>${description}</p>
            <p><b>Temperament:</b> ${temperament}</p>
            </div> `;
}

// custom notify
function onError(error) {
  Notify.failure(`❌${error}`);
}
