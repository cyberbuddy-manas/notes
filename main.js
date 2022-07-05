var local = window.localStorage;

if (local.getItem('id') == undefined) {
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
}

document.querySelector(".btn").onclick = openCreate;

function openHome() {
	var home = document.getElementById("home");
	home.style.display = "unset";
	
	var create = document.getElementById("create");
	create.style.display = "none";
}

function openData(id) {
	var home = document.getElementById("home");
	home.style.display = "none";
	
	var create = document.getElementById("create");
	create.style.display = "unset";

	var title = document.getElementById('title');
	var desc = document.getElementById('description');

	var titleData = window.localStorage.getItem('title' + id);
	var descData = window.localStorage.getItem('desc' + id);

	title.value = titleData;
	desc.value = descData;
}

document.querySelector(".back").addEventListener('click', openHome)

function createCompo(title, id) {
	var div1 = document.createElement('div');
	div1.className = "compo"
	
	var h1 = document.createElement("h1");
	h1.innerHTML = title;
	h1.id = "compo" + id;
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
}

function sendingData() {
	var title = document.querySelector("#title");
	var desc = document.querySelector("#description");
	var id = parseInt(window.localStorage.getItem('id'));

	if (title.value != "" || desc.value != "") {
		window.localStorage.setItem('title' + id, title.value);
		window.localStorage.setItem('desc' + id, desc.value);

		id = id + 1;

		window.localStorage.setItem('id', id);
	}
}

document.querySelector('.back').addEventListener('click', sendingData)

function loadCompos() {
	var id = parseInt(window.localStorage.getItem('id'));

	if (id > 1) {
		document.querySelector(".blank").style.display = "none";
	}

	for (let i = 1; i < id; i++) {
		var title = window.localStorage.getItem('title' + i);

		if (title == "") {
			title = "Untitled";
		}

		createCompo(title, i);
	}
}

loadCompos();