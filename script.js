const inputElement = document.querySelector(
  ".new-task-input");

const addTaskButton = document.querySelector(
  ".new-task-button");

const tasksContainer = document.querySelector('.tasks-container');

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
  const isInputValid = validateInput();

  if (!isInputValid) {
    return inputElement.classList.add("error");
  }

  const taskItemContainer = document.createElement('div');

  
  taskItemContainer.classList.add("task-item");
  // const dateCreated = Date.now();
  // taskItemContainer.setAttribute('id', dateCreated); //caso queira adicionar data de criação


  const taskContent = document.createElement('p');
  taskContent.innerText = inputElement.value;

  taskContent.addEventListener('click', () => handleClick(taskItemContainer)); // passando o conteúdo. Também qual task para ser identificado pelo localStorage


  const deleteItem = document.createElement('i');
  deleteItem.classList.add("fas", "fa-trash", "delete-btn");

  deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer)); // passando o conteúdo. Também qual task para ser identificado pelo localStorage


  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);
  tasksContainer.appendChild(taskItemContainer);


  inputElement.value = "";

  updateLocalStorage();

};

const handleClick = (taskItemContainer) => {
  taskItemContainer.classList.toggle("completed");

  updateLocalStorage();
};


const handleDeleteClick = (taskItemContainer) => {
  taskItemContainer.remove();

  updateLocalStorage();
};


const handleInputChange = () => {
  const isInputValid = validateInput();
  
  if(isInputValid){
    return inputElement.classList.remove("error");
  }
};

const updateLocalStorage = () => {
  const everyTask = []

  for (const elements of tasksContainer.childNodes) {
    everyTask.push({
      description: elements.innerText,
      isCompleted: elements.classList.contains("completed")
    });
  };

  localStorage.setItem("task-list", JSON.stringify(everyTask));

}

addTaskButton.addEventListener("click", () => handleAddTask());
inputElement.addEventListener("keypress", function (e) {
  if (e.code === "Enter") {
    handleAddTask();
  }
});

inputElement.addEventListener('change', () => handleInputChange());

(function getLocalStorageTasks(){
  const storageTasks = JSON.parse(localStorage.getItem("task-list"));
  
  if (!storageTasks) return;

  for (const tasks of storageTasks) {
    const taskItemContainer = document.createElement('div');
  
    taskItemContainer.classList.add("task-item");
  
    const taskContent = document.createElement('p');
    taskContent.innerText = tasks.description;

    if(tasks.isCompleted) {
      taskItemContainer.classList.add("completed");
    };
  
    taskContent.addEventListener('click', () => handleClick(taskItemContainer));
  
    const deleteItem = document.createElement('i');
    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer));

    deleteItem.classList.add("fas", "fa-trash", "delete-btn");
  
  
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    tasksContainer.appendChild(taskItemContainer);
  };
})();