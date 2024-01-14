// TODO: sort by: newest, alphabetic
// TODO: search
// TODO: pick a color that will affect the background of note

// Variables
const taskInput = document.querySelector('.taskInput');
const dateInput = document.querySelector('.dateInput');
const hourInput = document.querySelector('.hourInput');
const saveTaskBtn = document.querySelector('.saveTaskBtn');
const tasksContainer = document.querySelector('.tasksContainer');
const outputsAsArray = JSON.parse(localStorage.getItem('outputsAsArray')) || []; 

let  tasksObj = {
    taskContent: taskInput.value,
    date: dateInput.value,
    hour: hourInput.value,
    isLineThrough: false,
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
  if ((taskText.style.textDecoration === 'line-through') && tasksObj.isLineThrough) {
    taskText.style.textDecoration = 'none';
    tasksObj.isLineThrough = false;
    localStorage.setItem('outputsAsArray', JSON.stringify(outputsAsArray));
  } else {
    taskText.style.textDecoration = 'line-through';
    tasksObj.isLineThrough = true;
    localStorage.setItem('outputsAsArray', JSON.stringify(outputsAsArray));
  }
  });

  // Edit task
  const editBtn = taskDiv.appendChild(document.createElement('button'));
  editBtn.className = 'editBtn fa-solid fa-pen-to-square';

  editBtn.addEventListener('click', () => {
    taskText.readOnly = false;

    const saveChangesBtn = taskDiv.appendChild(document.createElement('button'));
    saveChangesBtn.className = 'saveChangesBtn';
    saveChangesBtn.innerText = 'Save changes';
    
    saveChangesBtn.addEventListener('click', () => {
      saveChangesBtn.remove();
      taskText.readOnly = true;
      tasksObj.taskContent = taskText.value;
      localStorage.setItem('outputsAsArray', JSON.stringify(outputsAsArray));
    })
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
  
  // Reset inputs
  taskInput.value = '';
  dateInput.value = '';
  hourInput.value = '';

  return taskText;
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
      }
      outputsAsArray.push(tasksObj); 
      createElements(tasksObj); 
      localStorage.setItem('outputsAsArray', JSON.stringify(outputsAsArray));
    }
  }
  
  const resetAll = () => {
    localStorage.clear();
    location.reload(); 
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
  
  