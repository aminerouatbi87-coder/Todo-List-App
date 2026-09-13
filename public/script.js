class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.currentSort = 'date-desc';
        this.searchQuery = '';
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        this.init();
    }

    init() {
        this.setupDOM();
        this.attachEventListeners();
        this.applyTheme();
        this.render();
    }

    setupDOM() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.tasksContainer = document.getElementById('tasksContainer');
        this.searchInput = document.getElementById('searchInput');
        this.sortSelect = document.getElementById('sortSelect');
        this.dueDate = document.getElementById('dueDate');
        this.prioritySelect = document.getElementById('prioritySelect');
        this.tagSelect = document.getElementById('tagSelect');
        this.clearAllBtn = document.getElementById('clearAllBtn');
        this.themeToggle = document.getElementById('themeToggle');
        this.tagsList = document.getElementById('tagsList');
        this.categoryBtns = document.querySelectorAll('.category-btn');
        this.modal = document.getElementById('taskModal');
        this.modalBody = document.getElementById('modalBody');
    }

    attachEventListeners() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        this.searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.render();
        });
        this.sortSelect.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.render();
        });
        this.clearAllBtn.addEventListener('click', () => this.clearCompleted());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        this.categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.categoryBtns.forEach(b => b.classList.remove('active'));
                e.target.closest('.category-btn').classList.add('active');
                this.currentFilter = e.target.closest('.category-btn').dataset.category;
                this.render();
            });
        });

        // Close modal
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.modal.classList.remove('active');
            }
        });

        document.querySelector('.modal-close')?.addEventListener('click', () => {
            this.modal.classList.remove('active');
        });
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) return;

        const todo = {
            id: Date.now(),
            text,
            completed: false,
            priority: this.prioritySelect.value,
            dueDate: this.dueDate.value,
            tag: this.tagSelect.value,
            createdAt: new Date().toISOString(),
        };

        this.todos.unshift(todo);
        this.saveTodos();
        this.todoInput.value = '';
        this.dueDate.value = '';
        this.prioritySelect.value = 'medium';
        this.tagSelect.value = '';
        this.render();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.render();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        const newText = prompt('Edit task:', todo.text);
        if (newText && newText.trim()) {
            todo.text = newText.trim();
            this.saveTodos();
            this.render();
        }
    }

    clearCompleted() {
        if (confirm('Are you sure you want to delete all completed tasks?')) {
            this.todos = this.todos.filter(todo => !todo.completed);
            this.saveTodos();
            this.render();
        }
    }

    getFilteredTodos() {
        let filtered = [...this.todos];

        // Apply category filter
        if (this.currentFilter === 'completed') {
            filtered = filtered.filter(todo => todo.completed);
        } else if (this.currentFilter === 'today') {
            const today = new Date().toISOString().split('T')[0];
            filtered = filtered.filter(todo => todo.dueDate === today && !todo.completed);
        } else if (this.currentFilter === 'week') {
            const today = new Date();
            const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            filtered = filtered.filter(todo => {
                if (!todo.dueDate || todo.completed) return false;
                return new Date(todo.dueDate) <= weekFromNow && new Date(todo.dueDate) >= today;
            });
        } else {
            filtered = filtered.filter(todo => !todo.completed);
        }

        // Apply search filter
        if (this.searchQuery) {
            filtered = filtered.filter(todo =>
                todo.text.toLowerCase().includes(this.searchQuery) ||
                (todo.tag && todo.tag.toLowerCase().includes(this.searchQuery))
            );
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (this.currentSort) {
                case 'date-asc':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'priority':
                    const priorityOrder = { high: 0, medium: 1, low: 2 };
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                case 'name':
                    return a.text.localeCompare(b.text);
                case 'date-desc':
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });

        return filtered;
    }

    render() {
        const filtered = this.getFilteredTodos();
        const html = filtered.length > 0
            ? filtered.map(todo => this.createTaskHTML(todo)).join('')
            : '<div class="empty-state"><i class="fas fa-inbox"></i><p>No tasks found. Add one to get started! 🚀</p></div>';

        this.tasksContainer.innerHTML = html;
        this.updateStats();
        this.renderTags();
        this.attachTaskListeners();
    }

    createTaskHTML(todo) {
        const date = todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : '';
        const priorityEmoji = { high: '🔴', medium: '🟡', low: '🟢' };
        const tagEmoji = {
            work: '💼',
            personal: '👤',
            shopping: '🛒',
            health: '🏥',
            learning: '📚'
        };

        return `
            <div class="task-item ${todo.priority}-priority ${todo.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    data-id="${todo.id}"
                >
                <div class="task-content">
                    <div class="task-text">${this.escapeHtml(todo.text)}</div>
                    <div class="task-meta">
                        ${date ? `<span class="task-date">📅 ${date}</span>` : ''}
                        <span class="task-priority">${priorityEmoji[todo.priority]} ${todo.priority}</span>
                        ${todo.tag ? `<span class="task-tag">${tagEmoji[todo.tag] || '🏷️'} ${todo.tag}</span>` : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn-small btn-edit" data-id="${todo.id}" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-small btn-delete" data-id="${todo.id}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    attachTaskListeners() {
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleTodo(parseInt(e.target.dataset.id));
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.deleteTodo(parseInt(e.target.closest('.btn-delete').dataset.id));
            });
        });

        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.editTodo(parseInt(e.target.closest('.btn-edit').dataset.id));
            });
        });
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const pending = total - completed;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('pendingTasks').textContent = pending;
    }

    renderTags() {
        const tags = [...new Set(this.todos.map(t => t.tag).filter(Boolean))];
        const tagEmoji = {
            work: '💼',
            personal: '👤',
            shopping: '🛒',
            health: '🏥',
            learning: '📚'
        };

        this.tagsList.innerHTML = tags.map(tag => 
            `<span class="tag-badge">${tagEmoji[tag] || '🏷️'} ${tag}</span>`
        ).join('');
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('darkMode', this.isDarkMode);
        this.applyTheme();
    }

    applyTheme() {
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
            this.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.classList.remove('dark-mode');
            this.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadTodos() {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    const app = new TodoApp();
    window.todoApp = app;
});
