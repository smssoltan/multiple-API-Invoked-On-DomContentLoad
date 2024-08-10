document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  const dropdown = document.getElementById('dropdown');
  const firstDropDown = document.getElementById('firstDropDown');
  const overlay = document.getElementById('overlay');
  const spinner = document.getElementById('spinner');

  console.log('Elements:', { dropdown, spinner, overlay });

  // Function to show the spinner and overlay
  function showSpinner() {
    console.log('Showing spinner');
    overlay.classList.add('visible');
    dropdown.classList.add('disabled');
  }

  // Function to hide the spinner and overlay
  function hideSpinner() {
    console.log('Hiding spinner');
    overlay.classList.remove('visible');
    dropdown.classList.remove('disabled');
    firstDropDown.classList.remove('disabled');

  }

  // Function to fetch data from an API
  async function fetchData(url) {
    try {
      console.log(`Fetching data from ${url}...`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok for ${url}`);
      }
      const data = await response.json();
      console.log(`Data fetched from ${url}:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      return null;
    }
  }

  // Function to populate the dropdown
  function populateDropdown(data, dropdown) {
    console.log('Populating dropdown');
    data.forEach(item => {
      console.log(item);
      const option = document.createElement('option');
      option.value = item.id;
      option.text = item.name;
      dropdown.add(option);
    });
  }

  function populateDropdown2(data, dropdown) {
    console.log('Populating dropdown');
    data.forEach(item => {
      console.log(item);
      const option = document.createElement('option');
      option.value = item.id;
      option.text = item.title;
      dropdown.add(option);
    });
  }
  // Function to handle multiple API calls
  async function initialize() {
    showSpinner(); // Show spinner before making the API calls

    const apiUrls = [
      'https://jsonplaceholder.typicode.com/users', // Replace with your API URLs
      'https://jsonplaceholder.typicode.com/posts'  // Another API for demonstration
    ];

    try {
      const results = await Promise.all(apiUrls.map(fetchData)); // Fetch data from all APIs
      console.log('All data fetched:', results);

      // Populate dropdown with the first API data as an example
      if (results[0]) {
        populateDropdown(results[0], firstDropDown);
      }
      
      // You can handle additional data from other APIs here
      // Example: results[1] for the second API
      if (results[1]) {
        populateDropdown2(results[1], dropdown);
      }

    } catch (error) {
      console.error('Error in one of the API calls:', error);
    } finally {
      hideSpinner(); // Hide spinner after all API calls are completed
    }
  }

  // Call the initialize function on page load
  initialize();
});
