import React from 'react';
import styles from './TodoList.module.css';

const TodoList = ({ tasks, onToggleTask, onDeleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No hay tareas pendientes</p>
        <span className={styles.emptyIcon}>📝</span>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {tasks.map(task => (
        <div key={task.id} className={`${styles.task} ${task.completed ? styles.completed : ''}`}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleTask(task.id)}
            className={styles.checkbox}
          />
          <div className={styles.taskContent}>
            <div className={styles.taskHeader}>
              <span className={`${styles.priority} ${styles[`priority-${task.priority}`]}`}>
                {task.priority === 'alta' ? '🔴' : task.priority === 'normal' ? '🟡' : '🟢'}
              </span>
              <span 
                className={styles.text} 
                data-full-text={task.text}
              >
                {task.text}
              </span>
            </div>
            <div className={styles.dates}>
              <span className={styles.date}>
                <span className={styles.dateLabel}>Creada:</span> {task.createdAt}
              </span>
              {task.completed && task.completedAt && (
                <span className={styles.date}>
                  <span className={styles.dateLabel}>Completada:</span> {task.completedAt}
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={() => onDeleteTask(task.id)}
            className={styles.deleteButton}
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;