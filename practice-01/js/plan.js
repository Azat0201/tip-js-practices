"use strict";

const totalTasks = 7;
const completedTasks = 2;
const dailyLimit = 2;
if (totalTasks < 0 || completedTasks < 0 || dailyLimit < 0) {
    console.log("Ошибка: отрицательное количество.");
} else if (completedTasks > totalTasks) {
    console.log("Ошибка: выполнено больше, чем существует.");
} else if (completedTasks > 1000 || dailyLimit > 1000) {
    console.log("Ошибка: превышена верхняя граница.");
} else if (isNaN(completedTasks) || isNaN(totalTasks || isNaN(dailyLimit))) {
    console.log("Ошибка: недопустимое числовое значение.");
} else if (totalTasks % 1 !== 0 || completedTasks % 1 !== 0 || dailyLimit % 1 !== 0) {
    console.log("Ошибка: дробное количество.");
} else if (typeof totalTasks === "string" || typeof completedTasks === "string" || typeof dailyLimit === "string") {
    console.log("Ошибка: вместо числа передана строка.");
} else if (dailyLimit === 0) {
    console.log("Ошибка: нулевой дневной лимит");
} else if (totalTasks === 0) {
    console.log("Задач пока нет")
} else {
    let leftTasks = totalTasks - completedTasks;
    console.log("Осталось задач: " + leftTasks);
    let day = 0;
    while (leftTasks > 0) {
        day++;
        if (leftTasks > dailyLimit) {
            leftTasks -= dailyLimit;
            console.log("День " + day + ": выполнено " + dailyLimit + ", осталось " + leftTasks);
        } else {
            console.log("День " + day + ": выполнено " + leftTasks + ", осталось 0");
            leftTasks = 0;
        }
    }
    console.log("Потребуется дней: " + day);
}