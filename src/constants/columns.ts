/**
 * Table column definitions
 */

export const PROJECT_COLUMNS = [
  { key: 'customer', label: 'Customer' },
  { key: 'refNumber', label: 'Ref Number' },
  { key: 'projectName', label: 'Project Name' },
  { key: 'projectNumber', label: 'Project Number' },
  // { key: 'manager', label: 'Manager' },
  { key: 'areaLocation', label: 'Area Location' },
  { key: 'address', label: 'Address' },
  // { key: 'dueDate', label: 'Due Date' },
  // { key: 'contact', label: 'Contact' },
  // { key: 'staff', label: 'Staff' },
  // { key: 'status', label: 'Status' },
  // { key: 'email', label: 'Email' },
] as const

export const ESTIMATION_COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'customer', label: 'Customer' },
  { key: 'date', label: 'Date' },
  { key: 'total', label: 'Total' },
] as const 