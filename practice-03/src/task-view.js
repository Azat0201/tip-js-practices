import { getTaskStats } from "./task-service.js";

const priorityLabels = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий'
};

function createActionButton(action, label) {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.action = action;

  const span = document.createElement("span");
  span.className = "action-label";
  span.textContent = label;
  button.append(span);

  return button;
}

// Здесь создаётся DOM, но не изменяется состояние приложения.
// Контракт карточки, селекторы и тексты описаны в методичке.
export function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = "task-card";
  li.dataset.taskId = String(task.id);
  li.classList.toggle("is-completed", task.completed);

  const title = document.createElement('h3');
  title.className = "task-title";
  title.textContent = task.title;

  const status = document.createElement('span');
  status.className = "task-status";
  status.textContent = task.completed ? "Выполнена" : "В работе";

  const priority = document.createElement('span');
  priority.className = "task-priority";
  priority.textContent = priorityLabels[task.priority];

  const actions = document.createElement('div');
  actions.className = "task-actions";

  const toggleButton = createActionButton("toggle", "Выполнена");
  toggleButton.setAttribute("aria-pressed", String(task.completed));
  const deleteButton = createActionButton("delete", "Удалить");

  actions.append(toggleButton, deleteButton);
  li.append(title, status, priority, actions);
  return li;
}

export function renderTaskList(listElement, tasks) {
  const taskElements = tasks.map(task => createTaskElement(task));
  listElement.replaceChildren(...taskElements);
}

export function renderSummary(summaryElement, tasks, visibleCount) {
  const stats = getTaskStats(tasks);
    const values = {
      total: String(stats.total),
      completed: String(stats.completed),
      pending: String(stats.pending),
      progress: `${stats.progress.toFixed(1)}%`,
      visible: String(visibleCount),
    };
    for (const [name, value] of Object.entries(values)) {
      summaryElement.querySelector(`[data-stat="${name}"]`).textContent = value;
    }
}

export function renderEmptyState(messageElement, total, visibleCount) {
  if (visibleCount > 0) {
    messageElement.textContent = "";
    messageElement.hidden = true;
    return;
  }
  messageElement.textContent = total === 0
    ? "Список задач пуст."
    : "Нет задач по выбранному фильтру.";
  messageElement.hidden = false;
}