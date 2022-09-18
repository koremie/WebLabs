const body = document.body;
const menu = document.getElementById('menu');
const menuItems = document.querySelectorAll('.menu__link');
const myAnimals = document.getElementById('my_animals');
const createAnimal = document.getElementById('create_animal');
const createPage = document.getElementById('create__page');
const searchForm = document.querySelector('.search_form');

const animalsBoard = document.getElementById('animals_list');
const nameInput = document.getElementById('name_input');
const spesiesInput = document.getElementById('species_input');
const sizeInput = document.getElementById('size_input');
const lifespanInput = document.getElementById('lifespan_input');
const dangerLevelInput = document.getElementById('danger-level_input');
const dietInput = document.getElementById('diet_input');
const daysNotFedInput = document.getElementById('days-not-fed_input');
const submitButton = document.getElementById('submit_button');
const editSubmitButton = document.getElementById('edit_submit_button');
const createTitle = document.querySelector('.create__title');


const openMainPage = () => {
    switchMenuItem(myAnimals);
    createPage.classList.add('hidden');
    searchForm.classList.remove('hidden');
    body.classList.remove('lock');
};

const openCreatePage = () => {
    switchMenuItem(createAnimal);
    createPage.classList.remove('hidden');
    searchForm.classList.add('hidden');
    body.classList.add('lock');
    createPage.scrollTo(top);
    submitButton.classList.remove('hidden');
    editSubmitButton.classList.add('hidden');
    clearInputValues();
    createTitle.innerHTML = 'Create animal'
};

const openEditPage = () => {
    switchMenuItem(createAnimal);
    createPage.classList.remove('hidden');
    searchForm.classList.add('hidden');
    body.classList.add('lock');
    createPage.scrollTo(top);
    submitButton.classList.add('hidden');
    editSubmitButton.classList.remove('hidden');
    createTitle.innerHTML = 'Edit animal'
};

const switchMenuItem = (menuItem) => {
    menuItems.forEach((item) => {
        item.classList.remove('active_menu__item');
    });
    menuItem.classList.add('active_menu__item');
};

createPage.addEventListener("keydown", (event) => {
    if(event.target.closest('.create_animal__form') && 
                                event.code === 'Enter'){
        console.log(event.code);
        event.preventDefault();
    }
})

myAnimals.addEventListener("click", (event) => {
    openMainPage();
});

createAnimal.addEventListener("click", (event) => {
    openCreatePage();
});

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const {name, spesies, size, lifespan, 
            dangerLevel, diet, daysNotFed,} = getInputValues();
    clearInputValues();
    addAnimalToList({name, spesies, size, lifespan, dangerLevel, diet, daysNotFed,});

    openMainPage();
});

const getInputValues = () => {
    return {
        name: nameInput.value,
        spesies: spesiesInput.value,
        size: sizeInput.value,
        lifespan: lifespanInput.value,
        dangerLevel: dangerLevelInput.value,
        diet: dietInput.value,
        daysNotFed: daysNotFedInput.value,
    };
};

const clearInputValues = () => {
    nameInput.value = "";
    spesiesInput.value = "";
    sizeInput.value = "";
    lifespanInput.value = "";
    dangerLevelInput.value = "Low";
    dietInput.value = "";
    daysNotFedInput.value = "";
};

let animalsList = [];
let id = 0;

const addAnimalToList = ({name, spesies, size, lifespan, dangerLevel, diet, daysNotFed }) => {
    const newAnimal = {
        id: `edit_button_id_${id}`,
        name: name, 
        spesies: spesies,
        size: size,
        lifespan: lifespan,
        dangerLevel: dangerLevel,
        diet: diet,
        daysNotFed: daysNotFed
    }
    id +=1
    animalsList.push(newAnimal);
    addAnimalToBoard(newAnimal);
}

const itemTemplate = ({id, name, spesies, size, lifespan, dangerLevel, diet, daysNotFed }) => `
<li class="animal_item">
    <h4>${name}</h4>
    <div class="animal_item__item">
        <h5 class="animal__characteristic">Spesies:</h5>
        <p class="animal__text">${spesies}</p>
    </div>
    <div class="animal_item__item">
        <h5 class="animal__characteristic">Size:</h5>
        <p class="animal__text">${size}</p>
    </div>
    <div class="animal_item__item">
        <h5 class="animal__characteristic">Lifespan:</h5>
        <p class="animal__text">${lifespan}</p>
    </div>
    <div class="animal_item__item">
        <h5 class="animal__characteristic">Danger level:</h5>
        <p class="animal__text">${dangerLevel}</p>
    </div>
    <div class="animal_item__item">
        <h5 class="animal__characteristic">Diet:</h5>
        <p class="animal__text">${diet}</p>
    </div>
    <div class="animal_item__item">
        <h5 class="animal__characteristic">Days not fed:</h5>
        <p class="animal__text">${daysNotFed}</p>
    </div>
    <div class="edit_button__wrapper">
        <button id="${id}" class="edit_button">
            Edit
        </button>
    </div>
</li>
`;

