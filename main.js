var local = window.localStorage;

var id = local.getItem('id');

if (id == undefined) {
	local.setItem('id', 1);
}

let content = document.getElementsByTagName('body')[0];
let darkMode = document.getElementById('dark-mode');

darkMode.addEventListener('click', function () {
		darkMode.classList.toggle('active');
		content.classList.toggle('night');
})



function openCreate() {
	var home = document.getElementById("home");
	home.style.display = "none";
	
	var create = document.getElementById("create");
	create.style.display = "unset";

	var title = document.getElementById('title');
	var desc = document.getElementById('description');

	title.value = "";
	desc.value = "";
	document.querySelector('.back').addEventListener('click', sendingData)
}

document.querySelector(".btn").onclick = openCreate;

function openHome() {
	var home = document.getElementById("home");
	home.style.display = "unset";
	
	var create = document.getElementById("create");
	create.style.display = "none";
}

function openData(id) {
	openCreate();

	document.querySelector('.back').removeEventListener('click', sendingData);

	var title = document.getElementById('title');
	var desc = document.getElementById('description');
	var id_current = window.localStorage.getItem('id');

	var titleData = window.localStorage.getItem('title' + id);
	var descData = window.localStorage.getItem('desc' + id);

	title.value = titleData;
	desc.value = descData;

	document.querySelector(".back").addEventListener('click', ()=> {updatingData(id);});
}

document.querySelector(".back").addEventListener('click', openHome)

function createNote(title, id) {
	var div1 = document.createElement('div');
	div1.className = "note"
	div1.id = "note" + id;

	if (title == "") {
		title = "Untitled";
	}
	
	var h1 = document.createElement("h1");
	h1.id = "title" + id;
	h1.innerHTML = title;
	h1.addEventListener('click', ()=> {openData(id)});
	
	var div2 = document.createElement('div');
	
	var h2 = document.createElement('h2');
	h2.innerHTML = "Created on 30.06.2022";
	
	var figure = document.createElement('figure');
	figure.className = "settings";
	
	var div3 = document.createElement('div');
	var div4 = document.createElement('div');
	var div5 = document.createElement('div');
	
	figure.append(div3, div4, div5);
	div2.append(h2, figure);
	div1.append(h1, div2);
	
	document.querySelector(".sheet").append(div1);
	
	document.querySelector('.blank').style.display = 'none';
}

function updateNote(id) {
	var title = document.querySelector("#title" + id);
	console.log(title);
}

function sendingData() {
	var title = document.querySelector("#title");
	var desc = document.querySelector("#description");
	var id = parseInt(window.localStorage.getItem('id'));

	if (title.value != "" || desc.value != "") {
		window.localStorage.setItem('title' + id, title.value);
		window.localStorage.setItem('desc' + id, desc.value);

		createNote(title.value, id);
		
		id = id + 1;
		window.localStorage.setItem('id', id);
	}
}

function updatingData(id) {
	var title = document.querySelector("#title");
	var desc = document.querySelector("#description");

	if (title.value != "" || desc.value != "") {
		window.localStorage.setItem('title' + id, title.value);
		window.localStorage.setItem('desc' + id, desc.value);

		updateNote(id);		
	}
}

function loadNotes() {
	var id = parseInt(window.localStorage.getItem('id'));

	for (let i = 1; i < id; i++) {
		var title = window.localStorage.getItem('title' + i);
		createNote(title, i);
	}
}


loadNotes();