"use strict";

const totalTasks = 7;
const completedTasks = 2;
if (totalTasks < 0 || completedTasks < 0) {
    console.log("Ошибка: отрицательное количество.");
} else if (completedTasks > totalTasks) {
    console.log("Ошибка: выполнено больше, чем существует.");
} else if (completedTasks > 1000) {
    console.log("Ошибка: превышена верхняя граница.");
} else if (isNaN(completedTasks) || isNaN(totalTasks)) {
    console.log("Ошибка: недопустимое числовое значение.");
} else if (totalTasks % 1 !== 0 || completedTasks % 1 !== 0) {
    console.log("Ошибка: дробное количество.");
} else if (typeof totalTasks === "string" || typeof completedTasks === "string") {
    console.log("Ошибка: вместо числа передана строка.");
} else if (totalTasks === 0) {
    console.log("Задач пока нет")
} else {
    console.log("Всего задач: " + totalTasks);
    console.log("Выполнено: " + completedTasks);
    console.log("Осталось: " + (totalTasks - completedTasks));
    const result = completedTasks / totalTasks * 100
    console.log("Прогресс: " + result.toFixed(1));
    console.log("Статус: " + (totalTasks==completedTasks ? "Завершено" : (completedTasks==0 ? "Не начато" : "В работе")));
}
