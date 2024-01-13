
// TODO: make an edit button that can edit a task.
// TODO: when user forgets an input make an alert that the specific input is missing.
// TODO: when clicking the delete button on the task make the tasks list get organize
// TODO: design the heading of page with shadows and more     
// TODO: use a special font for text and heading
// TODO: make project in github and make a branch for changes and saves
// TODO: make a button to create a test note to appear for testing.
// TODO: location reload not to do it, do div.innerText = ''

// Variables
const taskInput = document.querySelector('.taskInput');
const dateInput = document.querySelector('.dateInput');
const hourInput = document.querySelector('.hourInput');
const tasksContainer = document.querySelector('.tasksContainer');
const outputsAsArray = JSON.parse(localStorage.getItem('outputsAsArray')) || []; // convert to array if LC is not empty.
// When page loads
document.addEventListener('DOMContentLoaded', loadItems); 

// Functions
function loadItems() { 
  outputsAsArray.forEach(tasksObj => {
    // Creates task elements AND gets returned value from function
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
  // Creating task note div
  const taskDiv = tasksContainer.appendChild(document.createElement('div'));
  taskDiv.className = 'taskDiv';
  // Delete button
  const addDeleteButton = taskDiv.appendChild(document.createElement('button'));
  addDeleteButton.className = 'deleteBtn';
  addDeleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'; // check if you can enter this to class.
  addDeleteButton.addEventListener('click', function() {
 
    tasksContainer.removeChild(taskDiv);
    const index = outputsAsArray.findIndex(obj => obj === tasksObj);
    if (index !== -1) {
      outputsAsArray.splice(index, 1);
      localStorage.setItem('outputsAsArray', JSON.stringify(outputsAsArray));
    }
  });
  // Finished task button
  const addFinishedTaskBtn = taskDiv.appendChild(document.createElement('button'));
  addFinishedTaskBtn.className = 'markFinishedTask';
  addFinishedTaskBtn.innerHTML = '<i class="fa-solid fa-text-slash"></i>'; // check if you can enter this to class.
  addFinishedTaskBtn.addEventListener('click', function() {
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
  // Task text
  const taskText = document.createElement('textarea');
  taskText.className = 'taskText';
  taskText.value = tasksObj.taskContent;
  taskText.setAttribute('readOnly', 'readOnly'); // won't be able to edit text
  taskDiv.appendChild(taskText);
  
  // Bottom line: date and hour
  const bottomLineDiv = document.createElement('div');
  const bottomLineDate = document.createElement('p');
  const bottomLineHour = document.createElement('p');
  taskDiv.appendChild(bottomLineDiv);
  bottomLineDiv.appendChild(bottomLineDate);
  bottomLineDiv.appendChild(bottomLineHour);
  bottomLineDate.innerText = tasksObj.date;
  bottomLineHour.innerText = tasksObj.hour;
  bottomLineDiv.className = 'bottomLineDiv';
  bottomLineDate.className = 'bottomLineDate';
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
document.querySelector('.saveTaskBtn').addEventListener('click', isEmpty);
document.querySelector('.resetAllBtn').addEventListener('click', resetAll);
document.querySelector('.fillInputs').addEventListener('click', fillInputs);

