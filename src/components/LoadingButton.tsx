import { Button, CircularProgress } from '@mui/material'
import type { ButtonProps } from '@mui/material'

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
  loadingText?: string
}

export default function LoadingButton({ 
  loading = false, 
  loadingText = 'Loading...', 
  children, 
  disabled, 
  ...props 
}: LoadingButtonProps) {
  return (
    <Button
      {...props}
      disabled={loading || disabled}
      sx={{ mt: 2, ...props.sx }}
    >
      {loading ? (
        <>
          <CircularProgress size={24} sx={{ mr: 1 }} />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  )
} 