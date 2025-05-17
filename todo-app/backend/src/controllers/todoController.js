const fs = require('fs').promises;
const path = require('path');

const todosFile = path.join(__dirname, '../data/todos.json');

const ensureFile = async () => {
  try {
    await fs.access(todosFile);
  } catch {
    await fs.writeFile(todosFile, '[]');
  }
};

const todoController = {
  getAllTodos: async (req, res) => {
    try {
      await ensureFile();
      const data = await fs.readFile(todosFile, 'utf8');
      res.json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las tareas' });
    }
  },

  createTodo: async (req, res) => {
    try {
      await ensureFile();
      const todos = JSON.parse(await fs.readFile(todosFile, 'utf8'));
      const newTodo = {
        id: Date.now(),
        text: req.body.text,
        priority: req.body.priority || 'normal', // Agregamos la prioridad
        completed: false,
        createdAt: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        completedAt: null
      };
      todos.push(newTodo);
      await fs.writeFile(todosFile, JSON.stringify(todos, null, 2));
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la tarea' });
    }
  },

  updateTodo: async (req, res) => {
    try {
      await ensureFile();
      const todos = JSON.parse(await fs.readFile(todosFile, 'utf8'));
      const index = todos.findIndex(todo => todo.id === parseInt(req.params.id));
      
      if (index === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }

      todos[index] = {
        ...todos[index],
        ...req.body,
        priority: req.body.priority || todos[index].priority, // Mantenemos la prioridad actual si no se proporciona una nueva
        completedAt: req.body.completed ? new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }) : null
      };

      await fs.writeFile(todosFile, JSON.stringify(todos, null, 2));
      res.json(todos[index]);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
  },

  deleteTodo: async (req, res) => {
    try {
      await ensureFile();
      const todos = JSON.parse(await fs.readFile(todosFile, 'utf8'));
      const filteredTodos = todos.filter(todo => todo.id !== parseInt(req.params.id));
      await fs.writeFile(todosFile, JSON.stringify(filteredTodos, null, 2));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
  }
};

module.exports = todoController;