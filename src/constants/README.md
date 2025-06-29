# Constants

This folder contains reusable static values used throughout the application.

## Structure

- `routes.ts` - Application route definitions
- `enums.ts` - Status enums and application constants
- `columns.ts` - Table column definitions
- `index.ts` - Export all constants

## Usage

```typescript
import { ROUTES, PROJECT_STATUS_OPTIONS, PROJECT_COLUMNS } from '../constants'

// Use routes
navigate(ROUTES.DASHBOARD)

// Use status options
const statuses = PROJECT_STATUS_OPTIONS

// Use column definitions
const columns = PROJECT_COLUMNS
```

## Routes

- `ROUTES` - All application routes
- `PUBLIC_ROUTES` - Routes accessible without authentication
- `PROTECTED_ROUTES` - Routes requiring authentication

## Enums

- `PROJECT_STATUS` - Project status constants
- `PROJECT_STATUS_OPTIONS` - Array of project status options
- `ACTIVITY_STATUS` - Activity status constants
- `ACTIVITY_TYPE` - Activity type constants
- `PAGINATION` - Pagination default values

## Columns

- `PROJECT_COLUMNS` - Project table column definitions
- `ESTIMATION_COLUMNS` - Estimation table column definitions 