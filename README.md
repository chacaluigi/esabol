SISTEMA PARA EL CONTROL DE TRABAJO DIARIO

TaskFlow Manager
Una aplicación de gestión de tareas tipo Kanban de alto rendimiento, construida con un enfoque en Zero-Latency UX y una arquitectura escalable de Micro-features.

Características Principales
Gestión de Usuarios (Admin Module)
CRUD Completo: Control total sobre el ciclo de vida de los usuarios.

Paginación Persistente: Sincronización automática de página y límite de filas con la URL.

Búsqueda Dinámica: Filtrado en tiempo real con Debouncing para optimizar las peticiones al servidor.

Sistema de Roles: Visualización mediante Badges temáticos (Admin, Editor, User).

Feedback Visual: Implementación de Skeletons para cargas iniciales y Sonner para notificaciones estéticas.

Tablero Kanban (Trello Style)
Drag & Drop Nativo: Interfaz intuitiva basada en la API de HTML5 (ligera y rápida).

Optimistic UI: Las tareas cambian de estado instantáneamente en la interfaz mientras la persistencia ocurre en segundo plano.

Asignación Múltiple: Soporte para asignar varios miembros del equipo a una sola tarea con visualización de avatares solapados.

Gestión de Estados: Tres columnas core: To do, Doing y Done.

Control de Prioridades: Clasificación visual por niveles de urgencia (High, Medium, Low).

Tech Stack
Frontend:

React 18 (Vite)

Tailwind CSS (Estilizado)

Shadcn UI (Componentes de alta calidad)

Zustand (Gestión de estado global ligera)

Lucide React (Iconografía)

Axios (Cliente HTTP)

Backend:

Node.js & Express

Sequelize ORM (Modelado de datos)

PostgreSQL / MySQL (Persistencia)

Instalación y Configuración
Prerrequisitos
Node.js (v18+)

Entorno de desarrollo recomendado: WSL2 (Ubuntu 24.04) en Windows 11.

Pasos
Clonar el repositorio:

Bash
git clone https://github.com/tu-usuario/taskflow-manager.git
cd taskflow-manager
Configuración del Backend:

Bash
cd backend
npm install

# Configura tu .env con las credenciales de la DB

npm run dev
Configuración del Frontend:

Bash
cd frontend
npm install
npm run dev
🏗 Arquitectura del Proyecto
El proyecto sigue un patrón de Feature-Based Folder Structure para facilitar el mantenimiento:

Plaintext
src/
├── api/ # Configuración base de Axios
├── components/ # Componentes globales de Shadcn (ui/)
├── features/ # Módulos de la aplicación
│ ├── users/ # Hooks, Stores y Componentes de Usuarios
│ └── tasks/ # Lógica del Tablero Kanban y Modales
├── hooks/ # Hooks globales (useDebounce, etc.)
├── pages/ # Vistas principales (UserPage, TaskBoardPage)
└── services/ # Llamadas directas a la API

Desarrollo
Para mantener la calidad del código, se utilizan las siguientes herramientas:

Prettier: Formateo consistente de bloques de código.

Material Icon Theme: Organización visual de archivos en VS Code.

Proximas Mejoras (Roadmap)
[ ] Implementación de Zod para validación de esquemas en formularios.

[ ] Modo oscuro (Dark Mode) nativo con Shadcn/next-themes.

[ ] Exportación de reportes en formato Excel/CSV.

Generado con un toque de ingenio para un flujo de trabajo impecable. ⚡
