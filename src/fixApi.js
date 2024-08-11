async function populateDropDown(dropDownName, endpoint) {
    const dropdown = document.getElementById(dropDownName);
    const url = `${baseUrlFanar}/api/services/${endpoint}`;

    try {
        // Show spinner before starting the API call
        showSpinner();

        // Fetch data from the endpoint with custom headers
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Token}`, // Using the global Token variable
                'Content-Type': 'application/json', // Optional for GET, depending on server requirements
            }
        });

        // Handle the response
        if (response.ok) {
            const data = await response.json();

            // Clear and prepare dropdown
            dropdown.innerHTML = '<option value="" selected disabled hidden></option>';

            data.forEach((item) => {
                // Create and append option elements
                const option = document.createElement("option");
                option.text = item.Text; // Assuming each item has a 'Text' property
                option.value = item.Value; // Assuming each item has a 'Value' property
                dropdown.appendChild(option);
            });

            // Hide spinner after the dropdown is populated
            hideSpinner();
        } else {
            console.error('HTTP error:', response.status);
            hideSpinner(); // Hide the spinner even if the request fails
        }
    } catch (error) {
        console.error('Fetch error:', error);
        hideSpinner(); // Hide the spinner in case of an error
    }
}

// Example usage: call this for multiple dropdowns and endpoints
async function loadAllDropdowns() {
    try {
        // Sequential execution with spinner handling
        await populateDropDown('dropdown1', 'endpoint1');
        await populateDropDown('dropdown2', 'endpoint2');
        await populateDropDown('dropdown3', 'endpoint3');
        // Add more calls as needed for other dropdowns and endpoints

        console.log('All dropdowns have been populated successfully.');
    } catch (error) {
        console.error('An error occurred while populating dropdowns:', error);
    }
}

loadAllDropdowns();