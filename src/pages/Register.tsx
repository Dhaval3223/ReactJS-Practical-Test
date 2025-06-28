import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { login } from '../redux/authSlice'

export default function Register() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const schema = yup.object({
    email: yup.string().email(t('auth.invalidEmail')).required(t('auth.emailRequired')),
    password: yup.string().min(6, t('auth.passwordMinLength')).required(t('auth.passwordRequired')),
    confirmPassword: yup.string().oneOf([yup.ref('password')], t('auth.passwordsDoNotMatch')).required(t('auth.passwordRequired')),
  })

  type RegisterFormInputs = yup.InferType<typeof schema>

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<RegisterFormInputs> = async () => {
    setLoading(true)
    setTimeout(() => {
      dispatch(login('mock-token'))
      setLoading(false)
      navigate('/dashboard')
    }, 1200)
  }

  return (
    <Box maxWidth={400} mx="auto" mt={8} p={4} boxShadow={3} borderRadius={2}>
      <Typography variant="h5" mb={2}>{t('auth.register')}</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label={t('auth.email')}
          fullWidth
          margin="normal"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label={t('auth.password')}
          type="password"
          fullWidth
          margin="normal"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label={t('auth.confirmPassword')}
          type="password"
          fullWidth
          margin="normal"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : t('auth.register')}
        </Button>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button size="small" onClick={() => navigate('/login')}>{t('auth.login')}</Button>
        </Box>
      </form>
    </Box>
  )
} 