import { TextField } from '@mui/material'
import type { TextFieldProps } from '@mui/material'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface FormFieldProps extends Omit<TextFieldProps, 'error' | 'helperText'> {
  register: UseFormRegisterReturn
  error?: string
}

export default function FormField({ register, error, ...props }: FormFieldProps) {
  return (
    <TextField
      {...register}
      {...props}
      error={!!error}
      helperText={error}
      fullWidth
      margin="normal"
    />
  )
} 