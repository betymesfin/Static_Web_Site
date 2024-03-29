// Define the API URL
const apiUrl = 'https://api.sampleapis.com/coffee/hot';

// Function to fetch coffee data
async function fetchCoffeeData() {
    try {
        const response = await fetch(apiUrl);
        const coffeeData = await response.json();

        // Call function to display coffee data on the website
        displayCoffeeData(coffeeData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display coffee data
function displayCoffeeData(coffeeData) {
    const coffeeListElement = document.getElementById('coffee-list');

    // Clear existing content
    coffeeListElement.innerHTML = '';

    // Create and append each coffee item to the list
    coffeeData.forEach(coffee => {
        const coffeeItemElement = document.createElement('div');
        coffeeItemElement.textContent = `${coffee.title}: ${coffee.description}`;
        coffeeListElement.appendChild(coffeeItemElement);
    });
}

// Fetch and display coffee data when the script loads
fetchCoffeeData();