const fillInValuesToEdit = (id) => {
    const itemToEdit = animalsList.find((item) => {
        return item.id === id;
    })
    nameInput.value = itemToEdit.name;
    spesiesInput.value = itemToEdit.spesies;
    sizeInput.value = itemToEdit.size;
    lifespanInput.value = itemToEdit.lifespan;
    dangerLevelInput.value = itemToEdit.dangerLevel;
    dietInput.value = itemToEdit.diet;
    daysNotFedInput.value = itemToEdit.daysNotFed;
};

let currentId;

animalsBoard.addEventListener("click", (event) => {
    if(event.target.closest('.edit_button')){
        openEditPage();

        currentId = event.target.getAttribute('id');
        fillInValuesToEdit(currentId);
    }
});

editSubmitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const {name, spesies, size, lifespan, 
            dangerLevel, diet, daysNotFed,} = getInputValues();
    clearInputValues();
    let indexOfItemToEdit = animalsList.findIndex((item) => {
        return item.id === currentId;
    });

    animalsList[indexOfItemToEdit].name = name;
    animalsList[indexOfItemToEdit].spesies = spesies;
    animalsList[indexOfItemToEdit].size = size;
    animalsList[indexOfItemToEdit].lifespan = lifespan;
    animalsList[indexOfItemToEdit].dangerLevel = dangerLevel;
    animalsList[indexOfItemToEdit].diet = diet;
    animalsList[indexOfItemToEdit].daysNotFed = daysNotFed;

    renderAnimalsBoard(animalsList);
    openMainPage();
});


const addAnimalToBoard = ({id, name, spesies, size, lifespan, dangerLevel, diet, daysNotFed }) => {
    animalsBoard.insertAdjacentHTML(
        "beforeend",
        itemTemplate({id, name, spesies, size, lifespan, dangerLevel, diet, daysNotFed })
    );
};

const renderAnimalsBoard = (items) => {
    animalsBoard.innerHTML = "";
    for (const item of items) {
        addAnimalToBoard(item);
    }
};


// Manage animals

const searchButton = document.getElementById('search_button');
const cancelButton = document.getElementById('cancel_button');
const searchInput = document.getElementById('search_form__input');
const sortCheckbox = document.getElementById('sort__check');
const countButton = document.getElementById('count__button');
const totalResult = document.getElementById('total');

searchButton.addEventListener("click", (event) => {
    event.preventDefault();

    const foundList = animalsList.filter(
        (item) => item.dangerLevel.toLowerCase().includes(searchInput.value.toLowerCase())
        );
    
    renderAnimalsBoard(foundList);
});

cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    
    renderAnimalsBoard(animalsList);
    searchInput.value = "";
});

sortCheckbox.onchange = () => {
    if (sortCheckbox.checked) {
        let sortedArray = animalsList.slice();
        sortedArray.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
        });
        renderAnimalsBoard(sortedArray);
    } else {
        renderAnimalsBoard(animalsList);
    }
};

countButton.addEventListener("click", (event) => {
    const total = animalsList.reduce((previousValue, current) => {
        return previousValue + +current.daysNotFed;
    }, 0)
    totalResult.innerHTML = total + (total > 30 ? "  &#128557;" : "  &#128549;");
});


const defaultValues = [
    {
        name: 'Spook', 
        spesies: 'Dendrobatidae',
        size: '5cm',
        lifespan: '13y',
        dangerLevel: 'Moderate',
        diet: 'Insects',
        daysNotFed: 2
    },
    {
        name: 'Sam', 
        spesies: 'Chacoan horned frog',
        size: '10cm',
        lifespan: '	7y',
        dangerLevel: 'Moderate',
        diet: '	Insects and small mammals',
        daysNotFed: 3.2
    },
    {
        name: 'Fighty', 
        spesies: 'European mantis',
        size: '9cm',
        lifespan: '12y',
        dangerLevel: 'Moderate',
        diet: 'Insects',
        daysNotFed: 7
    },
    {
        name: 'Sandy', 
        spesies: '	Lepidodactylus lugubris',
        size: '9cm',
        lifespan: '8y',
        dangerLevel: 'Low',
        diet: 'Insects',
        daysNotFed: 1
    },
];

const addDefaultValues = () => {
    for (const item of defaultValues) {
        addAnimalToList(item);
    }
}

addDefaultValues();