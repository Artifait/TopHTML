function loadContent(file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;
        })
        .catch(error => console.error("Ошибка загрузки:", error));
}

// Функция для загрузки модулей и генерации меню
function loadModules() {
    fetch('modules.json')
        .then(response => response.json())
        .then(data => {
            const modulesMenu = document.getElementById("modules-menu");
            for (const module in data) {
                const moduleLink = document.createElement("a");
                moduleLink.href = "#";
                moduleLink.textContent = module;
                moduleLink.style.width = "128px";
                moduleLink.onclick = () => loadTasks(module, data[module]);
                modulesMenu.appendChild(moduleLink);
            }
        })
        .catch(error => console.error("Ошибка загрузки модулей:", error));
}

// Функция для загрузки заданий в выбранном модуле
function loadTasks(module, tasks) {
    const tasksNav = document.getElementById("tasks-nav");
    const moduleName = document.getElementById("module-name"); // Элемент для отображения текущей домашки
    tasksNav.innerHTML = '';  // Очищаем текущие задания

    // Добавляем выпадающее меню для модулей
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");

    const dropbtn = document.createElement("button");
    dropbtn.style.width = "190px";
    dropbtn.classList.add("dropbtn");
    dropbtn.textContent = "Домашки";
    dropdown.appendChild(dropbtn);

    const dropdownContent = document.createElement("div");
    dropdownContent.classList.add("dropdown-content");
    dropdownContent.id = "modules-menu";
    dropdown.appendChild(dropdownContent);

    tasksNav.appendChild(dropdown);
    loadModules();

    // Добавляем ссылки на задания выбранного модуля
    tasks.forEach(task => {
        const taskLink = document.createElement("a");
        taskLink.href = "#";
        taskLink.textContent = task.replace('.html', ''); // Убираем ".html" для показа
        taskLink.onclick = () => loadContent(`homeworks/${module}/${task}`);
        tasksNav.appendChild(taskLink);
    });
    moduleName.textContent = `Модуль ${module}`; // Или можно настроить на показ названия модуля
}

// Загружаем модули при загрузке страницы
document.addEventListener("DOMContentLoaded", loadModules);

// Блоки кода
const copyButtonLabel = "Copy Code";

// use a class selector if available
let blocks = document.querySelectorAll("pre");

blocks.forEach((block) => {
  // only add button if browser supports Clipboard API
  if (navigator.clipboard) {
    let button = document.createElement("button");

    button.innerText = copyButtonLabel;
    block.appendChild(button);

    button.addEventListener("click", async () => {
      await copyCode(block, button);
    });
  }
});

async function copyCode(block, button) {
  let code = block.querySelector("code");
  let text = code.innerText;

  await navigator.clipboard.writeText(text);

  // visual feedback that task is completed
  button.innerText = "Code Copied";

  setTimeout(() => {
    button.innerText = copyButtonLabel;
  }, 700);
}

//Код для Todo Lists
function toggleComplete(item) {
    item.classList.toggle('completed');
}

function deleteItem(event) {
    event.stopPropagation();
    const item = event.target.closest('.todo-item');
    item.remove();
}


// Код для игры в карты
const symbols = ['♠', '♠', '♥', '♥', '♦', '♦', '♣', '♣', '★', '★'];
let cards = [];
let flippedCards = [];
let attempts = 0;
let startTime;
let gameStarted = false;

function createCard(symbol) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card__face card__face--front">?</div>
        <div class="card__face card__face--back">${symbol}</div>
    `;
    card.addEventListener('click', () => flipCard(card, symbol));
    return card;
}

function flipCard(card, symbol) {
    if (!gameStarted) {
        startTime = new Date();
        gameStarted = true;
    }

    if (flippedCards.length < 2 && !card.classList.contains('is-flipped')) {
        card.classList.add('is-flipped');
        flippedCards.push({ card, symbol });

        if (flippedCards.length === 2) {
            attempts++;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [first, second] = flippedCards;

    if (first.symbol === second.symbol) {
        flippedCards = [];
        checkWin();
    } else {
        setTimeout(() => {
            first.card.classList.remove('is-flipped');
            second.card.classList.remove('is-flipped');
            flippedCards = [];
        }, 1000);
    }
}

function checkWin() {
    const allFlipped = Array.from(document.querySelectorAll('.card')).every(card => card.classList.contains('is-flipped'));

    if (allFlipped) {
        const endTime = new Date();
        const timeTaken = Math.floor((endTime - startTime) / 1000);
        showResult(attempts, timeTaken);
    }
}

function showResult(attempts, timeTaken) {
    const resultText = document.getElementById('resultText');
    resultText.textContent = `Поздравляем! Вы нашли все пары за ${attempts} попыток и ${timeTaken} секунд.`;
    document.getElementById('resultPopup').style.display = 'block';
}

function resetGame() {
    document.getElementById('resultPopup').style.display = 'none';
    gameStarted = false;
    attempts = 0;
    flippedCards = [];
    startGame();
}

function startGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    cards = [...symbols, ...symbols];
    cards.sort(() => Math.random() - 0.5);

    cards.forEach(symbol => {
        const card = createCard(symbol);
        gameBoard.appendChild(card);
    });
}

