const itemsContainer = document.querySelector("#list-items");

function addItem(item) {
  const colourCard = document.createElement("section");
  colourCard.className = "card w-75";
  itemsContainer.append(colourCard);

  const colourCardBody = document.createElement("article");
  colourCardBody.className = "card-body";
  colourCard.append(colourCardBody);

  const colourCardTitle = document.createElement("h5");
  colourCardTitle.className = "card-title";
  colourCardTitle.innerText = item.name;
  colourCardBody.append(colourCardTitle);

  const colourCardText = document.createElement("p");
  colourCardText.className = "card-text";
  colourCardText.innerText = item.pantone_value;
  colourCardBody.append(colourCardText);

  const colourCardColour = document.createElement("figure");
  colourCardColour.style = "background-color: " + item.color + ";";
  colourCardColour.innerText = item.color;
  colourCardBody.append(colourCardColour);

  const colourCardBreak = document.createElement("br");
  itemsContainer.append(colourCardBreak);
}

// TAREA 1
function fetchColorsList() {
  
  fetch('https://reqres.in/api/unknown', {
    headers: {
      'x-api-key': 'reqres-free-v1'
    }
  })
    .then(response => response.json())
    .then(responseData => {
      
      const colors = responseData.data;
      
      colors.forEach(color => {
        addItem(color);
      });

      // TAREA 3
      const colorsString = JSON.stringify(colors);
      localStorage.setItem('colorsList', colorsString);
      
      console.log('Colores descargados y guardados en localStorage');
    })
    .catch(error => {
      console.error('Error al obtener los colores:', error);
    });
}

// TAREA 4
function loadColorsFromStorage() {

  const colorsString = localStorage.getItem('colorsList');
  
  if (colorsString) {
  
    const colors = JSON.parse(colorsString);
    
    colors.forEach(color => {
      addItem(color);
    });
    
    console.log('Colores cargados desde localStorage');
  } else {
    console.log('No hay colores guardados en localStorage');
  }
}

// TAREA 5 
function clearColorsList() {
  
  itemsContainer.innerHTML = '';
  

  localStorage.removeItem('colorsList');
  
  console.log('Lista de colores borrada');
}

// TAREA 6
function reloadColors() {
 
  itemsContainer.innerHTML = '';
  
  fetchColorsList();
  
  console.log('Recargando colores desde la API...');
}


fetchColorsList();

document.addEventListener('DOMContentLoaded', function() {
  const loadBtn = document.getElementById('loadBtn');
  const clearBtn = document.getElementById('clearBtn');
  
  if (loadBtn) {
    loadBtn.addEventListener('click', reloadColors);
  }
  
  if (clearBtn) {
    clearBtn.addEventListener('click', clearColorsList);
  }
});