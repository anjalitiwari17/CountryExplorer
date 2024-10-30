const countryContainer = document.querySelector(".country-container");
const themeChanger = document.querySelector(".theme-changer");

// Function to fetch and display country details
function fetchCountryDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const countryName = urlParams.get("name");

  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((res) => res.json())
    .then((data) => {
      const country = data[0];
      renderCountryDetails(country);
    });
}

// Render country details
function renderCountryDetails(country) {
  countryContainer.innerHTML = `
   <h2>${country.name.common}</h2>
    <img src="${country.flags.svg}" alt="${country.name.common} flag" />
   
    <p><b>Capital:</b> ${country.capital?.[0] || "N/A"}</p>
    <p><b>Region:</b> ${country.region}</p>
    <p><b>Population:</b> ${country.population.toLocaleString()}</p>
    <p><b>Top Level Domain:</b> ${country.tld ? country.tld[0] : "N/A"}</p>
    <p><b>Languages:</b> ${Object.values(country.languages || {}).join(
      ", "
    )}</p>  
    <button onclick="goBack()" class="back-button">Back</button>
  `;
}

// Back button function
function goBack() {
  window.history.back();
}

// Theme toggle
themeChanger.addEventListener("click", () => {
  const body = document.body;
  const themeText = themeChanger.querySelector("#theme-text");
  const themeIcon = themeChanger.querySelector("#theme-icon");

  body.classList.toggle("dark");

  // Update text and icon based on the current theme
  if (body.classList.contains("dark")) {
    themeText.innerText = "Light Mode";
    themeIcon.className = "fa-regular fa-sun"; // Change icon to sun
    localStorage.setItem("theme", "dark");
  } else {
    themeText.innerText = "Dark Mode";
    themeIcon.className = "fa-regular fa-moon"; // Change icon to moon
    localStorage.setItem("theme", "light");
  }
});

// Load saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeChanger.querySelector("#theme-text").innerText = "Light Mode";
    themeChanger.querySelector("#theme-icon").className = "fa-regular fa-sun"; // Set icon to sun
  }
  fetchCountryDetails();
});
