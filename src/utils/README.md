# Utils

This folder contains utility functions that are used across the application.

## Structure

- `currency.ts` - Currency formatting utilities
- `calculations.ts` - Mathematical calculation utilities
- `index.ts` - Export all utility functions

## Usage

```typescript
import { formatCurrency, calculateItemTotal } from '../utils'

// Format currency
const formattedAmount = formatCurrency(1234.56) // "$1,234.56"

// Calculate item total with margin
const total = calculateItemTotal(quantity, price, margin)
```

## Currency Utils

- `formatCurrency(amount: number)` - Format number as USD currency
- `formatCurrencyWithOptions(amount: number, options)` - Format with custom options
- `CURRENCY_CONFIG` - Default currency configuration

## Calculation Utils

- `calculateItemTotal(quantity, price, margin)` - Calculate item total with margin
- `calculateEstimationTotal(sections)` - Calculate total for entire estimation
- `calculatePercentage(value, total)` - Calculate percentage
- `roundToDecimals(value, decimals)` - Round to specified decimal places 