import { demoTasks, variantNumber, variantTasks } from "./data.js";
import {
  createTask,
  findTaskById,
  getPendingTasks,
  getTaskTitles,
  getTaskStats,
  addTask,
  setTaskCompleted,
  renameTask,
  removeTask,
} from "./task-service.js";
import assert from "node:assert/strict";

console.log("ПР2. Заготовка демонстрационного сценария");
console.log("Количество задач в общем наборе:", demoTasks.length);
console.log("Номер варианта:", variantNumber);
console.log("Количество задач в индивидуальном наборе:", variantTasks.length);

function printResults(currentTasks) {
  const { total, completed, pending, progress } = getTaskStats(currentTasks);

  console.log(`Всего: ${total}; выполнено: ${completed}; осталось: ${pending}`);
  if (total === 0) {
    console.log("Задач пока нет");
  } else {
    console.log(`Прогресс: ${progress.toFixed(1)}%`);
  }
}

let currentTasks = demoTasks.map((task) => ({ ...task }));
let changedTasks = demoTasks.map((task) => ({ ...task }));

printResults(changedTasks);

addTask(currentTasks, 20, "Добавить проверку", "high");
const result = addTask(changedTasks, 20, "Добавить проверку", "high");

if (result.ok) {
  changedTasks = result.tasks;
} else {
  console.error(`Ошибка: ${result.error}`);
}

printResults(changedTasks);

setTaskCompleted(currentTasks, 4, true);
const completedTasks = setTaskCompleted(changedTasks, 4, true);

if (completedTasks.ok) {
  changedTasks = completedTasks.tasks;
} else {
  console.error(`Ошибка: ${completedTasks.error}`);
}

printResults(changedTasks);

renameTask(currentTasks, 10, "Подготовить инструкцию запуска");
const renamedTasks = renameTask(changedTasks, 10, "Подготовить инструкцию запуска");

if (renamedTasks.ok) {
  changedTasks = renamedTasks.tasks;
} else {
  console.error(`Ошибка: ${renamedTasks.error}`);
}

printResults(changedTasks);

removeTask(currentTasks, 7);
const deletedTasks = removeTask(changedTasks, 7);

if (deletedTasks.ok) {
  changedTasks = deletedTasks.tasks;
} else {
  console.error(`Ошибка: ${deletedTasks.error}`);
}

printResults(changedTasks);

addTask(currentTasks, 20, "Добавить вторую проверку", "low");
const errorTasks = addTask(changedTasks, 20, "Добавить вторую проверку", "low");

if (errorTasks.ok) {
  changedTasks = errorTasks.tasks;
} else {
  console.error(`Ошибка: ${errorTasks.error}`);
}

printResults(changedTasks);

assert.deepEqual(currentTasks, demoTasks)



console.log("------------")
currentTasks = variantTasks.map((task) => ({ ...task }));
changedTasks = variantTasks.map((task) => ({ ...task }));

printResults(changedTasks);

addTask(currentTasks, 80, "Добавить проверку", "medium");
const newAddVariant = addTask(changedTasks, 80, "Добавить проверку", "medium");

if (newAddVariant.ok) {
  changedTasks = newAddVariant.tasks;
} else {
  console.error(`Ошибка: ${newAddVariant.error}`);
}

printResults(changedTasks);

setTaskCompleted(currentTasks, 11, true);
const completeTask = setTaskCompleted(changedTasks, 11, true);

if (completeTask.ok) {
  changedTasks = completeTask.tasks;
} else {
  console.error(`Ошибка: ${completeTask.error}`);
}

printResults(changedTasks);

renameTask(currentTasks, 23, "Отдохнуть");
const renamedTask = renameTask(changedTasks, 23, "Отдохнуть");

if (renamedTask.ok) {
  changedTasks = renamedTask.tasks;
} else {
  console.error(`Ошибка: ${renamedTask.error}`);
}

printResults(changedTasks);

removeTask(currentTasks, 37);
const deleteTask = removeTask(changedTasks, 37);

if (deleteTask.ok) {
  changedTasks = deleteTask.tasks;
} else {
  console.error(`Ошибка: ${deleteTask.error}`);
}

printResults(changedTasks);

addTask(currentTasks, 80, "Ничего не делать", "low");
const errorAddTask = addTask(changedTasks, 80, "Ничего не делать", "low");

if (errorAddTask.ok) {
  changedTasks = errorAddTask.tasks;
} else {
  console.error(`Ошибка: ${errorAddTask.error}`);
}

printResults(changedTasks);

assert.deepEqual(currentTasks, variantTasks)
