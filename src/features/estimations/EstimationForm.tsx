import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Box, TextField, Button, IconButton, Typography, Divider, InputAdornment
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Estimation } from './types'
import { useMemo } from 'react'
import { formatCurrency } from '../../utils/currency'
import { calculateItemTotal } from '../../utils/calculations'
import React from 'react'
import type { Control, FieldErrors } from 'react-hook-form'
import { useWatch } from 'react-hook-form'

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

// Child component for rendering items in a section
type SectionItemsFieldsProps = {
  sectionIdx: number;
  control: Control<EstimationFormInputs>;
  sectionError: FieldErrors<EstimationFormInputs['sections'][number]> | undefined;
};
function SectionItemsFields({ sectionIdx, control, sectionError }: SectionItemsFieldsProps) {
  const { fields: itemFields, append: appendItem, remove: removeItem } = useFieldArray({
    control,
    name: `sections.${sectionIdx}.items`
  })
  return (
    <>
      {itemFields.map((item, itemIdx) => {
        const itemError = sectionError?.items?.[itemIdx]
        return (
          <Box key={item.id || itemIdx} display="flex" alignItems="center" px={2} mb={1}>
            <Box width="16px" />
            <Box flex={2} px={1}>
              <Controller name={`sections.${sectionIdx}.items.${itemIdx}.title`} control={control} render={({ field }) => (
                <TextField {...field} label="Item Name" fullWidth error={!!itemError?.title} helperText={itemError?.title?.message} size="small" />
              )} />
            </Box>
            <Box flex={2} px={1}>
              <Controller name={`sections.${sectionIdx}.items.${itemIdx}.description`} control={control} render={({ field }) => (
                <TextField {...field} label="Item Description" fullWidth error={!!itemError?.description} helperText={itemError?.description?.message} size="small" />
              )} />
            </Box>
            <Box flex={1} px={1}>
              <Controller name={`sections.${sectionIdx}.items.${itemIdx}.unit`} control={control} render={({ field }) => (
                <TextField {...field} label="Unit" fullWidth error={!!itemError?.unit} helperText={itemError?.unit?.message} size="small" />
              )} />
            </Box>
            <Box flex={1} px={1}>
              <Controller name={`sections.${sectionIdx}.items.${itemIdx}.quantity`} control={control} render={({ field }) => (
                <TextField {...field} label="Quantity" type="number" fullWidth error={!!itemError?.quantity} helperText={itemError?.quantity?.message} size="small" />
              )} />
            </Box>
            <Box flex={1} px={1}>
              <Controller name={`sections.${sectionIdx}.items.${itemIdx}.price`} control={control} render={({ field }) => (
                <TextField {...field} label="Price" type="number" fullWidth error={!!itemError?.price} helperText={itemError?.price?.message} size="small" />
              )} />
            </Box>
            <Box flex={1} px={1}>
              <Controller name={`sections.${sectionIdx}.items.${itemIdx}.margin`} control={control} render={({ field }) => (
                <TextField {...field} label="Margin" type="number" fullWidth error={!!itemError?.margin} helperText={itemError?.margin?.message} size="small" />
              )} />
            </Box>
            <Box flex={1} px={1}>
              <Controller
                name={`sections.${sectionIdx}.items.${itemIdx}`}
                control={control}
                render={({ field: { value } }) => (
                  <TextField
                    label="Total"
                    value={formatCurrency(calculateItemTotal(
                      Number(value?.quantity ?? 0),
                      Number(value?.price ?? 0),
                      Number(value?.margin ?? 0)
                    ))}
                    InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                    fullWidth
                    size="small"
                  />
                )}
              />
            </Box>
            <Box width="80px" display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
              <IconButton onClick={() => removeItem(itemIdx)} color="error" size="small"><RemoveIcon /></IconButton>
            </Box>
          </Box>
        )
      })}
      <Box px={2}>
        <Button startIcon={<AddIcon />} onClick={() => appendItem({ title: '', description: '', unit: '', quantity: 1, price: 0, margin: 0 })} sx={{ mt: 1 }}>
          Add Item
        </Button>
      </Box>
    </>
  )
}

