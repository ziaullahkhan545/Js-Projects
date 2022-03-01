// getting all elements
var inputBox = document.querySelector('.inputField input');
var submitBtn = document.querySelector('.inputField button');
var inputField = document.querySelector('.inputField');
var clearBtn = document.querySelector('.footer button');
var todolist = document.querySelector('.todoList');
var wrapper = document.querySelector('.wrapper');
var clearAll = document.querySelector('.clearAll');

// function used to add and remove active class 
function setClass(){
    let inputBoxValue = inputBox.value;
    if (inputBoxValue.trim() != 0) {
        document.querySelector('.inputField button').classList.add('active');
    } else {
        document.querySelector('.inputField button').classList.remove('active');
    }
}

// function used to add or remove active class to clearAll button
function setClearAll(){
    let num = todolist.childElementCount;
    if (num == 0) {
        clearAll.classList.remove('active');
    } else {
        clearAll.classList.add('active');
    }
}

// input field event handling
inputBox.onkeyup = () => {
    setClass();
};

// submit function
function submit(){
    var element = `<li>${inputBox.value}<span class="icon" onclick="delElment(this)"><i class="fas fa-trash"></i></span><span class="icon1" onclick="editElment(this)"><i class="fas fa-edit"></i></span></li>`;
    todolist.innerHTML += element;
    inputBox.value = '';
    setClass();
    countChild();
    setClearAll();
}

// function used to delete an element from the list
const delElment = (data) => {
    data.parentElement.remove();
    countChild();
    setClearAll();
    inputBox.value = '';
    document.querySelector('.inputField button').remove();
    const node = document.createElement("button");
    node.innerHTML += `<i class="fas fa-plus"></i>`;
    node.setAttribute('onclick', 'submit()');
    document.querySelector('.inputField').appendChild(node);
}

// function for counting todotask
function countChild(){
    document.querySelector('.pendingTasks').innerHTML = '';
    var todosCount = todolist.childElementCount;
    document.querySelector('.pendingTasks').append(todosCount);
}
countChild();

// clearAll function 
clearAll.addEventListener('click', ()=> {
    todolist.innerHTML = '';
    setClearAll();
    countChild();
    inputBox.value = '';
    document.querySelector('.inputField button').remove();
    const node = document.createElement("button");
    node.innerHTML += `<i class="fas fa-plus"></i>`;
    node.setAttribute('onclick', 'submit()');
    document.querySelector('.inputField').appendChild(node);
})

// edit element function 
function editElment(data){
    inputBox.value = '';
    inputBox.value = data.parentElement.textContent;
    document.querySelector('.inputField button').remove();
    var eleNum = Array.from(todolist.children).indexOf(data.parentElement);
    const node = document.createElement("button");
    node.innerHTML += `<i class="fas fa-edit"></i>`;
    inputField.appendChild(node).classList.add('active');
    var btn = document.querySelector('.inputField button');
    btn.setAttribute('onclick', 'update('+eleNum+')');
}

// update function 
function update(data){
    todolist.children[data].innerHTML = `${inputBox.value}<span class="icon" onclick="delElment(this)"><i class="fas fa-trash"></i></span><span class="icon1" onclick="editElment(this)"><i class="fas fa-edit"></i></span>`;
    inputBox.value = '';
    document.querySelector('.inputField button').remove();
    const node = document.createElement("button");
    node.innerHTML += `<i class="fas fa-plus"></i>`;
    node.setAttribute('onclick', 'submit()');
    document.querySelector('.inputField').appendChild(node);
}