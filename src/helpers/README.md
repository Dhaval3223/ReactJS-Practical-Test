# Helpers

This folder contains business logic helpers for specific features and operations.

## Structure

- `estimationHelpers.ts` - Estimation-specific business logic
- `projectHelpers.ts` - Project-specific business logic
- `index.ts` - Export all helper functions

## Usage

```typescript
import { 
  transformFormToEstimation, 
  getEstimationTotal,
  filterProjectsBySearch 
} from '../helpers'

// Transform form data to estimation
const estimation = transformFormToEstimation(formData)

// Get estimation total
const total = getEstimationTotal(estimation)

// Filter projects
const filteredProjects = filterProjectsBySearch(projects, searchTerm)
```

## Estimation Helpers

- `transformFormToEstimation(formData)` - Transform form data to Estimation type
- `getEstimationItemTotal(item)` - Calculate total for single estimation item
- `getEstimationTotal(estimation)` - Calculate total for entire estimation
- `generateEstimationId(prefix)` - Generate unique ID for estimation items

## Project Helpers

- `filterProjectsBySearch(projects, search)` - Filter projects by search criteria
- `filterProjectsByStatus(projects, statuses)` - Filter projects by status
- `sortProjects(projects, field, direction)` - Sort projects by field
- `getProjectStatusColor(status)` - Get color for project status 