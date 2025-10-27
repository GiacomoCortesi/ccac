import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import { ICartItem } from '../../models/cart'
import { useGetProduct } from '../../services/api-product-service'
import React, { Fragment } from 'react'
import Box from '@mui/material/Box'
import {
  useAddToCart,
  useDeleteCartItem,
} from '../../services/api-cart-service'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Loading from '../Loading/Loading'
import { mutate } from 'swr'

export default function CartItem({
  product_id,
  sku,
  quantity,
  total,
}: ICartItem) {
  const productResponse = useGetProduct(product_id)
  const data = productResponse.data
  const error = productResponse.error
  const isLoading = productResponse.isLoading
  const { trigger } = useDeleteCartItem()
  const addToCartTrigger = useAddToCart().trigger
  const onItemDeleteClick = (quantityToDelete: number) => {
    //@ts-ignore
    trigger({
      sku: sku,
      product_id: product_id,
      quantity: quantityToDelete,
    })
    mutate(product_id)
  }
  const onItemAddClick = () => {
    //@ts-ignore
    addToCartTrigger({
      sku: sku,
      product_id: product_id,
      quantity: 1,
    })
  }
  return (
    <Fragment>
      {isLoading && <Loading />}
      {error && 'Error...'}
      {data && (
        <ListItem>
          <ListItemAvatar>
            {data.images && Array.isArray(data.images) && (
              <Avatar
                variant={'rounded'}
                src={data.images[0]}
                alt={data.id}
                sx={{ width: 92, height: 92 }}
              />
            )}
          </ListItemAvatar>
          <ListItemText
            sx={{ margin: '0em 2em' }}
            primary={data.title}
            secondary={
              data.description +               data.variations &&
              Array.isArray(data.variations) &&
              data.variations.map((variation: any) => {
                return (
                  variation.sku === sku &&
                  variation.options.color + ' ' + variation.options.size
                )
              })
            }
          />
          <IconButton
            sx={{ margin: '0em 2em 0em 2em' }}
            disableRipple={true}
            aria-label={`user cart`}
            onClick={() => onItemDeleteClick(quantity)}
          >
            <DeleteIcon />
          </IconButton>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {total && data.price && (
              <Typography variant={'h6'}>
                {total.value} {data.price.currency}
              </Typography>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                sx={{ margin: '0em 0.5em 0em 0.5em' }}
                disableRipple={true}
                aria-label={`remove item from cart`}
                onClick={() => onItemDeleteClick(1)}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant={'h6'} align={'center'}>
                {quantity}
              </Typography>
              <IconButton
                sx={{ margin: '0em 0.5em 0em 0.5em' }}
                disableRipple={true}
                aria-label={`add item to cart`}
                onClick={onItemAddClick}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </ListItem>
      )}
    </Fragment>
  )
}
