var local = window.localStorage;

var id = local.getItem('id');

const docBody = document.body;

// SELECT DARK MODE TOGGLE BUTTON
const darkModeToggle = document.querySelector(".dark-mode-toggle");

if (window.localStorage.getItem('mode') == undefined) {
	// alert("hi")
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		window.localStorage.setItem('mode', 0);	//1 for dark mode
	}
}

// FUNCTION TO IMPLEMENT DARK MODE
function darkMode() {
	const sheet = document.querySelector(".sheet");
	const notes = Array.from(document.querySelectorAll(".note"));
	const noteTitle = document.getElementById("title");
	const noteBody = document.getElementById("description");

	if (darkModeToggle.classList.contains("to-dark")) {

		darkModeToggle.classList.remove("to-dark");
		darkModeToggle.classList.add("to-light");

		docBody.setAttribute("class", "dark-mode");

		sheet.style.backgroundColor = "#333";

		notes.forEach(note => {
			note.classList.add("light-font");
		});

		noteTitle.style.backgroundColor = "#333";
		noteTitle.style.color = "#fff";

		noteBody.style.backgroundColor = "#333";
		noteBody.style.color = "#fff";
		window.localStorage.setItem('mode', 0);

	} else {

		darkModeToggle.classList.remove("to-light");
		darkModeToggle.classList.add("to-dark");

		docBody.removeAttribute("class");

		sheet.style.backgroundColor = "#fff";

		notes.forEach(note => {
			note.classList.remove("light-font");
		});

		noteTitle.style.backgroundColor = "#fff";
		noteTitle.style.color = "#000";

		noteBody.style.backgroundColor = "#fff";
		noteBody.style.color = "#000";

		window.localStorage.setItem('mode', 1);
	}
}

// EVENT LISTENER TO TRIGGER "darkMode()"
darkModeToggle.addEventListener("click", darkMode);

if (window.localStorage.getItem('mode') == 0) {
	darkMode();
}

if (id == undefined) {
	local.setItem('id', 1);
}

function openCreate() {
	var home = document.getElementById("home");
	home.style.display = "none";

	var create = document.getElementById("create");
	create.style.display = "unset";

	var title = document.getElementById('title');
	var desc = document.getElementById('description');

	title.value = "";
	desc.value = "";
	document.querySelector('.button-32').addEventListener('click', sendingData)
}

document.querySelector(".btn").onclick = openCreate;

function openHome() {
	var home = document.getElementById("home");
	home.style.display = "unset";

	var create = document.getElementById("create");
	create.style.display = "none";
	// time= "Created on "+getFullDate()+"<br>At "+getTime();
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

	document.querySelector(".back").addEventListener('click', () => { updatingData(id); });
}

document.querySelector(".button-32").addEventListener('click', openHome)
document.querySelector(".back").addEventListener('click', openHome)

function getFullDate() {
	var date = new Date();
	var currentDate = date.getDate();
	var currentMonth = date.getMonth();
	var currentYear = date.getFullYear();
	if (currentDate < 10) currentDate = '0' + currentDate;
	if (currentMonth < 10) currentMonth = '0' + currentMonth;

	return currentDate + "." + currentMonth + "." + currentYear;
}

function getTime() {
	let date = new Date();
	let h = date.getHours();
	let m = date.getMinutes();
	let session = "AM";

	if (h == 0) {
		h = 12;
	}
	if (h > 12) {
		h = h - 12;
		session = "PM";
	}

	if (h < 10) {
		h = "0" + h;
	}
	if (m < 10) {
		m = "0" + m;
	}



	let time = h + " " + ":" + " " + m;
	let merit = session;

	return time + " " + merit;
}

function createNote(title, time, id) {
	var div1 = document.createElement('div');
	div1.className = "note"
	div1.id = "note" + id;

	// CHECK IF <body> HAS "dark-mode" CLASS BEFORE CREATING A NOTE
	if (docBody.classList.contains("dark-mode")) div1.classList.add("light-font");
	else div1.classList.remove("light-font");

	if (title == "") {
		title = "Untitled";
	}

	var h1 = document.createElement("h1");
	h1.id = "title" + id;
	h1.innerHTML = title;

	h1.addEventListener('click', () => { openData(id) });

	var div2 = document.createElement('div');


	var h2 = document.createElement('h2');
	h2.id = "time" + id;
	h2.innerHTML = time;

	// var h2 = document.createElement('h2');
	// h2.innerHTML = "Created on 30.06.2022";


	var figure = document.createElement('div');
	
	figure.setAttribute("onClick", "deleteNote("+ id +");");
	figure.innerHTML = `<i class="fa fa-trash trash-icon" id="delete-${div1.id}"></i>`;
	div2.append(h2, figure);
	div1.append(h1, div2);

	document.querySelector(".sheet").append(div1);

	document.querySelector('.blank').style.display = 'none';
}


function deleteNote(del_id){

	console.log("Deleting" + del_id);
	const noteDiv = document.getElementById(`note${del_id}`);
	noteDiv.remove();
	window.localStorage.removeItem('title' + del_id);
	window.localStorage.removeItem('desc' + del_id);
	window.localStorage.removeItem('time' + del_id);
	
}

function updateNote(id) {
	var title = document.querySelector("#title" + id);
	console.log(title);
}

function sendingData() {
	var title = document.querySelector("#title");
	var desc = document.querySelector("#description");
	var time = "Created on " + getFullDate() + "<br>At " + getTime();
	var id = parseInt(window.localStorage.getItem('id'));

	if (title.value != "" || desc.value != "") {
		window.localStorage.setItem('title' + id, title.value);
		window.localStorage.setItem('desc' + id, desc.value);
		window.localStorage.setItem('time' + id, time);

		createNote(title.value, time, id);

		// createNote(title.value, id);

		id = id + 1;
		window.localStorage.setItem('id', id);
	}
}

function updatingData(id) {
	var title = document.querySelector("#title");
	var desc = document.querySelector("#description");
	var time = document.querySelector("#time");


	if (title.value != "" || desc.value != "") {
		window.localStorage.setItem('title' + id, title.value);
		window.localStorage.setItem('desc' + id, desc.value);
		window.localStorage.setItem('time' + id, time.value);

		updateNote(id);
	}
}

function loadNotes() {
	// localStorage.removeItem('id');
	// localStorage.removeItem('title');
	var id = parseInt(window.localStorage.getItem('id'));

	for (let i = 1; i < id; i++) {
		var title = window.localStorage.getItem('title' + i);
		var time = window.localStorage.getItem('time' + i);
		createNote(title, time, i);
	}
}

loadNotes();