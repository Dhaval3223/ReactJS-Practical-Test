# Software Co. Admin Panel

A modern, feature-rich admin panel built with React, TypeScript, and Material-UI for managing projects and estimations.

## 🚀 Project Overview

This is a comprehensive admin panel application designed for software companies to manage their projects and client estimations. The application features a modern, responsive design with dark/light mode support, internationalization, and a robust state management system.

### Key Features
- **Project Management**: Full CRUD operations for projects with advanced filtering and search
- **Estimation System**: Create and manage detailed client estimations with sections and line items
- **Authentication**: Secure login/register system with protected routes
- **Internationalization**: Multi-language support (English & Spanish)
- **Dark/Light Mode**: Theme switching with system preference detection
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Mock API**: JSON Server integration for development and testing

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI Framework**: Material-UI (MUI) v7
- **State Management**: Redux Toolkit + Redux Saga
- **Routing**: React Router DOM v7
- **Forms**: React Hook Form + Yup validation
- **Internationalization**: i18next + react-i18next
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Mock API**: JSON Server

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd software-co-adminpanel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Start the mock API server** (in a separate terminal)
   ```bash
   npm run mock-api
   ```

The application will be available at `http://localhost:5173` and the mock API at `http://localhost:3001`.

## 🏃‍♂️ Running the Project

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run mock-api` - Start JSON Server

## 🔧 Mock API Setup

The project uses JSON Server to provide a mock API for development. The setup is already configured and ready to use.

### Starting the Mock API
```bash
npm run mock-api
```

This starts JSON Server on `http://localhost:3001` and watches the `db.json` file for changes.

### API Endpoints

#### Projects
- `GET /projects` - Get all projects (supports pagination and filtering)
- `POST /projects` - Create a new project
- `PATCH /projects/:id` - Update a project
- `DELETE /projects/:id` - Delete a project

#### Estimations
- `GET /estimations` - Get all estimations
- `POST /estimations` - Create a new estimation
- `PATCH /estimations/:id` - Update an estimation
- `DELETE /estimations/:id` - Delete an estimation

### Query Parameters
- `_page` - Page number for pagination
- `_limit` - Number of items per page
- `q` - Search query
- `status` - Filter by status
- `dueDate_gte` - Filter by due date (greater than or equal)
- `dueDate_lte` - Filter by due date (less than or equal)

## 📁 Project Structure

```
src/
├── assets/                 # Static assets (images, icons)
├── components/            # Reusable UI components
│   ├── Layout/           # Layout components (Navbar, Sidebar, MainLayout)
│   ├── Dashboard/        # Dashboard-specific components
│   │   ├── types.ts      # TypeScript interfaces
│   │   ├── projectSlice.ts # Redux slice
│   │   ├── mockApi.ts    # API functions
│   │   ├── ProjectForm.tsx # Project form component
│   │   ├── ProjectTable.tsx # Project table component
│   │   └── ProjectFilterBar.tsx # Filter component
│   └── estimations/      # Estimation management feature
├── helpers/              # Utility functions and helpers
├── i18n/                 # Internationalization
│   ├── index.ts          # i18n configuration
│   ├── en.json           # English translations
│   └── es.json           # Spanish translations
├── pages/                # Page components
│   ├── Login.tsx         # Login page
│   ├── Register.tsx      # Registration page
│   ├── Dashboard.tsx     # Dashboard page
│   ├── Projects.tsx      # Projects list page
│   ├── ProjectCreate.tsx # Create project page
│   ├── ProjectEdit.tsx   # Edit project page
│   ├── Estimations.tsx   # Estimations list page
│   ├── EstimationCreate.tsx # Create estimation page
│   └── EstimationEdit.tsx   # Edit estimation page
├── redux/                # Redux store configuration
├── routes/               # Routing configuration
│   ├── index.tsx         # Main router setup
│   └── ProtectedRoute.tsx # Route protection component
├── utils/                # Utility functions
├── App.tsx               # Main App component
├── main.tsx              # Application entry point
└── index.css             # Global styles
```

## ✨ Implemented Features

### 🔐 Authentication & Authorization
- User registration and login
- Protected routes with authentication guards
- Password reset functionality
- Session management

### 📊 Dashboard
- Overview statistics and metrics
- Recent projects and estimations
- Quick action buttons
- Responsive layout with charts

### 📋 Project Management
- **CRUD Operations**: Create, read, update, and delete projects
- **Advanced Filtering**: Filter by status, date range, and search terms
- **Pagination**: Server-side pagination with configurable page sizes
- **Search**: Real-time search across customer and project names
- **Status Management**: Track project status (Pending, In Progress, Completed)
- **Data Export**: Export project data

