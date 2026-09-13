# 📝 Todo List App

A modern, feature-rich to-do list application with local storage functionality. Organize your tasks efficiently with categories, priorities, tags, and more!

## ✨ Features

- ✅ **Add Tasks** - Create new tasks with title, due date, priority, and tags
- 📋 **Organize** - Filter by categories (All, Today, This Week, Completed)
- 🏷️ **Tags** - Organize tasks with custom tags (Work, Personal, Shopping, Health, Learning)
- 🎯 **Priorities** - Set task priority levels (High, Medium, Low)
- 🔍 **Search** - Quickly find tasks by title or tag
- 📊 **Statistics** - Track total, completed, and pending tasks
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 💾 **Local Storage** - All data saved locally in your browser
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile
- ♿ **Accessible** - Built with accessibility in mind

## 🚀 Quick Start

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/aminerouatbi87-coder/Todo-List-App.git
cd Todo-List-App
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Start the server**
```bash
npm start
```

5. **Open in browser**
```
http://localhost:3001
```

### Development Mode

With auto-reload on file changes:
```bash
npm run dev
```

## 📖 Usage

### Adding a Task
1. Type your task in the input field
2. (Optional) Set a due date
3. (Optional) Choose a priority level
4. (Optional) Add a tag for categorization
5. Click "Add Task" or press Enter

### Managing Tasks
- ✓ **Check** the checkbox to mark as complete
- ✏️ **Edit** tasks by clicking the edit icon
- 🗑️ **Delete** tasks by clicking the delete icon
- 🔍 **Search** using the search bar

### Filtering Tasks
- **All Tasks** - View all incomplete tasks
- **Today** - Tasks due today
- **This Week** - Tasks due within the next 7 days
- **Completed** - All completed tasks

### Sorting Options
- Newest First (default)
- Oldest First
- By Priority
- Alphabetically

## 📁 Project Structure

```
Todo-List-App/
├── public/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # Comprehensive styling
│   └── script.js           # Frontend logic with localStorage
├── server.js               # Express server
├── package.json            # Dependencies
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: Browser Local Storage API
- **Backend**: Node.js, Express.js
- **Icons**: Font Awesome 6.4.0
- **Design**: CSS Grid, Flexbox, CSS Variables

## 💾 Local Storage

All your tasks are automatically saved to your browser's local storage:
- **Todos** - Stored as JSON in `localStorage.todos`
- **Theme** - Dark mode preference saved in `localStorage.darkMode`
- **Data Persistence** - Data persists even after closing and reopening the browser

### Clear Storage
To clear all data:
```javascript
localStorage.clear();
location.reload();
```

## 🎨 Customization

### Change Color Scheme

Edit the CSS variables in `public/styles.css`:

```css
:root {
    --primary: #6366f1;              /* Main color */
    --primary-dark: #4f46e5;         /* Darker shade */
    --secondary: #ec4899;            /* Secondary color */
    --success: #10b981;              /* Success color */
    --warning: #f59e0b;              /* Warning color */
    --danger: #ef4444;               /* Danger color */
}
```

### Add New Tags

Edit the tag options in `public/index.html`:

```html
<select id="tagSelect" class="tag-select">
    <option value="your-tag">Your Tag</option>
    <!-- ... existing options ... -->
</select>
```

Then add the emoji mapping in `public/script.js`:

```javascript
const tagEmoji = {
    'your-tag': '🎯',
    // ... existing mappings ...
};
```

## 🚀 Features Coming Soon

- [ ] Export tasks as PDF/CSV
- [ ] Recurring tasks
- [ ] Task reminders/notifications
- [ ] Subtasks support
- [ ] Drag and drop reordering
- [ ] Cloud sync (Firebase/Supabase)
- [ ] Multi-device sync
- [ ] Collaborative tasks
- [ ] Time tracking
- [ ] Analytics dashboard

## 📱 Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## ⚙️ API Endpoints

### Health Check
```
GET /api/health
```
Returns server status.

### Version
```
GET /api/version
```
Returns app version.

## 🐛 Troubleshooting

### Tasks not saving?
- Check if Local Storage is enabled in browser settings
- Ensure you're not in private/incognito mode
- Clear browser cache and try again

### Server won't start?
- Make sure port 3001 is not in use
- Check if Node.js is installed: `node --version`
- Try changing PORT in `.env` file

### Styles not loading?
- Clear browser cache (Ctrl+Shift+Del or Cmd+Shift+Del)
- Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)

## 📊 Stats

- **Total Tasks Created** - Displayed in sidebar
- **Completed Tasks** - Number of finished tasks
- **Pending Tasks** - Number of incomplete tasks
- **Task Distribution** - By priority and tags

## 🔐 Security Notes

- All data is stored locally in your browser
- No data is sent to any server
- No tracking or analytics
- Complete privacy and data control

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

**aminerouatbi87**

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Made with ❤️ for productivity enthusiasts

**Happy organizing! 🎯**
