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
