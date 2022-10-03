var local = window.localStorage;

var id = local.getItem('id');

const docBody = document.body;

// SELECT CONTAINER
const darkModeToggle = document.querySelector(".dark-mode-toggle");

// FUNCTION TO IMPLEMENT DARK MODE
function darkMode() {
	const sheet = document.querySelector(".sheet");
	const notes = Array.from(document.querySelectorAll(".note"));
	const input = document.getElementById("title");
	const textArea = document.getElementById("description");

	if (darkModeToggle.classList.contains("to-dark")) {
		darkModeToggle.classList.remove("to-dark");
		darkModeToggle.classList.add("to-light");

		docBody.setAttribute("class", "dark-mode");

		sheet.style.backgroundColor = "#333";

		notes.forEach(note => {
			note.classList.add("light-font");
		});

		input.style.backgroundColor = "#333";
		input.style.color = "#fff";

		textArea.style.backgroundColor = "#333";
		textArea.style.color = "#fff";
	} else {
		darkModeToggle.classList.remove("to-light");
		darkModeToggle.classList.add("to-dark");

		docBody.removeAttribute("class");

		sheet.style.backgroundColor = "#fff";

		notes.forEach(note => {
			note.classList.remove("light-font");
		});

		input.style.backgroundColor = "#fff";
		input.style.color = "#000";

		textArea.style.backgroundColor = "#fff";
		textArea.style.color = "#000";
	}
}

darkModeToggle.addEventListener("click", darkMode);

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

	document.querySelector(".back").addEventListener('click', () => { updatingData(id); });
}

document.querySelector(".back").addEventListener('click', openHome)

function createNote(title, id) {
	var div1 = document.createElement('div');
	div1.className = "note"
	div1.id = "note" + id;

	// CHECK IF BODY HAS "dark-mode" CLASS BEFORE CREATING A NOTE
	if (docBody.classList.contains("dark-mode")) {
		div1.classList.add("light-font");
	} else {
		div1.classList.remove("light-font");
	}

	if (title == "") {
		title = "Untitled";
	}

	var h1 = document.createElement("h1");
	h1.id = "title" + id;
	h1.innerHTML = title;
	h1.addEventListener('click', () => { openData(id) });

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