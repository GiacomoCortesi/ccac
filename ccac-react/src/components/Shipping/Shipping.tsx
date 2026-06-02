import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import {
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  FormLabel,
  Typography,
} from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
import { IShipping } from '../../models/shipping'
import { useTranslation } from 'react-i18next'
import { alpha, useTheme } from '@mui/material/styles'

interface ShippingProps {
  fromShippingComponent: (shippingMethod: string) => void
  shippingMethod: string
  shippingOptions: IShipping[]
}
const Shipping = (props: ShippingProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <FormControl component='fieldset' sx={{ width: '100%' }}>
      <FormLabel id='shipping-method-selection' sx={{ mb: 1 }}>
        {t('shipping.method')}
      </FormLabel>

      <Box
        role='radiogroup'
        aria-labelledby='shipping-method-selection'
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
          gap: 1,
        }}
      >
        {props.shippingOptions.map((shippingOption: IShipping, index) => {
          const isSelected = props.shippingMethod === shippingOption.method
          const icon =
            shippingOption.method === 'Ritiro' ? (
              <WhatsAppIcon fontSize='small' />
            ) : (
              <LocalShippingIcon fontSize='small' />
            )

          return (
            <Card
              key={index}
              variant='outlined'
              role='radio'
              aria-checked={isSelected}
              sx={{
                width: '100%',
                borderColor: isSelected ? 'primary.main' : 'divider',
                bgcolor: isSelected
                  ? alpha(theme.palette.primary.main, 0.08)
                  : 'background.paper',
                transition: theme.transitions.create(
                  ['background-color', 'border-color', 'box-shadow'],
                  { duration: theme.transitions.duration.shortest },
                ),
                overflow: 'hidden',
              }}
            >
              <CardActionArea
                onClick={() => props.fromShippingComponent(shippingOption.method)}
                sx={{
                  height: '100%',
                  minHeight: { xs: 136, sm: 160 },
                  '&:hover': {
                    boxShadow: theme.shadows[2],
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: -2,
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 1.25, sm: 2 }, pb: { xs: 1.25, sm: 2 } }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: 1,
                      mb: { xs: 0.75, sm: 1 },
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant='subtitle2' sx={{ lineHeight: 1.2 }}>
                        {shippingOption.title}
                      </Typography>
                      {shippingOption.location && (
                        <Typography variant='body2' color='text.secondary'>
                          {shippingOption.location}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {icon}
                    </Box>
                  </Box>

                  {shippingOption?.detail && (
                    <Typography
                      variant='body2'
                      sx={{
                        mb: 0.75,
                        display: '-webkit-box',
                        WebkitLineClamp: { xs: 2, sm: 3 },
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {shippingOption.detail}
                    </Typography>
                  )}

                  {shippingOption?.working_days && (
                    <Typography variant='body2' color='text.secondary'>
                      {t('shipping.deliveryInWorkingDays', {
                        days: shippingOption.working_days,
                      })}
                    </Typography>
                  )}

                  <Typography variant='body2' sx={{ mt: 0.75 }}>
                    {t('shipping.cost')}: {shippingOption.cost.value}{' '}
                    {shippingOption.cost.currency}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )
        })}
      </Box>
    </FormControl>
  )
}
export default Shipping
