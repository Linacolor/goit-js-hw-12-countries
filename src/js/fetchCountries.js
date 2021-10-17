export default function fetchCountries(name) {
  return fetch(`https://restcountries.com/v2/name/${name}`)
    .then(res => {
      return res.json();
    })
    .catch(error => alert(error));
}
