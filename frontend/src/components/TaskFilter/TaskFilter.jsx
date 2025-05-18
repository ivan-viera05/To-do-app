import React from 'react';
import styles from './TaskFilter.module.css';

const TaskFilter = ({ onFilterChange, activeFilter }) => {
  return (
    <div className={styles.filterContainer}>
      <select 
        className={styles.filterSelect}
        value={activeFilter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="all">Todas las tareas</option>
        <option value="alta">🔴 Prioridad Alta</option>
        <option value="normal">🟡 Prioridad Normal</option>
        <option value="baja">🟢 Prioridad Baja</option>
        <option value="completed">✅ Completadas</option>
        <option value="pending">⏳ Pendientes</option>
      </select>
    </div>
  );
};

export default TaskFilter;