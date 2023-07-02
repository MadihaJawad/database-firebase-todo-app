import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBeODUkOlZBnKhLa2mHQCALtd8Bicm-rp0",
    authDomain: "todo-app-firebase-4a886.firebaseapp.com",
    projectId: "todo-app-firebase-4a886",
    storageBucket: "todo-app-firebase-4a886.appspot.com",
    messagingSenderId: "534157064213",
    appId: "1:534157064213:web:e719b3c25500381b8e361c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = firebase.database(app);































var list = document.getElementById('list');

firebase.database().ref('todos').on('child_added', function(data) {
    var li = document.createElement('li');
    var liText = document.createTextNode(data.val().value);
    li.appendChild(liText);

    var delBtn = document.createElement("button");
    var delText = document.createTextNode("DELETE");
    delBtn.setAttribute("class", "btn");
    delBtn.setAttribute("id", data.val().key);
    delBtn.setAttribute("onclick", "deleteItem(this)");
    delBtn.appendChild(delText);

    var editBtn = document.createElement("button");
    var editText = document.createTextNode("EDIT");
    editBtn.appendChild(editText);
    editBtn.setAttribute('id', data.val().key);
    editBtn.setAttribute("onclick", "editItem(this)");

    li.appendChild(delBtn);
    li.appendChild(editBtn);
    list.appendChild(li);
});

function addTodo() {
    var todo_item = document.getElementById('todo-item');
   
    var key = firebase.database().ref('todos').push().key;
    var todo = {
        value: todo_item.value,
        key: key
    };
    firebase.database().ref('todos').child(key).set(todo);

    todo_item.value = "";
}

function deleteItem(e) {
    firebase.database().ref('todos').child(e.id).remove();
    e.parentNode.remove();
}

function editItem(e) {
    var val = prompt("Enter updated value", e.parentNode.firstChild.nodeValue);
    var editTodo = {
        value: val,
        key: e.id
    };
    firebase.database().ref('todos').child(e.id).set(editTodo);
    e.parentNode.firstChild.nodeValue = val;
}

function deleteAll() {
    firebase.database().ref('todos').remove();
    list.innerHTML = "";
}
