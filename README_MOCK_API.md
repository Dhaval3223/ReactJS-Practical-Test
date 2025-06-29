# Mock API Implementation for Project Module

This document describes the mock API implementation for the project module using JSON Server and Redux Toolkit.

## Overview

The project module now uses a mock API that stores data in `db.json` and communicates via HTTP requests to a JSON Server running on port 3001.

## Setup

### 1. Install Dependencies

The following dependencies have been added to the project:

```bash
npm install redux-saga @types/redux-saga json-server
```

### 2. Start the Mock API Server

To start the JSON Server that serves the mock API:

```bash
npm run mock-api
```

This will start the server on `http://localhost:3001` and watch the `db.json` file for changes.

### 3. Start the Development Server

In a separate terminal, start the React development server:

```bash
npm run dev
```

## API Endpoints

The mock API provides the following endpoints:

### Projects

- **GET** `/projects` - Get all projects (supports pagination and filtering)
- **POST** `/projects` - Create a new project
- **PATCH** `/projects/:id` - Update a project
- **DELETE** `/projects/:id` - Delete a project

### Query Parameters

- `_page` - Page number for pagination
- `_limit` - Number of items per page
- `q` - Search query (searches in customer and project name)
- `status` - Filter by status
- `dueDate_gte` - Filter by due date (greater than or equal)
- `dueDate_lte` - Filter by due date (less than or equal)

## Data Structure

Projects are stored in `db.json` with the following structure:

```json
{
  "projects": [
    {
      "id": "string",
      "customer": "string",
      "refNumber": "string",
      "projectName": "string",
      "projectNumber": "string",
      "manager": "string",
      "areaLocation": "string",
      "address": "string",
      "dueDate": "string (YYYY-MM-DD)",
      "contact": "string",
      "staff": "string",
      "status": "string",
      "email": "string"
    }
  ]
}
```

## Redux State Management

The project module uses Redux Toolkit with the following state structure:

```typescript
interface ProjectState {
  items: Project[]
  total: number
  page: number
  pageSize: number
  filters: ProjectFilters
  loading: boolean
  error: string | null
  selected?: Project | null
  createLoading: boolean
  updateLoading: boolean
  deleteLoading: boolean
}
```

### Actions

- `fetchProjects()` - Fetch projects with pagination and filtering
- `createProject(project)` - Create a new project
- `updateProject({ id, project })` - Update an existing project
- `deleteProject(id)` - Delete a project
- `setPage(page)` - Set current page
- `setPageSize(pageSize)` - Set page size
- `setFilters(filters)` - Set filters
- `setSelected(project)` - Set selected project
- `clearError()` - Clear error state

## Features

### 1. CRUD Operations
- ✅ Create new projects
- ✅ Read projects with pagination and filtering
- ✅ Update existing projects
- ✅ Delete projects

### 2. Filtering and Search
- ✅ Search by customer name or project name
- ✅ Filter by status
- ✅ Filter by date range
- ✅ Hide/show table columns

### 3. Pagination
- ✅ Server-side pagination
- ✅ Configurable page size
- ✅ Total count tracking

### 4. Error Handling
- ✅ Network error handling
- ✅ User-friendly error messages
- ✅ Loading states for all operations

### 5. Loading States
- ✅ Separate loading states for create, update, and delete operations
- ✅ Loading indicators in UI components
- ✅ Disabled buttons during operations

## Usage Examples

### Creating a Project

```typescript
const newProject = {
  customer: "John Doe",
  refNumber: "REF123",
  projectName: "New Project",
  projectNumber: "NP001",
  manager: "Jane Smith",
  areaLocation: "New York",
  address: "123 Main St",
  dueDate: "2024-12-31",
  contact: "1234567890",
  staff: "Team A",
  status: "Pending",
  email: "john@example.com"
}

dispatch(createProject(newProject))
```

### Fetching Projects with Filters

```typescript
dispatch(setFilters({
  search: "John",
  status: ["Pending", "In Progress"],
  date: ["2024-01-01", "2024-12-31"]
}))
```

### Updating a Project

```typescript
dispatch(updateProject({
  id: "project-id",
  project: { status: "Completed" }
}))
```

### Deleting a Project

```typescript
dispatch(deleteProject("project-id"))
```

## File Structure

```
src/
├── features/
│   └── projects/
│       ├── types.ts              # TypeScript interfaces
│       ├── projectSlice.ts       # Redux Toolkit slice
│       ├── mockApi.ts            # API functions using axios
│       ├── ProjectForm.tsx       # Form component
│       ├── ProjectTable.tsx      # Table component
│       └── ProjectFilterBar.tsx  # Filter component
├── pages/
│   ├── Projects.tsx              # Projects list page
│   ├── ProjectCreate.tsx         # Create project page
│   └── ProjectEdit.tsx           # Edit project page
└── components/
    └── ConfirmDialog.tsx         # Confirmation dialog (updated)
```

## Notes

- The mock API uses JSON Server which automatically generates IDs for new projects
- All data is persisted in `db.json` and survives server restarts
- The API supports real-time updates - changes in `db.json` are immediately reflected
- Error handling includes network errors and validation errors
- Loading states provide good user experience during async operations

## Troubleshooting

1. **JSON Server not starting**: Make sure port 3001 is not in use
2. **CORS errors**: JSON Server handles CORS automatically
3. **Data not persisting**: Check that `db.json` is writable
4. **API calls failing**: Ensure JSON Server is running on `http://localhost:3001` 