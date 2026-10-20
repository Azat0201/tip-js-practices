// Заготовка модуля. throw ниже отмечает отсутствие реализации,
// а не способ обработки некорректных данных в готовом решении.
// Для предусмотренных ошибок необходимо возвращать { ok: false, error: "..." }.
// console.log(), prompt(), document и чтение внешнего состояния здесь не нужны.

function checkIdAndTitle(id, title, priority = "medium") {
  if (!Number.isSafeInteger(id) || id < 1) {
    return { ok: false, error: "Некорретное значение id, должен быть целым положительным числом" };
  }
  if (!(typeof title === "string")) {
    return { ok: false, error: "Некорретное значения для названия, должны быть строками" };
  }
  title = title.trim();
  if (title.length > 100 || title.length < 1) {
    return { ok: false, error: "Некорретная длина названия, должна быть в пределах от 1 до 100 (включительно)" };
  }
  if (!(["medium", "low", "high"].includes(priority) && typeof priority === "string")) {
    return { ok: false, error: "Некорректное значение приоритета, должна быть одним из вариантов: low, medium, high" };
  }
  return { ok: true };
}

export function createTask(id, title, priority = "medium") {
  const check = checkIdAndTitle(id, title, priority);
  if (!check.ok) {
    return check;
  }
  title = title.trim();
  return {
    ok: true,
    task: {
      id: id,
      title: title,
      completed: false,
      priority: priority
    }
  };
}

export function findTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function getPendingTasks(tasks) {
  return tasks.filter((task) => task.completed === false); 
}

export function getTaskTitles(tasks) {
  return tasks.map((task) => task.title);
}

export function getTaskStats(tasks) {
  const countPendingTasks = getPendingTasks(tasks).length;
  const countCompletedTasks = tasks.length - countPendingTasks;
  const progress = countCompletedTasks === 0 ? 0 : countCompletedTasks * 100 / tasks.length;
  return {
    total: tasks.length, 
    completed: countCompletedTasks, 
    pending: countPendingTasks, 
    progress: progress};
}

export function addTask(tasks, id, title, priority = "medium") {
  if (findTaskById(tasks, id) !== undefined) {
    return { ok: false, error: "id задачи уже существует в списке задач" }
  } 
  const task = createTask(id, title, priority);
  if (task.ok === false) {
    return task;
  }
  return { ok: true, tasks: [...tasks, task.task] };
}

export function setTaskCompleted(tasks, id, completed) {
  if (!Number.isSafeInteger(id) || id < 1) {
    return { ok: false, error: "Некорретное значение id, должен быть целым положительным числом" };
  }
  const task = findTaskById(tasks, id);
  if (task === undefined) {
    return { ok: false, error: "id задачи не существует в списке задач" }
  }
  if (typeof completed !== "boolean") {
    return { ok: false, error: "некорректное значение статуса задачи" }
  }
  const newTasks = tasks.map((task) => task.id === id ? { ...task, completed: completed } : task);
  return { ok: true, tasks: newTasks}
}

export function renameTask(tasks, id, title) {
  const check = checkIdAndTitle(id, title);
  if (!check.ok) {
    return check;
  }
  const task = findTaskById(tasks, id);
  if (task === undefined) {
    return { ok: false, error: "id задачи не существует в списке задач" }
  }
  title = title.trim(); 
  const newTasks = tasks.map((task) => task.id === id ? { ...task, title: title } : task);
  return { ok: true, tasks: newTasks}
}

export function removeTask(tasks, id) {
  if (!Number.isSafeInteger(id) || id < 1) {
    return { ok: false, error: "Некорретное значение id, должен быть целым положительным числом" };
  }
  const task = findTaskById(tasks, id);
  if (task === undefined) {
    return { ok: false, error: "id задачи не существует в списке задач" }
  }
  const newTasks = tasks.filter((task) => task.id !== id);
  return { ok: true, tasks: newTasks}
}