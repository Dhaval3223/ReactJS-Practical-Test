import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import type { ReactNode } from 'react'

interface ConfirmDialogProps {
  open: boolean
  title?: string
  content?: ReactNode
  onClose: () => void
  onConfirm: () => void
  confirmText?: string
  cancelText?: string
}

export default function ConfirmDialog({ open, title = 'Confirm', content, onClose, onConfirm, confirmText = 'Delete', cancelText = 'Cancel' }: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button onClick={onConfirm} color="error" variant="contained">{confirmText}</Button>
      </DialogActions>
    </Dialog>
  )
} 