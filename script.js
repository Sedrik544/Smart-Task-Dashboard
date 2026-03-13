// 1. Propojení
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const dateDisplay = document.getElementById('date-display');
const navLinks = document.querySelectorAll('.sidebar__link');
const sections = document.querySelectorAll('.content-section');
const userNameDisplay = document.querySelector('.header__info h1');

// 2. Data
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// 3. Úkoly
function renderTasks() {
    taskList.innerHTML = ''; 
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `<span>${task}</span><button class="btn-delete" onclick="deleteTask(${index})">Smazat</button>`;
        taskList.appendChild(li);
    });
}

window.deleteTask = function(index) {
    tasks.splice(index, 1);
    save();
};

function save() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    renderTasks();
    updateStats();
}

addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push(text);
        save();
        taskInput.value = '';
    }
});

// 4. Přepínání menu
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        sections.forEach(s => s.style.display = 'none');

        const text = link.innerText.trim();
        if (text === 'Moje Úkoly') document.getElementById('section-tasks').style.display = 'block';
        if (text === 'Statistiky') {
            document.getElementById('section-stats').style.display = 'block';
            updateStats();
        }
        if (text === 'Nastavení') document.getElementById('section-settings').style.display = 'block';
    });
});

// 5. Statistiky a Jméno
function updateStats() {
    const el = document.getElementById('total-tasks-count');
    if (el) el.innerText = tasks.length;
}

const savedName = localStorage.getItem('userName') || 'Davide';
userNameDisplay.innerText = `Ahoj, ${savedName}!`;

document.getElementById('save-settings-btn').addEventListener('click', () => {
    const newName = document.getElementById('name-change-input').value.trim();
    if (newName) {
        localStorage.setItem('userName', newName);
        userNameDisplay.innerText = `Ahoj, ${newName}!`;
        alert('Uloženo!');
    }
});

// Start
renderTasks();
dateDisplay.innerText = new Date().toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long' });