### 💰 Estimation System
- **Detailed Estimations**: Create comprehensive client estimations
- **Section-based Structure**: Organize estimations into logical sections
- **Line Items**: Add individual items with quantities, prices, and margins
- **Calculations**: Automatic total calculations with margins
- **Template System**: Reusable estimation templates

### 🌍 Internationalization (i18n)
- Multi-language support (English & Spanish)
- Automatic language detection
- Language persistence in localStorage
- Easy language switching via UI

### 🎨 Theme System
- Dark and light mode support
- System preference detection
- Theme persistence
- Smooth theme transitions

### 📱 Responsive Design
- Mobile-first approach
- Responsive navigation
- Adaptive layouts
- Touch-friendly interfaces

### 🔄 State Management
- Redux Toolkit for predictable state management
- Redux Saga for side effects
- Optimistic updates
- Error handling and loading states

## 🏗️ Architecture & Design System

### Design Principles
- **Component-Based Architecture**: Modular, reusable components
- **Feature-Based Organization**: Code organized by business features
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized rendering and state updates
- **Accessibility**: WCAG compliant components

### Material-UI Integration
- **Custom Theme**: Extended Material-UI theme with custom colors and typography
- **Component Library**: Consistent UI components following Material Design
- **Responsive Breakpoints**: Mobile-first responsive design
- **Icon System**: Material Icons integration

### State Management Architecture
```
Redux Store Structure:
├── projects/
│   ├── items: Project[]
│   ├── total: number
│   ├── page: number
│   ├── filters: ProjectFilters
│   ├── loading: boolean
│   └── error: string | null
├── estimations/
│   ├── items: Estimation[]
│   ├── loading: boolean
│   └── error: string | null
└── auth/
    ├── user: User | null
    ├── isAuthenticated: boolean
    └── loading: boolean
```

### API Layer
- **Axios Integration**: HTTP client with interceptors
- **Error Handling**: Centralized error handling
- **Loading States**: Consistent loading indicators
- **Mock API**: JSON Server for development

## 🌐 Internationalization (i18n) Guide

### Supported Languages
- **English (en)** - Default language
- **Spanish (es)** - Secondary language

### Switching Languages

#### Via UI
1. Click the language icon (🌐) in the top navigation bar
2. Select your preferred language from the dropdown menu
3. The application will immediately switch to the selected language

#### Programmatically
```typescript
import { useTranslation } from 'react-i18next'

const { i18n } = useTranslation()

// Switch to Spanish
i18n.changeLanguage('es')

// Switch to English
i18n.changeLanguage('en')
```

### Adding New Languages

1. **Create translation file** in `src/i18n/`
   ```json
   // fr.json
   {
     "common": {
       "language": "Langue",
       "save": "Enregistrer",
       "cancel": "Annuler"
     }
   }
   ```

2. **Update i18n configuration** in `src/i18n/index.ts`
   ```typescript
   import fr from './fr.json'
   
   const resources = {
     en: { translation: en },
     es: { translation: es },
     fr: { translation: fr }  // Add new language
   }
   ```

3. **Add language to selector** in `src/components/LanguageSelector.tsx`
   ```typescript
   const languages = [
     { code: 'en', name: 'English', flag: '🇺🇸' },
     { code: 'es', name: 'Español', flag: '🇪🇸' },
     { code: 'fr', name: 'Français', flag: '🇫🇷' }  // Add new language
   ]
   ```

### Translation Keys Structure
```json
{
  "common": {
    "language": "Language",
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "create": "Create"
  },
  "auth": {
    "login": "Login",
    "register": "Register",
    "email": "Email",
    "password": "Password"
  },
  "projects": {
    "title": "Projects",
    "create": "Create Project",
    "edit": "Edit Project",
    "customer": "Customer",
    "projectName": "Project Name"
  }
}
```

## 📸 Screenshots

*Note: Screenshots would be added here to showcase the application's UI and features. Since I cannot generate images, you would need to add screenshots of:*

- Login/Register pages
- Dashboard overview
- Projects list with filters
- Project creation/edit forms
- Estimations interface
- Dark/Light mode examples
- Mobile responsive views

## 🚀 Getting Started

1. **Clone and install** (see Installation section above)
2. **Start both servers**:
   ```bash
   # Terminal 1 - Development server
   npm run dev
   
   # Terminal 2 - Mock API server
   npm run mock-api
   ```
3. **Open your browser** to `http://localhost:5173`
4. **Register a new account** or use the mock data
5. **Explore the features** and start managing your projects!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include steps to reproduce the problem
4. Provide your environment details (OS, Node.js version, etc.)

---

**Built with ❤️ using React, TypeScript, and Material-UI**
