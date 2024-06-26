import Box from '@mui/material/Box'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useLocation, useNavigate } from 'react-router-dom'
import { IOrder } from '../../models/order'
import { useGetCart } from '../../services/api-cart-service'
import {
  useCompleteOrder,
  useCreateOrder,
} from '../../services/api-order-service'
import DrawerAppBar from '../AppBar/AppBar'
import './PayPal.css'
import Loading from '../Loading/Loading'

const PayPal = (props: any) => {
  const { data, error, isLoading } = useGetCart()
  const createOrderTrigger = useCreateOrder().trigger
  const completeOrderTrigger = useCompleteOrder().trigger
  const navigate = useNavigate()

  let orderID = ''

  const { state } = useLocation()
  const { shippingMethod } = state

  const onApprove = (data: any) => {
    //@ts-ignore
    return completeOrderTrigger({
      id: orderID,
    })
      .then((res) => {
        console.log('successfully approved order', res)
        navigate('/order/' + orderID)
      })
      .catch((res) => {
        console.log('failure approving order: ', res)
      })
  }

  const createOrder = (orderData: any, actions: any) => {
    console.log('create order data', orderData)
    //@ts-ignore
    return createOrderTrigger({
      user_id: data?.user_id,
      shipping: {
        method: shippingMethod,
      },
    }).then((order: IOrder) => {
      orderID = order.id
      console.log('orderID', order.id)
      console.log('stored orderID', orderID)
      return order.paypal_order_id
    })
  }

  return (
    <>
      <DrawerAppBar />
      {isLoading && <Loading />}
      {error && 'Error...'}
      {data && (
        <Box
          style={{
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {data?.total.value && (
            <PayPalScriptProvider
              options={{
                'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID || '',
                currency: data?.total?.currency,
              }}
            >
              <PayPalButtons
                className={'paypal-button'}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={(data: any) => navigate('/cart')}
                onCancel={(data: any) => navigate('/cart')}
              />
            </PayPalScriptProvider>
          )}
        </Box>
      )}
    </>
  )
}

export default PayPal
