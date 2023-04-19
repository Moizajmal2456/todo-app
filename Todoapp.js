 const tasksList = [];
 let isEditable = false;
 let activeId = -1;
 let taskId = 0;

 const userInput = document.getElementById("input");
 const selectAll = document.getElementById("select-all");
 const filters = document.getElementById("filters-dropdown");
 const list = document.querySelector(".task-list");

 // settaskui function
 const setTaskItemUI = (obj) => 
 {

  const currentId = obj.id;
   // create a new list item (li)
   const taskItem = document.createElement("li");
   // taskItem.classList.add("task-item")
   taskItem.className = "task-item";
   taskItem.id = `item_${currentId}`;
   // inner text set
   taskItem.innerHTML = `<div class="checkbox" onclick="markAsComplete(${currentId})"></div>
     <span>${obj.title}
     </span>
     <button id="edit_${currentId}" onclick="updateTask(${currentId})">Edit</button>
     <button onclick="deleteTask(${currentId})">Delete</button>`;
 
   //access list
  // const list = document.querySelector(".task-list");
   // append the new li to existing ul
   list.appendChild(taskItem);
 };

 const keyPressListener = (event) => {
 if (event.key === "Enter"){
    //add task
    const { value } = document.getElementById("input");
    
    if(value === " "){
      alert("Input filed should not be empty. Please enter something");
      return ;
    }

    const task = tasksList.find((t) => t.title === value);
    
    if(task){
      alert("This Task already exist");
      return;
    }

    if(!isEditable){
        addTask(value);
    }
    else{
        updateText(value);
    }
 }
 };

 //add event listener
 document.addEventListener("keypress" , keyPressListener );

 //create add task function
 const addTask = (taskText) => {
 const obj = {
    id: ++taskId,
    title: taskText,
    isComplete: false,
    createdAt: new Date().toLocaleDateString(),
 };

 tasksList.push(obj);

 setTaskItemUI(obj);

 resetInputField();
 };

 //reset input field function
 const resetInputField = () => {
  userInput.value = " ";
 };

 //markascomplete function
 const markAsComplete = (id) => {
   
 const currentTask = tasksList.find((t) => t.id === id);
 currentTask.isComplete = !currentTask.isComplete;
 
 const activeCheckbox = document.querySelector(`#item_${id} .checkbox`);
 activeCheckbox.classList.toggle("checkbox-filled");

 const currentTaskItem = document.querySelector(`#item_${id}`);
 currentTaskItem.classList.toggle("completed");

 };

 //filters completed task function
 const markItemsAsComplete = (id) => {
 const activeCheckbox = document.querySelector(`#item_${id} .checkbox`);
 const currentTaskItem = document.querySelector(`#item_${id}`);

 activeCheckbox.classList.add("checkbox-filled");
 currentTaskItem.classList.add("completed");
 };

 const markItemsAsInComplete = (id) => {
  const activeCheckbox = document.querySelector(`#item_${id} .checkbox`);
  const currentTaskItem = document.querySelector(`#item_${id}`);

  activeCheckbox.classList.remove("checkbox-filled");
  currentTaskItem.classList.remove("completed");
};

 //update task  function
 const updateText = (tasktext) => {
 const currentTask = tasksList.find((t) => t.id === activeId);
 currentTask.title = tasktext;

 const activeSpan = document.querySelector(`#item_${activeId} span`);
 activeSpan.innerText = tasktext;
 isEditable = false;
 resetInputField();
 };

 //delete task function 
 const deleteTask = (id) => {
   const index = tasksList.findIndex((t) => t.id === id);
   tasksList.splice(index , 1);

   const currentTaskItem = document.querySelector(`#item_${id}`);
   currentTaskItem.remove();
 };

 const updateTask = (id) => {
   const currentTask = tasksList.find((t) => t.id === id);
   userInput.value = currentTask.title;

   isEditable = true;
   activeId = id;
 };

 //Mark all as complete function
 const handleSelectAllChange = (events) => 
 {
   const { checked } = events.target;
   tasksList.forEach((t) => {
      t.isComplete = checked;
      const activeCheckbox = document.querySelector(`#item_${t.id} .checkbox`);
      const currentTaskItem = document.querySelector(`#item_${t.id}`);

      checked 
      ? activeCheckbox.classList.add("checkbox-filled")
      : activeCheckbox.classList.remove("check-box"); 

      checked 
      ? currentTaskItem.classList.add("completed")
      : currentTaskItem.classList.remove("completed");
   })
 } 

 //event handling of markedad complete checkbox
 selectAll.addEventListener("change" , handleSelectAllChange);

 //Filters change function
 const handleFiltersChange = (event) => {
 console.log("i am in event change");
 const { value }  = event.target;

 //switch case on all | pending | completed
 switch(value){
   case"All":
   console.log("i am in all filter");
   list.innerHTML = " ";
   tasksList.forEach((t) => {
    setTaskItemUI(t);
    if(t.isComplete)
    {
      markItemsAsComplete(t.id);
    }
    else {
      markItemsAsInComplete(t.id);
    }
   });
   break;

   case"Completed":
   console.log("i am in completed filter");
   const completeTask = tasksList.filter((t) => t.isComplete === true);
   list.innerHTML = " ";
   completeTask.forEach((t) => {
   setTaskItemUI(t);
   markItemsAsComplete(t.id);
   });
   
   if (completeTask.length === 0) {
    list.innerHTML = "<p><i>There are no completed tasks</i><p>";
  }
 break;

 case"Pending":
 console.log("i am in pending filter");
 const pendingTasks = tasksList.filter((t) => t.isComplete === false);
 list.innerHTML = "";

 pendingTasks.forEach((t) => {
   setTaskItemUI(t);
   markItemsAsInComplete(t.id);
 });
 break;

 default:
 console.log("All");
 break;
 }
 };

 //event handling of selectors function
 filters.addEventListener("change" , handleFiltersChange );

