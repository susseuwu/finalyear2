
let tasksUL =document.querySelector(".tasks-list ul");
let categoryUL =document.querySelector(".categories ul");
document.addEventListener("DOMContentLoaded", () => {
      fetch("tasks.json")
      .then(response => response.json())
      .then(json => {
      json.forEach(task => {
          let LI=document.createElement('LI');
          LI.innerHTML=generatetaskLi(task);
          tasksUL.appendChild(LI);
  });
});
let searchDOM=document.querySelector(".nav-left .search input[type='text']")
searchDOM.addEventListener("keyup", function (e) {
  searchText=e.target.value;
  tasksUL.innerHTML="";

  fetch("tasks.json")
        .then(response => response.json())
        .then(json => {
        json.forEach(task => {
          
            let LI=document.createElement('LI');
            if(task["name"].includes(searchText)){
              LI.innerHTML=generatetaskLi(task);
              tasksUL.appendChild(LI);
            }
            
        
    });
  });
})
});

// implement add new task
let btnAddNewTask = document.querySelector("#add-new");
btnAddNewTask.addEventListener("click",function(e){
  btnAddNewTask.innerHTML = "";
  let inptTaskName = document.createElement("input");
  let inptTaskChecked= document.createElement("input");
  inptTaskChecked.setAttribute("Type","checkbox");  
  inptTaskName.setAttribute("Type","text");
  inptTaskName.setAttribute ("placeholder", "Enter new task name.....")
  btnAddNewTask.appendChild(inptTaskChecked);
  btnAddNewTask.appendChild(inptTaskName);

  inptTaskName.focus();
  inptTaskName.addEventListener("keyup", function(e){
    if(e.key == "Enter"){
      const currentDate = "07-Oct-2022";
      let new_task_name = e.target.value;
      let task = {
        name : new_task_name,
        category : "N/A",
        create_at : currentDate,
      };
      let LI = document.createElement("LI");
      LI.innerHTML=generatetaskLi(task);  
      tasksUL.appendChild(LI);

      inptTaskName.value = ""; 
    };
  });
});


function generatetaskLi(task){
  let li= `
              <div class="task">
                  <input type="checkbox" name="${task.name}"/>
                  <label>${task.name}</label>
              </div>
              <div class="desc">
                  <span>${task.category}</span>
                  <span>${task.create_at}</span>  
              </div>
          `
return li;
}

// category



document.addEventListener("DOMContentLoaded", () => {
  let categoryUL =document.querySelector(".categories ul");
      fetch("categories.json")
      .then(response => response.json())
      .then(json => {
      json.forEach(category => {
          let LI=document.createElement('LI');
          LI.setAttribute("onclick", `fillter_task(${category.badge})`);
          LI.innerHTML=generateCategoryLi(category);
          categoryUL.appendChild(LI);
  });
});
});


function generateCategoryLi(categories){
  let li= `
          <div>
          <span class="material-symbols-outlined">${categories.icon}</span>
          <span>${categories.name}</span></div>

          <div class="badges">
                ${categories.badge}
              </div>
          `
return li;
}
function fillter_task(name){
  tasksUL.innerHTML="";
  fetch("tasks.json")
  .then(response => response.json())
  .then(json => {
  json.forEach(task => {
    if(task.badge==name){
      LI=document.createElement("LI");
      LI.innerHTML=generatetaskLi(task);
      tasksUL.appendChild(LI);
    }

    if(name=="1"){
      LI=document.createElement("LI");
      LI.innerHTML=generatetaskLi(task);
      tasksUL.appendChild(LI);

    }
      
  
});
});
}

// implement add new category 

let btnAddNewCategory = document.querySelector(".add-new-category");
btnAddNewCategory.addEventListener("click",function(e){
  
      let newCategoryLI=document.createElement('LI');
      newCategoryLI.innerHTML=`<div class="category-info">
                                  <span class="material-symbols-outlined">home</span>
                                  <input type="text">
                              </div>`;
          newCategoryInpt =newCategoryLI.querySelector("input");
          categoryUL.appendChild(newCategoryLI);
          newCategoryInpt.focus();
 
    });
