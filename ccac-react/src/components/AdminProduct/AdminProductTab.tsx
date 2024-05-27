import React from 'react'
import {
  TextField,
  MenuItem,
  Box,
  Autocomplete,
  Chip,
  Typography,
  Button,
} from '@mui/material'
import { IProduct } from '../../models/product'

const currencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'AUD', name: 'Australian Dollar' },
]

export const ProductTab = ({ product, onProductChange }: IProduct) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newProduct
    if (event.target.name === 'quantity') {
      newProduct = {
        ...product,
        [event.target.name]: Number(event.target.value),
      }
    } else {
      newProduct = {
        ...product,
        [event.target.name]: event.target.value,
      }
    }

    onProductChange(newProduct)
  }

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProduct = {
      ...product,
      price: {
        ...product.price,
        [event.target.name]: event.target.value,
      },
    }
    onProductChange(newProduct)
  }

  const handleAutocompleteChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: any
  ) => {
    const newProduct = {
      ...product,
      [id]: newValue,
    }
    onProductChange(newProduct)
  }

  const handleOptionsChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: any
  ) => {
    const newProduct = {
      ...product,
      options: {
        ...product.options,
        [id]: newValue,
      },
    }
    onProductChange(newProduct)
  }

  return (
    <>
      <Box
        style={{
          margin: '5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '75ch' },
        }}
      >
        <Typography variant='h4'>Product Form</Typography>
        <TextField name='id' label='ID' defaultValue={product.id} disabled />
        <TextField
          name='type'
          label='Type'
          value={product.type}
          onChange={handleChange}
        />
        <TextField
          name='sku'
          label='SKU'
          value={product.sku}
          onChange={handleChange}
        />
        <TextField
          name='quantity'
          label='Quantity'
          type='number'
          value={product.quantity}
          onChange={handleChange}
        />
        {product.price && (
          <>
            <TextField
              name='value'
              label={`Price ${product.price.currency}`}
              type='number'
              value={product.price?.value}
              onChange={handlePriceChange}
            />
            <TextField
              select
              name='currency'
              label='Currency'
              value={product.price.currency}
              onChange={handlePriceChange}
              variant='outlined'
              fullWidth
              helperText='Please select your currency'
            >
              {currencies.map((option) => (
                <MenuItem key={option.code} value={option.code}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </>
        )}
        <TextField
          name='title'
          label='Title'
          value={product.title}
          onChange={handleChange}
        />
        <TextField
          name='description'
          label='Description'
          value={product.description}
          onChange={handleChange}
        />
        {product.images && (
          <Autocomplete
            multiple
            id='images'
            options={[]}
            value={product.images}
            onChange={(event, newValue) =>
              handleAutocompleteChange('images', event, newValue)
            }
            freeSolo
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  key={index}
                  variant='outlined'
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label='Product images'
                placeholder='Image URL'
              />
            )}
          />
        )}
        {product.categories && (
          <Autocomplete
            multiple
            id='categories'
            options={[]}
            value={product.categories}
            onChange={(event, newValue) =>
              handleAutocompleteChange('categories', event, newValue)
            }
            freeSolo
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  key={index}
                  variant='outlined'
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label='Product categories'
                placeholder='Category'
              />
            )}
          />
        )}
        {product.options?.available_sizes && (
          <Autocomplete
            multiple
            id='available_sizes'
            options={[]}
            value={product.options.available_sizes}
            onChange={(event, newValue) =>
              handleOptionsChange('available_sizes', event, newValue)
            }
            freeSolo
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  key={index}
                  variant='outlined'
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label='Available Sizes'
                placeholder='Size'
              />
            )}
          />
        )}
        {product.options?.available_colors && (
          <Autocomplete
            multiple
            id='available_colors'
            options={[]}
            value={product.options.available_colors}
            onChange={(event, newValue) =>
              handleOptionsChange('available_colors', event, newValue)
            }
            freeSolo
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  key={index}
                  variant='outlined'
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label='Available Colors'
                placeholder='Color'
              />
            )}
          />
        )}
      </Box>
    </>
  )
}

export default ProductTab
