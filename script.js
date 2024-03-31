// Define the API URL
const apiUrlHot = 'https://api.sampleapis.com/coffee/hot';

const apiUrlIced = 'https://api.sampleapis.com/coffee/iced';
const container = document.querySelector('.container');

document.getElementById('hot-coffee').addEventListener('click', () => fetchCoffeeData(apiUrlHot));
document.getElementById('iced-coffee').addEventListener('click', () => fetchCoffeeData(apiUrlIced));

async function fetchCoffeeData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const coffeeData = await response.json();
        displayCoffeeData(coffeeData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayCoffeeData(coffeeData) {
    container.innerHTML = '<h1 class="text-white">Select a Coffee</h1>';

    // Display only the first five coffee items
    coffeeData.slice(0, 10).forEach(coffee => {
        const coffeeItemElement = document.createElement('button');
        coffeeItemElement.classList.add('btn', 'btn-secondary', 'd-block', 'm-2');
        coffeeItemElement.textContent = coffee.title;
        coffeeItemElement.onclick = () => displayIngredients(coffee);
        container.appendChild(coffeeItemElement);
    });
}

function displayIngredients(coffee) {
    // Clear existing content
    container.innerHTML = `<h1 class="text-white">${coffee.title}</h1><p class="text-white">${coffee.description}</p>`;

    // Display ingredients
    if (coffee.ingredients) {
        const ingredientsList = document.createElement('ul');
        coffee.ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement('li');
            ingredientItem.textContent = ingredient;
            ingredientsList.appendChild(ingredientItem);
        });
        container.appendChild(ingredientsList);
    }
}


// Fetch and display coffee data when the script loads
fetchCoffeeData();
