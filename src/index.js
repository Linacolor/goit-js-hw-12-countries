const debounce = require('debounce');

import getCountry from './js/fetchCountries.js';
import refs from './js/refs.js';

import { error, defaultModules } from '@pnotify/core/dist/PNotify';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

defaultModules.set(PNotifyMobile, { swipeDismiss: false });

function getCountriesList(name) {
  getCountry(name)
    .then(data => {
      if (data.length > 10) {
        error({ title: 'Too many matches found. Please entera morespecific query!' });
      } else if (data.length > 1) {
        setCountryList(data);
      } else {
        setCountryInfo(data[0]);
      }
    })
    .catch(() => {
      hideElement();
      error({ title: 'No information' });
    });
}

function setCountryList(data) {
  refs.countryListEl.style.display = 'block';
  const list = data.map(el => `<li>${el.name}</li>`);
  refs.countryListEl.innerHTML = list.join('');
  setEvent();
}

function setCountryInfo(data) {
  refs.countryInfo.style.display = 'block';
  refs.countryName.textContent = data.name;
  refs.capitalEl.textContent = data.capital;
  refs.populationEl.textContent = data.population;
  refs.languageslistEl.innerHTML = data.languages.map(el => `<li>${el.name}</li>`).join('');
  refs.flagEl.src = data.flag;
}

function onClick(e) {
  refs.formEl.elements.countryName.value = e.target.textContent;
  getCountriesList(e.target.textContent);
  hideElement();
}

function setEvent() {
  refs.countryListEl.addEventListener('click', onClick);
}
function hideElement() {
  refs.countryInfo.style.display = 'none';
  refs.countryListEl.style.display = 'none';
  removeEvent();
}
function removeEvent() {
  refs.countryListEl.removeEventListener('click', onClick);
}

function onInput(e) {
  hideElement();
  if (e.target.value) getCountriesList(e.target.value);
}

refs.formEl.elements.countryName.addEventListener('input', debounce(onInput, 500));
