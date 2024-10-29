import os
import json

def generate_modules_json():
    base_dir = "homeworks"
    modules = {}

    for module_name in os.listdir(base_dir):
        module_path = os.path.join(base_dir, module_name)
        if os.path.isdir(module_path):  # Проверка, что это папка (модуль)
            tasks = []
            for task_file in os.listdir(module_path):
                if task_file.endswith(".html") and task_file.startswith("Task"):
                    tasks.append(task_file)  # Добавляем задания в список

            modules[module_name] = sorted(tasks)  # Сортируем задания по порядку

    with open("modules.json", "w", encoding="utf-8") as json_file:
        json.dump(modules, json_file, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    generate_modules_json()
