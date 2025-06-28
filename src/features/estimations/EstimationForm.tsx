import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Box, TextField, Button, IconButton, Typography, Paper, Divider, InputAdornment
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Estimation, EstimationItem } from './types'
import { useMemo } from 'react'
import { formatCurrency } from '../../utils/currency'
import { calculateItemTotal } from '../../utils/calculations'

// Define the form input type so that 'sections' is always required
export interface EstimationFormInputs {
  name: string;
  customer: string;
  date: string;
  sections: {
    title: string;
    items: {
      title: string;
      description?: string;
      unit: string;
      quantity: number;
      price: number;
      margin: number;
    }[];
  }[];
}

const schema: yup.ObjectSchema<EstimationFormInputs> = yup.object({
  name: yup.string().required('Name is required'),
  customer: yup.string().required('Customer is required'),
  date: yup.string().required('Date is required'),
  sections: yup.array()
    .of(
      yup.object({
        title: yup.string().required('Section title is required'),
        items: yup.array()
          .of(
            yup.object({
              title: yup.string().required('Item title is required'),
              description: yup.string(),
              unit: yup.string().required('Unit is required'),
              quantity: yup.number().required('Quantity is required').min(0),
              price: yup.number().required('Price is required').min(0),
              margin: yup.number().required('Margin is required').min(0),
            })
          )
          .min(1, 'At least one item is required')
          .required('Items are required'),
      })
    )
    .min(1, 'At least one section is required')
    .required('Sections are required'),
})

interface EstimationFormProps {
  initialValues?: Partial<Estimation>
  onSubmit: (values: EstimationFormInputs) => void
  onCancel: () => void
  loading?: boolean
}

export default function EstimationForm({ initialValues = {}, onSubmit, onCancel, loading }: EstimationFormProps) {
  // Always provide at least one section and one item for default values
  const defaultValues = useMemo(() => {
    if (initialValues && initialValues.sections && initialValues.sections.length > 0) {
      return initialValues as EstimationFormInputs
    }
    return {
      name: '',
      customer: '',
      date: '',
      sections: [
        {
          title: '',
          items: [
            { title: '', description: '', unit: '', quantity: 1, price: 0, margin: 0 },
          ],
        },
      ],
    }
  }, [initialValues])

  const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm<EstimationFormInputs>({
    defaultValues: defaultValues as EstimationFormInputs,
    resolver: yupResolver(schema),
  })
  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({ control, name: 'sections' })

  // Helper to add/remove items in a section
  const addItem = (sectionIdx: number) => {
    const items = (getValues(`sections.${sectionIdx}.items`) ?? []) as EstimationItem[]
    setValue(`sections.${sectionIdx}.items`, [
      ...items,
      { title: '', description: '', unit: '', quantity: 1, price: 0, margin: 0 },
    ])
  }
  const removeItem = (sectionIdx: number, itemIdx: number) => {
    const items = (getValues(`sections.${sectionIdx}.items`) ?? []) as EstimationItem[]
    setValue(`sections.${sectionIdx}.items`, items.filter((_, idx) => idx !== itemIdx))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" gap={2} mb={2}>
        <Controller name="name" control={control} render={({ field }) => (
          <TextField {...field} label="Estimation Name" fullWidth error={!!errors.name} helperText={errors.name?.message} />
        )} />
        <Controller name="customer" control={control} render={({ field }) => (
          <TextField {...field} label="Customer" fullWidth error={!!errors.customer} helperText={errors.customer?.message} />
        )} />
        <Controller name="date" control={control} render={({ field }) => (
          <TextField {...field} label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }} error={!!errors.date} helperText={errors.date?.message} />
        )} />
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" mb={1}>Sections</Typography>
      {sectionFields.map((section, sectionIdx) => {
        const sectionError = errors.sections?.[sectionIdx]
        const items = (getValues(`sections.${sectionIdx}.items`) ?? []) as EstimationItem[]
        return (
          <Paper key={section.id} sx={{ mb: 3, p: 2, position: 'relative' }}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Controller name={`sections.${sectionIdx}.title`} control={control} render={({ field }) => (
                <TextField {...field} label="Section Title" fullWidth error={!!sectionError?.title} helperText={sectionError?.title?.message} />
              )} />
              <IconButton onClick={() => removeSection(sectionIdx)} color="error" sx={{ mt: 1 }}><DeleteIcon /></IconButton>
            </Box>
            <Typography variant="subtitle1" mb={1}>Items</Typography>
            {items.map((item, itemIdx) => {
              const itemError = sectionError?.items?.[itemIdx]
              return (
                <Box key={itemIdx} display="flex" gap={2} mb={2} alignItems="flex-end">
                  <Controller name={`sections.${sectionIdx}.items.${itemIdx}.title`} control={control} render={({ field }) => (
                    <TextField {...field} label="Title" fullWidth error={!!itemError?.title} helperText={itemError?.title?.message} />
                  )} />
                  <Controller name={`sections.${sectionIdx}.items.${itemIdx}.description`} control={control} render={({ field }) => (
                    <TextField {...field} label="Description" fullWidth error={!!itemError?.description} helperText={itemError?.description?.message} />
                  )} />
                  <Controller name={`sections.${sectionIdx}.items.${itemIdx}.unit`} control={control} render={({ field }) => (
                    <TextField {...field} label="Unit" fullWidth error={!!itemError?.unit} helperText={itemError?.unit?.message} />
                  )} />
                  <Controller name={`sections.${sectionIdx}.items.${itemIdx}.quantity`} control={control} render={({ field }) => (
                    <TextField {...field} label="Qty" type="number" fullWidth error={!!itemError?.quantity} helperText={itemError?.quantity?.message} />
                  )} />
                  <Controller name={`sections.${sectionIdx}.items.${itemIdx}.price`} control={control} render={({ field }) => (
                    <TextField {...field} label="Price" type="number" fullWidth error={!!itemError?.price} helperText={itemError?.price?.message} />
                  )} />
                  <Controller name={`sections.${sectionIdx}.items.${itemIdx}.margin`} control={control} render={({ field }) => (
                    <TextField {...field} label="Margin %" type="number" fullWidth error={!!itemError?.margin} helperText={itemError?.margin?.message} />
                  )} />
                  <TextField
                    label="Total"
                    value={formatCurrency(calculateItemTotal(item.quantity, item.price, item.margin))}
                    InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                    fullWidth
                  />
                  <IconButton onClick={() => removeItem(sectionIdx, itemIdx)} color="error"><RemoveIcon /></IconButton>
                </Box>
              )
            })}
            <Button startIcon={<AddIcon />} onClick={() => addItem(sectionIdx)} sx={{ mt: 1 }}>
              Add Item
            </Button>
            {sectionError?.items && typeof sectionError.items?.message === 'string' && (
              <Typography color="error" variant="caption">{sectionError.items.message}</Typography>
            )}
          </Paper>
        )
      })}
      <Button startIcon={<AddIcon />} onClick={() => appendSection({ title: '', items: [{ title: '', description: '', unit: '', quantity: 1, price: 0, margin: 0 }] })}>
        Add Section
      </Button>
      {typeof errors.sections?.message === 'string' && (
        <Typography color="error" variant="caption">{errors.sections.message}</Typography>
      )}
      <Box display="flex" gap={2} mt={4}>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>Save</Button>
        <Button onClick={onCancel} variant="outlined" color="primary">Cancel</Button>
      </Box>
    </form>
  )
} 