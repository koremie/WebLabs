// ------------ Toggle pages -----------

const body = document.body;
const menuItems = document.querySelectorAll('.menu__link');
const myAnimals = document.getElementById('my_animals');
const createAnimal = document.getElementById('create_animal');
const createPage = document.getElementById('create__page');
const searchForm = document.querySelector('.search_form');
const animalsBoard = document.getElementById('animals_list');

const createTitle = document.querySelector('.create__title');
const submitButton = document.getElementById('submit_button');
const editSubmitButton = document.getElementById('edit_submit_button');

const openMainPage = () => {
    switchMenuItem(myAnimals);
    createPage.classList.add('hidden');
    searchForm.classList.remove('hidden');
    body.classList.remove('lock');
    createAnimal.innerHTML = 'Create Animal';
    alertWindow.classList.add('hidden');
    getAlertClosed();
};

const openCreatePage = () => {
    switchMenuItem(createAnimal);
    createPage.classList.remove('hidden');
    searchForm.classList.add('hidden');
    body.classList.add('lock');
    createPage.scrollTo(top);
    submitButton.classList.remove('hidden');
    editSubmitButton.classList.add('hidden');
    alertWindow.classList.remove('hidden');
    clearInputValues();
    createTitle.innerHTML = 'Create animal';
};

const openEditPage = () => {
    switchMenuItem(createAnimal);
    createPage.classList.remove('hidden');
    searchForm.classList.add('hidden');
    body.classList.add('lock');
    createPage.scrollTo(top);
    submitButton.classList.add('hidden');
    editSubmitButton.classList.remove('hidden');
    alertWindow.classList.remove('hidden');
    createTitle.innerHTML = 'Edit animal';
    createAnimal.innerHTML = 'Edit animal';
};

const switchMenuItem = (menuItem) => {
    menuItems.forEach((item) => {
        item.classList.remove('active_menu__item');
    });
    menuItem.classList.add('active_menu__item');
};

createPage.addEventListener("keydown", (event) => {
    if (event.target.closest('.create_animal__form') &&
        event.code === 'Enter') {
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

// ------------ Create animal -------------

const nameInput = document.getElementById('name_input');
const spesiesInput = document.getElementById('species_input');
const sizeInput = document.getElementById('size_input');
const lifespanInput = document.getElementById('lifespan_input');
const dangerLevelInput = document.getElementById('danger-level_input');
const dietInput = document.getElementById('diet_input');
const daysNotFedInput = document.getElementById('days-not-fed_input');

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (validateInputs()){
        postAnimal(getInputValues());
        clearInputValues();

        refetchAllAnimals();
        openMainPage();
    } else {
        getAlert();
    }
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

const addAnimalToBoard = ({ id, name, spesies, size, lifespan, dangerLevel, diet, daysNotFed }) => {
    animalsBoard.insertAdjacentHTML(
        "beforeend",
        itemTemplate({ id, name, spesies, size, lifespan, dangerLevel, diet, daysNotFed })
    );
};

const itemTemplate = ({ id, name, spesies, size, lifespan, dangerLevel, diet, daysNotFed }) => `
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
        <button id="${id}" class="animal_button edit_button">
            Edit
        </button>
    </div>
    <div class="delete_button__wrapper">
        <button id="${id}" class="animal_button delete_button">
            Delete
        </button>
    </div>
</li>
`;

const renderAnimalsBoard = (items) => {
    animalsBoard.innerHTML = "";
    for (const item of items) {
        addAnimalToBoard(item);
    }
};


// ---------- Edit animal -----------

let currentId;

animalsBoard.addEventListener("click", (event) => {
    if (event.target.closest('.edit_button')) {
        openEditPage();

        currentId = event.target.getAttribute('id');
        
        fillInValuesToEdit(currentId);
    }
});

const fillInValuesToEdit = (id) => {
    const itemToEdit = animalsList.find((item) => {
        return item.id == id;
    })
    nameInput.value = itemToEdit.name;
    spesiesInput.value = itemToEdit.spesies;
    sizeInput.value = itemToEdit.size;
    lifespanInput.value = itemToEdit.lifespan;
    dangerLevelInput.value = itemToEdit.dangerLevel;
    dietInput.value = itemToEdit.diet;
    daysNotFedInput.value = itemToEdit.daysNotFed;
};

editSubmitButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (validateInputs()) {
        updateAnimal(currentId, getInputValues());
        clearInputValues();

        refetchAllAnimals(animalsList);
        openMainPage();
    } else {
        getAlert();
    }
});



// ---------- Delete animal -----------

animalsBoard.addEventListener("click", (event) => {
    if (event.target.closest('.delete_button')) {
        deleteAnimal(event.target.getAttribute('id'));
        
        refetchAllAnimals();
    }
});



// ---------- Input validation ----------

const alertWindow = document.getElementById('alert');
const closeAlert = document.getElementById('alert__button');

const validateInputs = () => {
    return nameInput.value.trim().length > 0 && spesiesInput.value.trim().length > 0 && 
    sizeInput.value.trim().length > 0 && lifespanInput.value.trim().length > 0 && 
    dangerLevelInput.value.trim().length > 0 && dietInput.value.trim().length > 0 && 
    daysNotFedInput.value >= 0 && daysNotFedInput.value.trim().length > 0;
};

closeAlert.addEventListener("click", (event) => {
    getAlertClosed();
});

const getAlert = () => {
    alertWindow.classList.add('pop_up');
};

const getAlertClosed = () => {
    alertWindow.classList.remove('pop_up');
};


// ---------- Manage animals ------------

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
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
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



// ---------- API animals ------------

const BASE_URL = "http://localhost:5050";
const RESOURSE_URL = `${BASE_URL}/animal`;

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
  try {
    const reqParams = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      reqParams.body = JSON.stringify(body);
    }

    return await fetch(`${RESOURSE_URL}${urlPath}`, reqParams);
  } catch (error) {
    console.error("HTTP ERROR: ", error);
  }
};


export const getAllAnimals = async () => {
  const rawResponse = await baseRequest({ method: "GET" });

  return await rawResponse.json();
};

export const postAnimal = (body) => baseRequest({ method: "POST", body });

export const updateAnimal = (id, body) =>
  baseRequest({ urlPath: `/${id}`, method: "PUT", body });

export const deleteAnimal = (id) =>
  baseRequest({ urlPath: `/${id}`, method: "DELETE" });

const refetchAllAnimals = async () => {
    const animals = await getAllAnimals();
    animalsList = animals;  

    renderAnimalsBoard(animalsList);
};

refetchAllAnimals();