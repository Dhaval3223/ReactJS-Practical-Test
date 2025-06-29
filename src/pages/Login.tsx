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
import bgImage from '../assets/bg.png'
import shadeImage from '../assets/shade.png'

export default function Login() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const schema = yup.object({
    email: yup.string().email(t('auth.invalidEmail')).required(t('auth.emailRequired')),
    password: yup.string().min(6, t('auth.passwordMinLength')).required(t('auth.passwordRequired')),
  })

  type LoginFormInputs = yup.InferType<typeof schema>

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<LoginFormInputs> = async () => {
    setLoading(true)
    setTimeout(() => {
      dispatch(login('mock-token'))
      setLoading(false)
      navigate('/dashboard')
    }, 1200)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${shadeImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
        }
      }}
      width="100vw"
    >
      <Box
        width={630}
        p={4}
        boxShadow={3}
        borderRadius={2}
        sx={{
          backgroundColor: 'white',
          zIndex: 2,
          position: 'relative',
        }}
      >
        <Typography variant="h4" align="center" fontWeight={600} mb={1}>
          {t('auth.login') + ' to Account'}
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" mb={3}>
          Please enter your email and password to continue
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box mb={2}>
            <Typography variant="body1" fontWeight={500} mb={1}>
              Email address:
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{ style: { background: '#f7f8fa' } }}
            />
          </Box>
          <Box mb={1} display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="body1" fontWeight={500}>
              Password
            </Typography>
            <Button size="small" sx={{ textTransform: 'none' }} onClick={() => navigate('/forgot-password')}>
              Forget Password?
            </Button>
          </Box>
          <TextField
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{ style: { background: '#f7f8fa' } }}
          />
          <Box display="flex" alignItems="center" mb={2}>
            <input type="checkbox" id="remember" style={{ marginRight: 8 }} />
            <label htmlFor="remember" style={{ fontSize: 15, color: '#666' }}>Remember Password</label>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 1, mb: 2, fontWeight: 600, fontSize: 18, height: 48 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </form>
        <Typography align="center" mt={2}>
          Don't have an account?{' '}
          <Button variant="text" sx={{ p: 0, minWidth: 0 }} onClick={() => navigate('/register')}>
            Create Account
          </Button>
        </Typography>
      </Box>
    </Box>
  )
} 