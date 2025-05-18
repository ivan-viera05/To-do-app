# Aplicación de Lista de Tareas (Todo App)

Una aplicación web full-stack para gestionar tareas con diferentes prioridades, construida con React en el frontend y Node.js/Express en el backend.

## Características

- ✨ Crear, actualizar y eliminar tareas
- 🎨 Asignar prioridades (Alta, Normal, Baja)
- ✅ Marcar tareas como completadas
- 🔍 Filtrar tareas por estado y prioridad
- 📱 Diseño responsive
- 📊 Resumen de tareas totales y completadas

## Prerequisitos

- Node.js (v14 o superior)
- npm (incluido con Node.js)
- Visual Studio Code

## Estructura del Proyecto


├── backend/ # Servidor Express
└── frontend/ # Aplicación React

## 🛠️ Instalación y Ejecución

### Backend

1. Navegar al directorio del backend:

```bash
cd backend
```
## instalar dependecias:

```bash
npm install
```

## Iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

## El servidor estará disponible en http://localhost:5000

## Frontend
## Navegar al directorio del frontend:

```bash
cd frontend
npm install
npm start
```
## La aplicación estará disponible en http://localhost:3000

## API Endpoints

GET /api/tareas - Obtener todas las tareas
POST /api/tareas - Crear una nueva tarea
PUT /api/tareas/:id - Actualizar una tarea
DELETE /api/tareas/:id - Eliminar una tarea
