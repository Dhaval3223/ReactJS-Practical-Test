import { Box, Typography } from '@mui/material'
import type { BoxProps } from '@mui/material'
import type { ReactNode } from 'react'

interface FormContainerProps extends BoxProps {
  title: string
  children: ReactNode
}

export default function FormContainer({ title, children, ...props }: FormContainerProps) {
  return (
    <Box 
      maxWidth={400} 
      mx="auto" 
      mt={8} 
      p={4} 
      boxShadow={3} 
      borderRadius={2}
      {...props}
    >
      <Typography variant="h5" mb={2}>{title}</Typography>
      {children}
    </Box>
  )
} 