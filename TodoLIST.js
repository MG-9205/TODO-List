const task = document.getElementById("task");
const pending = document.getElementById("pending");
const completed = document.getElementById("completed");
const input = document.getElementById("input");
const list = document.getElementById("list");
const Enter = document.getElementById("add-task");
let clear=document.getElementById("clear-task")
let total_task = [];

Enter.onclick = () => {
  const taskname = input.value;
console.log(total_task.length)
  if(input.value==false)
  alert("please enter some task first")
else{
  var todo = {
    status: "pending",
    taskid: `task${total_task.length + 1}`,
    taskname: taskname,
  };
  total_task.push(todo);
  input.value=""
  save()
  newtask();}
};
/*this function will print the total task */
function newtask() {
  pending_worklist();
  list.innerHTML = "";
  for (let i = 0; i < total_task.length; i++) {
    list.insertAdjacentHTML(
      "beforeend",
      ` <div class="task-list1" id="task${i}"><span>${total_task[i].taskname}</span><i class="fas fa-times" onclick="delete_task(this)"></i></div>`
    );
  }
  count_task();
}
task.onclick = () => {
  list.innerHTML = "";
  for (let i = 0; i < total_task.length; i++) {
    list.insertAdjacentHTML(
      "beforeend",
      ` <div class="task-list1" id="task${i}"><span>${total_task[i].taskname}</span><i class="fas fa-times" onclick="delete_task(this)"></i></div>`
    );
  }
  count_task();
};

pending.onclick = () => {
  pending_worklist();
  count_task()
};
/*this function will print the Pending task */
function pending_worklist() {
  list.innerHTML = "";
  for (let i = 0; i < total_task.length; i++) {
    if (total_task[i].status == "pending") {
      list.insertAdjacentHTML(
        "beforeend",
        `<div class="task-list2" id=pending${
          i + 1
        }><input type="checkbox" onclick="checkbox_fun(this)"><span>${
          total_task[i].taskname
        }</span></div>`
      );
    }
  }
}

completed.onclick = () => {
  completed_task();
  count_task();
};
/*this function will print the completed task */
function completed_task() {
  list.innerHTML = "";
  for (let i = 0; i < total_task.length; i++) {
    if (total_task[i].status == "Completed") {
      list.insertAdjacentHTML(
        "beforeend",
        `<div class="task-list3" id=completed${
          i + 1
        }><input type="checkbox" checked onclick="checkbox_fun(this)"><span>${
          total_task[i].taskname
        }</span></div>`
      );
    }
  }
}
/*this function will response on the checkbox (it will change the task status at the total_task) */
function checkbox_fun(This){
   let index=total_task.findIndex(m=>m.taskname==This.parentNode.textContent)
   if(This.checked==true)
   {
      total_task[index].status="Completed"
      let remove=document.getElementById(`${This.parentNode.id}`)
      remove.outerHTML=""
      save()
   }
   else{
      total_task[index].status="pending"
      let remove=document.getElementById(`${This.parentNode.id}`)
      remove.outerHTML=""
      save()
   }
   count_task();
}
/*this function will remove a particular task from the total_task */
function delete_task(This) {
  let index = total_task.findIndex(
    (m) => m.taskname == This.parentNode.textContent
  );
  let clear1 = document.getElementById(`${This.parentNode.id}`);
  clear1.outerHTML = "";
  total_task.splice(index, 1);
  console.log(total_task);
  count_task();
  save()
}
/*function to count the total task, pending task ,completed task  */
function count_task() {
  let p = 0,
    d = 0,
    t = total_task.length;

  task.textContent = `Task ${t}`;
  for (let i = 0; i < total_task.length; i++) {
    if (total_task[i].status == "pending") p++;
    else d++;
  }
  pending.textContent = `Pending ${p}`;
  completed.textContent = `Completed ${d}`;
}
/*this function will clear the total task list */
clear.onclick=()=>{
   total_task=[]
   list.innerHTML=''
   count_task()
   save()
}
/*function the task list at the localstorage*/ 
function save(){
   let localStorage_array=JSON.stringify(total_task)
   localStorage.setItem("total_task",localStorage_array)
     let arrayfromlocalstorage=JSON.parse(localStorage.getItem("total_task"))
     total_task=arrayfromlocalstorage
     console.log(total_task)
}
/*function to restore the data after refreshing the page*/ 

function restore(){
   let arrayfromlocalstorage=JSON.parse(localStorage.getItem("total_task"))
   if(arrayfromlocalstorage==null)
   {
    return 0
   }
     total_task=arrayfromlocalstorage
     count_task()
     newtask()
}
restore()
