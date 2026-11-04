const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const searchInput = document.getElementById('search-input');
const todoList = document.getElementById('todo-list');

const tasks = [];

function renderTasks() {
  const query = searchInput.value;
  todoList.textContent = '';

  tasks
    .filter((task) => task.text.includes(query))
    .forEach((task) => {
      const item = document.createElement('li');
      item.className = 'todo-item';

      const text = document.createElement('span');
      text.textContent = task.text;

      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.className = 'delete-btn';
      removeButton.textContent = 'Zmazať';
      removeButton.addEventListener('click', () => {
        const index = tasks.findIndex((entry) => entry.id === task.id);
        if (index !== -1) {
          tasks.splice(index, 1);
          renderTasks();
        }
      });

      item.append(text, removeButton);
      todoList.appendChild(item);
    });
}

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = todoInput.value.trim();

  if (!value) {
    return;
  }

  tasks.push({
    id: crypto.randomUUID(),
    text: value,
  });

  todoInput.value = '';
  renderTasks();
});

searchInput.addEventListener('input', renderTasks);
