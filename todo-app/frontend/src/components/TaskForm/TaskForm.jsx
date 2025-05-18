import React, { useState } from 'react';
import styles from './TaskForm.module.css';

const TodoForm = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('normal');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask({
        text: taskText.trim(),
        priority: priority,
        completed: false
      });
      setTaskText('');
      setPriority('normal');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="✍️ Agregar nueva tarea..."
          className={styles.input}
          required
          maxLength={255}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={styles.select}
        >
          <option value="baja">🟢 Baja</option>
          <option value="normal">🟡 Normal</option>
          <option value="alta">🔴 Alta</option>
        </select>
        <button type="submit" className={styles.button}>
          Agregar +
        </button>
      </div>
    </form>
  );
};

export default TodoForm;