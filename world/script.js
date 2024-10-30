const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector(".search-container input");
const themeChanger = document.querySelector(".theme-changer");
const languageFilter = document.querySelector(".language-filter");

let allCountriesData;

// Fetch all country data
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    allCountriesData = data;
    renderCountries(data);
  });

// Filter by region
filterByRegion.addEventListener("change", () => {
  const region = filterByRegion.value;
  fetch(`https://restcountries.com/v3.1/region/${region}`)
    .then((res) => res.json())
    .then(renderCountries)
    .catch(console.error);
});

// Filter by language
languageFilter.addEventListener("change", () => {
  const language = languageFilter.value.toLowerCase();
  const filteredCountries = allCountriesData.filter(
    (country) =>
      country.languages &&
      Object.values(country.languages).some(
        (lang) => lang.toLowerCase() === language
      )
  );
  renderCountries(filteredCountries);
});

// Filter by search input
searchInput.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(searchText)
  );
  renderCountries(filteredCountries);
});

// Toggle dark mode
// themeChanger.addEventListener('click', () => {
//   document.body.classList.toggle('dark');
// });

// Render country cards on the main page
function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `country.html?name=${encodeURIComponent(
      country.name.common
    )}`;

    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common} flag" class="country-flag" />
      <div class="card-text">
        <h3 class="card-title">${country.name.common}</h3>
      </div>
    `;

    countriesContainer.append(countryCard);
  });
}

// Toggle dark mode

themeChanger.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const themeIcon = document.getElementById("theme-icon");
  const themeText = document.getElementById("theme-text");

  // Change icon and text based on the current theme
  if (document.body.classList.contains("dark")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun"); // Change to sun icon
    themeText.textContent = "Light Mode"; // Change text to Light Mode
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon"); // Change to moon icon
    themeText.textContent = "Dark Mode"; // Change text to Dark Mode
  }
});
