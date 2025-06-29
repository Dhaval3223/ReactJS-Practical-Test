import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, CircularProgress } from '@mui/material'
import type { ReactNode } from 'react'

interface ConfirmDialogProps {
  open: boolean
  title?: string
  content?: ReactNode
  onClose: () => void
  onConfirm: () => void
  confirmText?: string
  cancelText?: string
  loading?: boolean
}

export default function ConfirmDialog({ 
  open, 
  title = 'Confirm', 
  content, 
  onClose, 
  onConfirm, 
  confirmText = 'Delete', 
  cancelText = 'Cancel',
  loading = false 
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>{cancelText}</Button>
        <Button 
          onClick={onConfirm} 
          color="error" 
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} /> : undefined}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
} 