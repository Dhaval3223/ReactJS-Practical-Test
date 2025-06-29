import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Box, TextField, Button, MenuItem
} from '@mui/material'
import type { Project } from './types'
import { PROJECT_STATUS_OPTIONS } from '../../constants/enums'

const schema = yup.object({
  customer: yup.string().required('Customer is required'),
  refNumber: yup.string().required('Reference Number is required'),
  projectName: yup.string().required('Project Name is required'),
  projectNumber: yup.string().required('Project Number is required'),
  manager: yup.string().required('Manager is required'),
  areaLocation: yup.string().required('Area Location is required'),
  address: yup.string().required('Address is required'),
  dueDate: yup.string().required('Due Date is required'),
  contact: yup.string().required('Contact is required'),
  staff: yup.string().required('Staff is required'),
  status: yup.string().required('Status is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
})

type ProjectFormInputs = yup.InferType<typeof schema>

interface ProjectFormProps {
  initialValues?: Partial<Project>
  onSubmit: (values: ProjectFormInputs) => void
  onCancel: () => void
  loading?: boolean
  submitText?: string
}

export default function ProjectForm({ initialValues = {}, onSubmit, onCancel, loading, submitText }: ProjectFormProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<ProjectFormInputs>({
    defaultValues: initialValues as ProjectFormInputs,
    resolver: yupResolver(schema),
  })

  // Determine if this is edit mode based on whether initialValues has an id
  const isEditMode = !!initialValues.id
  const defaultSubmitText = isEditMode ? 'Update Project' : 'Add Project'

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexWrap="wrap" gap={2}>
        <Box flex={1} minWidth={220}>
          <Controller name="customer" control={control} render={({ field }) => (
            <TextField {...field} label="Customer" fullWidth error={!!errors.customer} helperText={errors.customer?.message} />
          )} />
        </Box>
        <Box flex={1} minWidth={220}>
          <Controller name="refNumber" control={control} render={({ field }) => (
            <TextField {...field} label="Reference Number" fullWidth error={!!errors.refNumber} helperText={errors.refNumber?.message} />
          )} />
        </Box>
        <Box flex={1} minWidth={220}>
          <Controller name="projectName" control={control} render={({ field }) => (
            <TextField {...field} label="Project Name" fullWidth error={!!errors.projectName} helperText={errors.projectName?.message} />
          )} />
        </Box>
        <Box flex={1} minWidth={220}>
          <Controller name="projectNumber" control={control} render={({ field }) => (
            <TextField {...field} label="Project Number" fullWidth error={!!errors.projectNumber} helperText={errors.projectNumber?.message} />
          )} />
        </Box>
        <Box flex={1} minWidth={220}>
          <Controller name="manager" control={control} render={({ field }) => (
            <TextField {...field} label="Manager" fullWidth error={!!errors.manager} helperText={errors.manager?.message} />
          )} />
        </Box>
        <Box flex={1} minWidth={220}>
          <Controller name="areaLocation" control={control} render={({ field }) => (
            <TextField {...field} label="Area Location" fullWidth error={!!errors.areaLocation} helperText={errors.areaLocation?.message} />
          )} />
        </Box>
        <Box flex={1} minWidth={220}>
          <Controller name="address" control={control} render={({ field }) => (
            <TextField {...field} label="Address" fullWidth error={!!errors.address} helperText={errors.address?.message} />
          )} />
        </Box>
        <Box flex={1} minWidth={220}>
          <Controller name="dueDate" control={control} render={({ field }) => (
            <TextField {...field} label="Due Date" type="date" fullWidth InputLabelProps={{ shrink: true }} error={!!errors.dueDate} helperText={errors.dueDate?.message} />
          )} />
        </Box>
        <Box flex={1} minWidth={220}>
          <Controller name="contact" control={control} render={({ field }) => (
            <TextField {...field} label="Contact" fullWidth error={!!errors.contact} helperText={errors.contact?.message} />
          )} />
        </Box>
        <Box flex={1} minWidth={220}>
          <Controller name="staff" control={control} render={({ field }) => (
            <TextField {...field} label="Staff" fullWidth error={!!errors.staff} helperText={errors.staff?.message} />
          )} />
        </Box>
        <Box flex={1} minWidth={220}>
          <Controller name="status" control={control} render={({ field }) => (
            <TextField {...field} label="Status" select fullWidth error={!!errors.status} helperText={errors.status?.message} >
              {PROJECT_STATUS_OPTIONS.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
          )} />
        </Box>
        <Box flex={1} minWidth={220}>
          <Controller name="email" control={control} render={({ field }) => (
            <TextField {...field} label="Email" fullWidth error={!!errors.email} helperText={errors.email?.message} />
          )} />
        </Box>
      </Box>
      <Box display="flex" gap={2} mt={4}>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>{submitText || defaultSubmitText}</Button>
        <Button onClick={onCancel} variant="outlined" color="primary">Cancel</Button>
      </Box>
    </form>
  )
} 