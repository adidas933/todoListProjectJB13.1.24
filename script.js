// Variables
const taskInput = document.querySelector('.taskInput');
const dateInput = document.querySelector('.dateInput');
const hourInput = document.querySelector('.hourInput');
const saveTaskBtn = document.querySelector('.saveTaskBtn');
const tasksContainer = document.querySelector('.tasksContainer');
let outputsAsArray = JSON.parse(localStorage.getItem('outputsAsArray')) || []; 

let tasksObj = {
      taskContent: taskInput.value,
      date: dateInput.value,
      hour: hourInput.value,
      isLineThrough: false,
      isSaveChangesCreated: false,
    }
  
function loadItems() { 
  outputsAsArray.forEach(tasksObj => {
    const taskText = createElements(tasksObj); 
    taskText.value = tasksObj.taskContent;
    if (tasksObj.isLineThrough) {
      // Mark finished task
      taskText.style.textDecoration = 'line-through';
      tasksObj.isLineThrough = true;
      localStorage.setItem('outputsAsArray', JSON.stringify(outputsAsArray));
    } 
  });
}

const createElements = (tasksObj) => {
  
  // New task
  const taskDiv = tasksContainer.appendChild(document.createElement('div'));
  taskDiv.className = 'taskDiv';

  // Delete task
  const addDeleteButton = taskDiv.appendChild(document.createElement('button'));
  addDeleteButton.className = 'deleteBtn fa-solid fa-xmark';

  addDeleteButton.addEventListener('click', () => {
    tasksContainer.removeChild(taskDiv);
    const index = outputsAsArray.findIndex(obj => obj === tasksObj);
    if (index !== -1) {
      outputsAsArray.splice(index, 1);
      localStorage.setItem('outputsAsArray', JSON.stringify(outputsAsArray));
    }
  });
    
  // Line through task
  const addFinishedTaskBtn = taskDiv.appendChild(document.createElement('button'));
  addFinishedTaskBtn.className = 'markFinishedTask fa-solid fa-text-slash';

  addFinishedTaskBtn.addEventListener('click', () => {
    taskText.style.textDecoration = taskText.style.textDecoration === 'line-through' ? 'none' : 'line-through';
    tasksObj.isLineThrough = tasksObj.isLineThrough ? false : true;
    localStorage.setItem('outputsAsArray', JSON.stringify(outputsAsArray));
  });

  // Edit task
  const editBtn = taskDiv.appendChild(document.createElement('button'));
  editBtn.className = 'editBtn fa-solid fa-pen-to-square';
  const saveChangesBtn = taskDiv.appendChild(document.createElement('button'));
  saveChangesBtn.className = 'saveChangesBtn';
  saveChangesBtn.innerText = 'Save changes';
  saveChangesBtn.style.visibility = 'hidden';
  
  editBtn.addEventListener('click', () => {

    if (saveChangesBtn.style.visibility === 'hidden' && !tasksObj.isSaveChangesCreated) {
      saveChangesBtn.style.visibility = 'visible';
      tasksObj.isSaveChangesCreated = true;  
      taskText.readOnly = false;
    } else {
      saveChangesBtn.style.visibility = 'hidden';
      tasksObj.isSaveChangesCreated = false;
      taskText.readOnly = true;
    }
    localStorage.setItem('outputsAsArray', JSON.stringify(outputsAsArray));
  })

  saveChangesBtn.addEventListener('click', () => {
    taskText.readOnly = true;
    saveChangesBtn.style.visibility = 'hidden';
    tasksObj.isSaveChangesCreated = false;
    tasksObj.taskContent = taskText.value;
    localStorage.setItem('outputsAsArray', JSON.stringify(outputsAsArray));
})

  // Task text
  const taskText = document.createElement('textarea');
  taskText.className = 'taskText';
  taskText.value = tasksObj.taskContent;
  taskDiv.appendChild(taskText);
  taskText.readOnly = true;
  
  // Bottom line container
  const bottomLineDiv = document.createElement('div');
  taskDiv.appendChild(bottomLineDiv);
  bottomLineDiv.className = 'bottomLineDiv';

  // Date
  const bottomLineDate = document.createElement('p');
  bottomLineDiv.appendChild(bottomLineDate);
  bottomLineDate.innerText = tasksObj.date;
  bottomLineDate.className = 'bottomLineDate';

  // Hour
  const bottomLineHour = document.createElement('p');
  bottomLineDiv.appendChild(bottomLineHour);
  bottomLineHour.innerText = tasksObj.hour;
  bottomLineHour.className = 'bottomLineHour';
  
  clearInputs();
  return taskText;
}

const clearInputs = () => {
  taskInput.value = '';
  dateInput.value = '';
  hourInput.value = '';
}

function isEmpty() {
  if ((!taskInput.value || !dateInput.value || !hourInput.value)) {
    alert('Please fill all inputs');
    } else {
      tasksObj = {
        taskContent: taskInput.value,
        date: dateInput.value,
        hour: hourInput.value,
        isLineThrough: false,
        isSaveChangesCreated: false,
      }
      outputsAsArray.push(tasksObj); 
      createElements(tasksObj); 
      localStorage.setItem('outputsAsArray', JSON.stringify(outputsAsArray));
    }
  }

const resetAll = () => {
  tasksContainer.innerHTML = '';
  localStorage.clear();
  outputsAsArray = JSON.parse(localStorage.getItem('outputsAsArray')) || [];
  loadItems();
}

const sortBy = (parameter) => {
  outputsAsArray = outputsAsArray.sort(function (objectA, objectB) {
    if (objectA[parameter] > objectB[parameter]) {
      return 1;
    }
    if (objectA[parameter] < objectB[parameter]) {
      return -1;
    }
    return 0;
  })
  localStorage.setItem('outputsAsArray', JSON.stringify(outputsAsArray));
  tasksContainer.innerHTML = '';
  loadItems();
}
  
const fillInputs = () => {
  taskInput.value = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita similique laudantium soluta quos modi, sint labore. Nulla voluptatibus quaerat commodi dicta consequuntur aspernatur exercitationem aperiam reiciendis! In illo laudantium libero doloribus sequi asperiores tenetur cumque, distinctio exercitationem vel est ea corporis eius nemo, quibusdam omnis vitae at a sint enim? Minus blanditiis pariatur quidem ducimus, voluptatibus itaque distinctio adipisci aperiam a id quam odio unde expedita sit. Molestias quo aut consectetur aspernatur ab quisquam nesciunt, sed ipsam iure repudiandae similique ut perspiciatis voluptate cum. Sed, praesentium voluptas recusandae veritatis modi doloremque nostrum ipsum quos aspernatur natus magni optio! Voluptas, alias.'
  dateInput.value = '2024-01-12';
  hourInput.value = '22:00';
}

// Event listeners
document.addEventListener('DOMContentLoaded', loadItems); 
saveTaskBtn.addEventListener('click', isEmpty);
document.querySelector('.resetAllBtn').addEventListener('click', resetAll);
document.querySelector('.fillInputs').addEventListener('click', fillInputs);

document.querySelector('.sortByNameBtn').addEventListener('click', () => {
  sortBy('taskContent'); 
});
document.querySelector('.sortByDateBtn').addEventListener('click', () => {
  sortBy('date');
});
