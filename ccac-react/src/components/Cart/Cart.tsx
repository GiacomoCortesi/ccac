import React, { Fragment, useState } from 'react'
import {
  Divider,
  List,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useGetCart } from '../../services/api-cart-service'
import { ICart, ICartItem } from '../../models/cart'
import CartItem from '../CartItem/CartItem'
import Loading from '../Loading/Loading'
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay'
import AppBar from '../AppBar/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Shipping from '../Shipping/Shipping'
import { useTranslation } from 'react-i18next'
import { useLocalizedNavigate } from '../../hooks/useLocalizedNavigate'

export default function Cart() {
  const { data, error, isLoading } = useGetCart()
  const { t } = useTranslation()
  const navigate = useLocalizedNavigate()

  const cartItems = data?.items?.map((cartItem: ICartItem, index: number) => {
    return (
      <Fragment key={index}>
        <CartItem
          total={cartItem.total}
          product_id={cartItem.product_id}
          quantity={cartItem.quantity}
          sku={cartItem.sku}
        />
        <Divider />
      </Fragment>
    )
  })

  const [shippingMethod, setShippingMethod] = useState('Ritiro')

  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))

  const fromShippingComponent = (shippingMethod: string) => {
    setShippingMethod(shippingMethod)
    console.log('selected shipping method: ', shippingMethod)
  }

  const isEmptyCart = (cart: ICart | undefined) => {
    return cart?.items && cart?.items?.length == 0
  }

  const handleClick = () => {
    navigate('/pay', { state: { shippingMethod: shippingMethod } })
  }

  return (
    <Fragment>
      <AppBar />
      {isLoading && <Loading />}
      {error && <ErrorDisplay error={error} />}
      {data && (
        <Box
          sx={{
            mx: { xs: 0, sm: 2 },
            px: { xs: 1, sm: 0 },
          }}
        >
          {isLoading && <Loading />}
          {isEmptyCart(data) ? (
            <Box
              sx={{
                minHeight: `calc(100vh - ${Number(theme.mixins.toolbar.minHeight ?? 64)}px)`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant={matchesMD ? 'h6' : 'h4'}>
                {t('cart.empty')}
              </Typography>
              <Button variant='outlined' onClick={() => navigate('/products')}>
                <Typography variant={matchesMD ? 'body1' : 'h6'}>
                  {t('cart.goToShop')}
                </Typography>
              </Button>
            </Box>
          ) : (
            <>
              <List>{cartItems}</List>
              <Box
                sx={{
                  mt: 2,
                  mb: 2,
                  mx: { xs: 0, sm: 2 },
                }}
              >
                <Paper
                  variant='outlined'
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                  }}
                >
                  {data?.shipping_options && (
                    <Shipping
                      shippingMethod={shippingMethod}
                      shippingOptions={data.shipping_options}
                      fromShippingComponent={fromShippingComponent}
                    />
                  )}

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      gap: 2,
                      mt: 0.5,
                    }}
                  >
                    <Typography variant='body1' color='text.secondary'>
                      {t('cart.total')}
                    </Typography>
                    <Typography variant={matchesMD ? 'h6' : 'h5'}>
                      {data?.total?.value} {data?.total?.currency}
                    </Typography>
                  </Box>

                  <Button
                    onClick={handleClick}
                    variant='contained'
                    size={matchesMD ? 'large' : 'medium'}
                    fullWidth={matchesMD}
                    sx={{
                      mt: 0.5,
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant={matchesMD ? 'h6' : 'h5'}>
                      {t('cart.payWithPaypal')}
                    </Typography>
                  </Button>
                </Paper>
              </Box>
            </>
          )}
        </Box>
      )}
    </Fragment>
  )
}