// Calculation helpers
type Item = { quantity?: number; price?: number; margin?: number }
type Section = { items?: Item[] }
function calcItemTotal(quantity: number, price: number, margin: number): number {
  return (quantity || 0) * (price || 0) * (1 + (margin || 0) / 100)
}
function calcItemMargin(quantity: number, price: number, margin: number): number {
  return (quantity || 0) * (price || 0) * ((margin || 0) / 100)
}
function calcSectionTotal(items: Item[] = []): number {
  return items.reduce((sum: number, item: Item) => sum + calcItemTotal(Number(item.quantity ?? 0), Number(item.price ?? 0), Number(item.margin ?? 0)), 0)
}
function calcSectionMargin(items: Item[] = []): number {
  return items.reduce((sum: number, item: Item) => sum + calcItemMargin(Number(item.quantity ?? 0), Number(item.price ?? 0), Number(item.margin ?? 0)), 0)
}
function calcAllTotals(sections: Section[] = []): { subTotal: number; totalMargin: number; totalAmount: number } {
  let subTotal = 0, totalMargin = 0, totalAmount = 0
  for (const section of sections) {
    const items = section.items ?? []
    subTotal += items.reduce((sum: number, item: Item) => sum + (Number(item.quantity ?? 0) * Number(item.price ?? 0)), 0)
    totalMargin += calcSectionMargin(items)
    totalAmount += calcSectionTotal(items)
  }
  return { subTotal, totalMargin, totalAmount }
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

  const { control, handleSubmit, formState: { errors } } = useForm<EstimationFormInputs>({
    defaultValues: defaultValues as EstimationFormInputs,
    resolver: yupResolver(schema),
  })
  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({ control, name: 'sections' })

  // Watch all form values for calculations
  const formValues = useWatch({ control })
  const sections = formValues?.sections || []
  const { subTotal, totalMargin, totalAmount } = calcAllTotals(sections)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Table-like header */}
      <Box display="flex" alignItems="center" sx={{ border: '1px solid #e0e0e0', borderBottom: 'none', borderRadius: '8px 8px 0 0', background: '#fafbfc', px: 2, pt: 2 }}>
        <Box width="16px" /> {/* For section action icon */}
        <Box flex={2} px={1} fontWeight="bold">ITEM</Box>
        <Box flex={2} px={1} fontWeight="bold">DESCRIPTION</Box>
        <Box flex={1} px={1} fontWeight="bold">UNIT</Box>
        <Box flex={1} px={1} fontWeight="bold">QUANTITY</Box>
        <Box flex={1} px={1} fontWeight="bold">PRICE ($)</Box>
        <Box flex={1} px={1} fontWeight="bold">MARGIN (+/-)</Box>
        <Box flex={1} px={1} fontWeight="bold">TOTAL</Box>
        <Box width="80px" /> {/* For item action icons */}
      </Box>
      <Divider sx={{ m: 0, borderBottomWidth: 2 }} />
      {/* Sections */}
      {sectionFields.map((section, sectionIdx) => {
        const sectionError = errors.sections?.[sectionIdx]
        // Get section items for calculation
        const sectionItems = sections?.[sectionIdx]?.items || []
        const sectionTotal = calcSectionTotal(sectionItems)
        return (
          <Box key={section.id} sx={{ border: '1px solid #e0e0e0', borderTop: 'none', borderRadius: sectionIdx === sectionFields.length - 1 ? '0 0 8px 8px' : 0, mb: 3, pb: 2, background: '#fff' }}>
            {/* Section row */}
            <Box display="flex" alignItems="center" px={2} pt={2} pb={1}>
              <Box flex={2} px={1}>
                <Controller name={`sections.${sectionIdx}.title`} control={control} render={({ field }) => (
                  <TextField {...field} label="Sample Section" fullWidth error={!!sectionError?.title} helperText={sectionError?.title?.message} size="small" />
                )} />
              </Box>
              {/* Empty boxes to align with item columns */}
              <Box flex={2} px={1} />
              <Box flex={1} px={1} />
              <Box flex={1} px={1} />
              <Box flex={1} px={1} />
              <Box flex={1} px={1} />
              <Box flex={1} px={1}>
                <TextField value={formatCurrency(sectionTotal)} InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start">$</InputAdornment> }} fullWidth size="small" />
              </Box>
              <Box width="80px" display="flex" alignItems="center" justifyContent="flex-end">
                <IconButton onClick={() => removeSection(sectionIdx)} color="error" size="small"><DeleteIcon /></IconButton>
              </Box>
            </Box>
            {/* Items for this section */}
            <SectionItemsFields sectionIdx={sectionIdx} control={control} sectionError={sectionError} />
            {sectionError?.items && typeof sectionError.items?.message === 'string' && (
              <Typography color="error" variant="caption" sx={{ ml: 2 }}>{sectionError.items.message}</Typography>
            )}
          </Box>
        )
      })}
      {/* Add Section Button */}
      <Box px={2}>
        <Button startIcon={<AddIcon />} onClick={() => appendSection({ title: '', items: [{ title: '', description: '', unit: '', quantity: 1, price: 0, margin: 0 }] })}>
          Add Section
        </Button>
      </Box>
      {typeof errors.sections?.message === 'string' && (
        <Typography color="error" variant="caption" sx={{ ml: 2 }}>{errors.sections.message}</Typography>
      )}
      {/* Summary and Actions */}
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end" mt={4}>
        <Box minWidth={280} mr={4}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2">Sub Total</Typography>
            <Typography variant="body2">{formatCurrency(subTotal)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2">Total Margin</Typography>
            <Typography variant="body2">{formatCurrency(totalMargin)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" fontWeight="bold" mb={2}>
            <Typography variant="body1">Total Amount</Typography>
            <Typography variant="body1">{formatCurrency(totalAmount)}</Typography>
          </Box>
        </Box>
        <Box display="flex" gap={2}>
          <Button onClick={onCancel} variant="outlined" color="primary" sx={{ minWidth: 140, height: 48, fontWeight: 500, fontSize: 18, borderRadius: 2, borderWidth: 2 }}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ minWidth: 180, height: 48, fontWeight: 700, fontSize: 20, borderRadius: 2 }}>SUBMIT</Button>
        </Box>
      </Box>
    </form>
  )
} 