import React, { useState, useEffect } from 'react';
import TaskForm from '../TaskForm/TaskForm';
import TaskList from '../TaskList/TaskList';
import TaskFilter from '../TaskFilter/TaskFilter';
import { getTasks, createTask, updateTask, deleteTask } from '../../services/api';
import styles from './TaskContainer.module.css';
// Componente principal que maneja la logica de las tareas
const TodoContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error cargando tareas:', error);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const createdTask = await createTask({
        text: newTask.text,
        priority: newTask.priority,
        completed: false
      });
      setTasks([...tasks, createdTask]);
    } catch (error) {
      console.error('Error creando tarea:', error);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      const updatedTask = await updateTask(taskId, {
        ...task,
        completed: !task.completed
      });
      setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
    } catch (error) {
      console.error('Error actualizando tarea:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error eliminando tarea:', error);
    }
  };

  const getFilteredTasks = () => {
    switch (activeFilter) {
      case 'alta':
        return tasks.filter(task => task.priority === 'alta');
      case 'normal':
        return tasks.filter(task => task.priority === 'normal');
      case 'baja':
        return tasks.filter(task => task.priority === 'baja');
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>✅ Lista de Tareas</h1>
          <p className={styles.subtitle}>Organiza tus actividades diarias</p>
        </header>
        <div className={styles.content}>
          <div className={styles.summary}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryNumber} >{tasks.length}</span>
              <span className={styles.summaryLabel}>Tareas Totales</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryNumber}>
                {tasks.filter(task => task.completed).length}
              </span>
              <span className={styles.summaryLabel}>Completadas</span>
            </div>
          </div>
          <div className={styles.todoSection}>
            <TaskForm onAddTask={handleAddTask} />
            <TaskFilter 
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
            <TaskList 
              tasks={getFilteredTasks()}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;