import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_IAqojEjCCiO3F3bpXmNFem8dx5F9hLRbbj04r16k6Jz0CmNbdSJAk2fJYPkXAci9';

const API = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  const END_POINT = '/breeds';

  return fetch(`${API}${END_POINT}`)
    .then(resp => resp.json())
    .catch(error => {
      throw new Error(error.message);
    });
}

export function fetchCatByBreed(breedId) {
  const END_POINT = '/images/search';
  const params = new URLSearchParams({
    breed_ids: breedId,
  });
  return axios
    .get(`${API}${END_POINT}?${params}`)
    .then(resp => resp.data)
    .catch(error => {
      throw new Error(error.message);
    });
}
