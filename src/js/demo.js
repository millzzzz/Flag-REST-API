// fetch flag picture, country, population, region and capital
/* eslint-disable */
function createElements() {
  fetch(
    'https://restcountries.eu/rest/v2/all?fields=flag;name;population;region;capital',
  )
    .then((res) => res.json())
    .then((data) => {
      let i = 0;
      while (i < 8) {
        let randomNumber = Math.ceil(Math.random() * data.length);

        // **how to check whether we are at the end or not? -> maybe create an array with the numbers and pick one on arndom
        const previousArray = [];
        previousArray.push(randomNumber);
        if (previousArray.includes(randomNumber)) {
          randomNumber = Math.ceil(Math.random() * data.length);
        }

        const url = data[randomNumber].flag;
        const country = data[randomNumber].name;
        const { population } = data[randomNumber];
        const { region } = data[randomNumber];
        const { capital } = data[randomNumber];

        const flexChild = document.createElement('div');
        flexChild.className = 'main__flags--child';
        flexChild.innerHTML = `
                <div class="flag-div"><img class="flag-img" src="${url}" width="100%" height="100%" alt="flag">
                </div>
                 <div class="content">
                 <h1 style="padding: 15px 0;">${country}</h1>
                <p>Population: ${population}</p>
                <p>Region: ${region}</p>
                <p>Capital: ${capital}</p>
                </div>`;
        // eslint-disable-next-line no-undef
        document
          .querySelector('div.main__flags')
          .appendChild(flexChild);
        i += 1;
      }
    })
    .catch((error) => console.error(error));
}

// function filterByRegion() {}
// function search() {}

// eslint-disable-next-line no-undef
window.onload = createElements;
window.onscroll = function () {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight
  ) {
    // if we happen to be at the end, then just disable it
    createElements();
  }
};
/**
 * TODO: don't show the same anymore - parse them into an array and if the array includes then create a new random number
 * TODO: setup Beautify
 * TODO: You can infinitively scroll up or down
 */
