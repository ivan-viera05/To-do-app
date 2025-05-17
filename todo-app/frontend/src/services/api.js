const API_URL = 'http://localhost:5000/api/tareas';

export const getTasks = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al obtener las tareas');
  }
  return response.json();
};

export const createTask = async (task) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Error al crear la tarea');
  }
  return response.json();
};

export const updateTask = async (id, task) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar la tarea');
  }
  return response.json();
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error al eliminar la tarea');
  }
};