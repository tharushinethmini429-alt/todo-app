// Load saved tasks from localStorage, or start with examples
let tasks = loadFromStorage() || [
  { id: 1, text: 'Review project proposal', done: false, priority: 'high',   createdAt: Date.now() - 3000 },
  { id: 2, text: 'Buy groceries',           done: false, priority: 'medium', createdAt: Date.now() - 2000 },
  { id: 3, text: 'Read for 20 minutes',     done: true,  priority: 'low',    createdAt: Date.now() - 1000 },
];

let nextId  = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
let filter  = 'all';   // 'all' | 'active' | 'completed' | 'high'

//  Priority helpers 
const PRIORITY_DOT_COLOR = {
  high:   '#E24B4A',
  medium: '#EF9F27',
  low:    '#1D9E75',
  none:   'transparent',
};

//  LocalStorage

/**
 * Save the tasks array to localStorage as JSON.
 * Called every time tasks change.
 */
function saveToStorage() {
  try {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  } catch (e) {
    console.warn('Could not save to localStorage:', e);
  }
}

/**
 * Load tasks from localStorage.
 * Returns null if nothing is saved yet.
 */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem('todo-tasks');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Could not load from localStorage:', e);
    return null;
  }
}

// Add a task 

/**
 * Read the input field and priority dropdown,
 * create a new task object, and re-render.
 */
function addTask() {
  const input    = document.getElementById('task-input');
  const select   = document.getElementById('priority-select');
  const errorEl  = document.getElementById('input-error');
  const text     = input.value.trim();

  // Validation: don't allow empty tasks
  if (!text) {
    input.classList.add('error');
    errorEl.textContent = 'Please enter a task name.';
    input.focus();
    setTimeout(() => {
      input.classList.remove('error');
      errorEl.textContent = '';
    }, 2500);
    return;
  }

  // Build the new task object
  const newTask = {
    id:        nextId++,
    text:      text,
    done:      false,
    priority:  select.value,
    createdAt: Date.now(),
  };

  tasks.unshift(newTask);   // add to the top of the list
  saveToStorage();

  // Reset the form
  input.value    = '';
  select.value   = 'none';
  errorEl.textContent = '';
  input.classList.remove('error');
  input.focus();

  render();
}

// Toggle done/undone 

/**
 * Flip the `done` flag on a task by its id.
 */
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
    saveToStorage();
    render();
  }
}

//Delete a task

/**
 * Remove a task from the array by its id.
 */
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveToStorage();
  render();
}

// Clear all completed

/**
 * Remove every task that is marked done.
 */
function clearCompleted() {
  tasks = tasks.filter(t => !t.done);
  saveToStorage();
  render();
}

// Set the active filter 

/**
 * Change which subset of tasks is shown.
 * @param {string} f - 'all' | 'active' | 'completed' | 'high'
 * @param {HTMLElement} btn - the clicked filter button
 */
function setFilter(f, btn) {
  filter = f;

  // Update active class on filter buttons
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  render();
}

// Build a single task row 

/**
 * Create the <li> element for one task.
 * @param {Object} task
 * @returns {HTMLElement}
 */
function buildTaskItem(task) {
  const li = document.createElement('li');
  li.className  = 'task-item';
  li.setAttribute('role', 'listitem');

  // Checkbox 
  const checkbox = document.createElement('div');
  checkbox.className   = `task-checkbox ${task.done ? 'done' : ''}`;
  checkbox.setAttribute('role', 'checkbox');
  checkbox.setAttribute('aria-checked', String(task.done));
  checkbox.setAttribute('tabindex', '0');
  checkbox.setAttribute('aria-label', task.done ? 'Mark incomplete' : 'Mark complete');
  checkbox.innerHTML   = `<i class="ti ti-check" aria-hidden="true"></i>`;
  checkbox.onclick     = () => toggleTask(task.id);
  checkbox.onkeydown   = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTask(task.id); } };

  // Priority dot 
  const dot = document.createElement('div');
  dot.className = 'priority-dot';
  dot.style.background = PRIORITY_DOT_COLOR[task.priority] || 'transparent';
  dot.title = task.priority !== 'none' ? `${task.priority} priority` : '';

  // Task text 
  const text = document.createElement('span');
  text.className   = `task-text ${task.done ? 'done' : ''}`;
  text.textContent = task.text;

  //  Priority badge (only for medium/high/low) 
  if (task.priority !== 'none') {
    const badge = document.createElement('span');
    badge.className   = `priority-badge ${task.priority}`;
    badge.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
    li.appendChild(checkbox);
    li.appendChild(dot);
    li.appendChild(text);
    li.appendChild(badge);
  } else {
    li.appendChild(checkbox);
    li.appendChild(dot);
    li.appendChild(text);
  }

  // Delete button 
  const delBtn = document.createElement('button');
  delBtn.className   = 'delete-btn';
  delBtn.setAttribute('aria-label', `Delete: ${task.text}`);
  delBtn.innerHTML   = `<i class="ti ti-trash" aria-hidden="true"></i>`;
  delBtn.onclick     = () => deleteTask(task.id);

  li.appendChild(delBtn);
  return li;
}

// Main render function 

/**
 * Re-draw the task list and update all counters.
 * Called after every state change.
 */
function render() {
  const listEl      = document.getElementById('task-list');
  const emptyEl     = document.getElementById('empty-state');
  const footerEl    = document.getElementById('app-footer');
  const countEl     = document.getElementById('task-count');
  const remainEl    = document.getElementById('remaining-count');
  const clearBtn    = document.getElementById('clear-btn');

  // Filter tasks 
  let visible;
  switch (filter) {
    case 'active':    visible = tasks.filter(t => !t.done);                          break;
    case 'completed': visible = tasks.filter(t => t.done);                           break;
    case 'high':      visible = tasks.filter(t => t.priority === 'high');            break;
    default:          visible = tasks;                                                break;
  }

  // Update counters 
  const totalCount    = tasks.length;
  const activeCount   = tasks.filter(t => !t.done).length;
  const completedCount = tasks.filter(t => t.done).length;

  countEl.textContent  = totalCount ? `${totalCount} task${totalCount !== 1 ? 's' : ''}` : '';
  remainEl.textContent = `${activeCount} remaining`;

  // Show / hide "Clear completed" button 
  clearBtn.hidden = completedCount === 0;

  // Show / hide footer 
  footerEl.hidden = totalCount === 0;
  // Override display:flex set by CSS when not hidden
  if (!footerEl.hidden) footerEl.style.display = 'flex';

  //Render task rows 
  listEl.innerHTML = '';   // clear existing rows

  if (visible.length === 0) {
    emptyEl.hidden = false;
  } else {
    emptyEl.hidden = true;
    visible.forEach(task => listEl.appendChild(buildTaskItem(task)));
  }
}

// Keyboard shortcut: Enter to add 

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('task-input');
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
  });

  // First paint
  render();
});
