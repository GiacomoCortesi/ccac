import { Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { useParams } from 'react-router-dom'
import { useGetOrder } from '../../services/api-order-service'
import AppBar from '../AppBar/AppBar'
import ContactMail from '../Contact/ContactMail'
import ContactWA from '../Contact/ContactWA'
import Loading from '../Loading/Loading'
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay'
import { useTranslation } from 'react-i18next'

const Order = () => {
  const { id } = useParams()
  const { data, error, isLoading } = useGetOrder(id ? id : '')
  const { t } = useTranslation()

  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box margin={1.75}>
      <AppBar />
      {error && <ErrorDisplay error={error} />}
      {isLoading && <Loading />}
      {data && (
        <Paper variant={'outlined'}>
          <Typography sx={{ marginTop: 1.25, marginLeft: 1.25 }}>
            {t('order.order')} {data.id}
          </Typography>
          <Typography sx={{ marginTop: 1.25, marginLeft: 1.25 }}>
            {t('order.status')}: {data.status.message}
          </Typography>
          <Typography sx={{ marginTop: 1.25, marginLeft: 1.25 }}>
            {data.status.description}
          </Typography>
          <Typography sx={{ marginTop: 1.25, marginLeft: 1.25 }}>
            {t('order.orderDate')}: {data.date}
          </Typography>
          <Typography sx={{ marginTop: 1.25, marginLeft: 1.25 }}>
            {t('order.shippingMethod')}: {data.shipping.method}
          </Typography>
          <Typography sx={{ marginTop: 1.25, marginLeft: 1.25 }}>
            {t('order.shippingCost')}: {data.shipping.cost.value}{' '}
            {data.shipping.cost.currency}
          </Typography>
          <Typography sx={{ marginTop: 1.25, marginLeft: 1.25 }}>
            {t('order.cartCost')}: {data.cart.total.value} {data.cart.total.currency}
          </Typography>
          <Divider />
          <Typography sx={{ marginTop: 1.25, marginLeft: 1.25 }}>
            {t('order.totalCost')}: {data.total.value} {data.total.currency}
          </Typography>
          <br />
          <Typography sx={{ marginTop: 1.25, marginLeft: 1.25 }}>
            {t('order.contactUs')}
          </Typography>
          <ContactMail variant={matchesMD ? 'body2' : 'body1'} />
          <ContactWA variant={matchesMD ? 'body2' : 'body1'} />
        </Paper>
      )}
    </Box>
  )
}

export default Order
