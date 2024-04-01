window.onload = function() {
    const apiUrlHot = 'https://api.sampleapis.com/coffee/hot';
    const apiUrlIced = 'https://api.sampleapis.com/coffee/iced';
    const backButton = document.getElementById('back-button');
    const hotCoffeeButton = document.getElementById('hot-coffee');
    const icedCoffeeButton = document.getElementById('iced-coffee');
    const container = document.querySelector('.container');
    let currentViewState = 'menu'; 
    let currentCoffeeList = [];

    hotCoffeeButton.addEventListener('click', function() {
        fetchCoffeeData(apiUrlHot);
        currentViewState = 'list';
    });

    icedCoffeeButton.addEventListener('click', function() {
        fetchCoffeeData(apiUrlIced);
        currentViewState = 'list';
    });

    backButton.addEventListener('click', function() {
        if (currentViewState === 'ingredients') {
            displayCoffeeData(currentCoffeeList); 
            currentViewState = 'list';
        } else if (currentViewState === 'list') {
            displayMainMenu();
            currentViewState = 'menu';
        }
    });

    async function fetchCoffeeData(apiUrl) {
        try {
            const response = await fetch(apiUrl);
            const coffeeData = await response.json();
            currentCoffeeList = coffeeData;
            displayCoffeeData(coffeeData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function displayCoffeeData(coffeeData) {
        container.innerHTML = '<h1 class="text-white">Select a Coffee</h1>';
        const coffeeList = document.createElement('div');
        coffeeList.id = 'coffee-list';
        container.appendChild(coffeeList);
        
        coffeeData.forEach(coffee => {
            const coffeeItemElement = document.createElement('button');
            coffeeItemElement.classList.add('btn', 'btn-secondary', 'd-block', 'm-2');
            coffeeItemElement.textContent = coffee.title;
            coffeeItemElement.onclick = () => {
                displayIngredients(coffee);
                currentViewState = 'ingredients';
            };
            coffeeList.appendChild(coffeeItemElement);
        });

        backButton.style.display = 'inline-block';
    }

    function displayIngredients(coffee) {
        container.innerHTML = `<h1 class="text-white">${coffee.title}</h1><p class="text-white">${coffee.description}</p>`;

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

    function displayMainMenu() {
        // Reset the container to the main menu view
        container.innerHTML = '<h1 class="text-white">Coffee Menu</h1>';
        container.appendChild(hotCoffeeButton);
        container.appendChild(icedCoffeeButton);
    
        // Ensure the coffee buttons are visible
        hotCoffeeButton.style.display = 'inline-block';
        icedCoffeeButton.style.display = 'inline-block';
    
        // Hide the back button as we are now at the main menu
        backButton.style.display = 'none';
    
        // Update the state to reflect that we are now at the main menu
        currentViewState = 'menu';
    }
    
};
