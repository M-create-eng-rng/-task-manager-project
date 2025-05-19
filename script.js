const form = document.getElementById('taskForm');
const input = document.getElementById('taskInput');
const list = document.getElementById('taskList');

// Load tasks from the server
async function loadTasks() {
  const response = await fetch('/tasks');
  const tasks = await response.json();
  list.innerHTML = tasks.map(task => `<li>${task.title}</li>`).join('');
}

// Handle form submit
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent page reload
  const title = input.value.trim();

  if (title) {
    await fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });

    input.value = ''; // Clear input
    loadTasks();      // Refresh task list
  }
});

// Load tasks when the page starts
loadTasks();