import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TextField, Button, Box, Typography, CircularProgress, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function ForgotPassword() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const schema = yup.object({
    email: yup.string().email(t('auth.invalidEmail')).required(t('auth.emailRequired')),
  })

  type ForgotFormInputs = yup.InferType<typeof schema>

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotFormInputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<ForgotFormInputs> = async () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1200)
  }

  return (
    <Box maxWidth={400} mx="auto" mt={8} p={4} boxShadow={3} borderRadius={2}>
      <Typography variant="h5" mb={2}>{t('auth.resetPassword')}</Typography>
      {success && <Alert severity="success" sx={{ mb: 2 }}>If this email exists, a reset link has been sent.</Alert>}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label={t('auth.email')}
          fullWidth
          margin="normal"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : t('auth.sendResetLink')}
        </Button>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button size="small" onClick={() => navigate('/login')}>{t('auth.backToLogin')}</Button>
        </Box>
      </form>
    </Box>
  )
} 