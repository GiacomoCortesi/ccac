import {
  Divider,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { IProduct } from '../../models/product'
import { useAddToCart } from '../../services/api-cart-service'
import { useGetProduct } from '../../services/api-product-service'
import AppBar from '../AppBar/AppBar'
import ShopSnackbar from '../SnackBar/SnackBar'
import Loading from '../Loading/Loading'

export default function ShopItem() {
  const { id } = useParams()
  const { data, error, isLoading } = useGetProduct(id)
  const [quantity, setQuantity] = React.useState('1')
  const [size, setSize] = React.useState(
    data?.options?.available_sizes ? data.options.available_sizes[0] : 'M'
  )
  const [color, setColor] = React.useState(
    data?.options?.available_colors ? data.options.available_colors[0] : 'sand'
  )
  // const [rating, setRating] = React.useState<number | null>(2);
  const [selectedImage, setSelectedImage] = React.useState<number>(0)
  const [snackBarOpen, setSnackBarOpen] = React.useState<boolean>(false)
  const [snackBarMessage, setSnackBarMessage] = React.useState<string>('')

  const { trigger } = useAddToCart()

  const onCartButtonClick = () => {
    let productVariation: IProduct | undefined
    // for t-shirt variations are both for color and size
    if (data?.type === 't-shirts') {
      productVariation = data?.variations?.find((el: IProduct) => {
        return el.options.size === size && el.options.color === color
      })
    }
    // for shopping-bag variations are for color only
    if (data?.type === 'shopping-bag') {
      productVariation = data?.variations?.find((el: IProduct) => {
        return el.options.color === color
      })
    }

    trigger({
      sku: productVariation ? productVariation.sku : data?.sku,
      quantity: parseInt(quantity),
      product_id: id,
    })
      .then(() => {
        setSnackBarOpen(true)
        setSnackBarMessage(data?.title + ' aggiunto al carrello')
      })
      .catch(() => {
        setSnackBarOpen(true)
        setSnackBarMessage(
          'Non posso aggiungere ' + data?.title + ' al carrello'
        )
      })
  }
  const handleQuantityChange = (event: SelectChangeEvent) => {
    setQuantity(event.target.value as string)
  }

  const handleSizeChange = (event: SelectChangeEvent) => {
    setSize(event.target.value as string)
  }

  const handleColorChange = (event: SelectChangeEvent) => {
    setColor(event.target.value as string)
  }

  const handleSnackBarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackBarOpen(false)
  }

  function srcset(
    image: string,
    width: number,
    height: number,
    rows: number,
    cols: number
  ) {
    return {
      src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${width * cols}&h=${
        height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    }
  }

  return (
    <Box>
      <AppBar />
      {isLoading && <Loading />}
      {error && 'Error...'}
      {data && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ImageList
              cols={4}
              sx={{
                margin: 1,
                width: 400,
                transform: 'translateZ(0)',
              }}
              gap={5}
            >
              {data.images && (
                <ImageListItem key={'main_image'} cols={4} rows={4}>
                  <img
                    style={{ maxWidth: 450 }}
                    {...srcset(data.images[selectedImage], 30, 30, 4, 4)}
                    alt={data.id}
                    loading='lazy'
                  />
                </ImageListItem>
              )}
              {data.images &&
                data.images.map((image, index) => {
                  return (
                    <ImageListItem key={'image' + index} cols={1} rows={1}>
                      <img
                        style={{
                          maxWidth: 100,
                          cursor: 'pointer',
                          border: '3px solid #ffffff',
                        }}
                        onClick={() => {
                          setSelectedImage(index)
                        }}
                        {...srcset(image, 20, 20, 1, 1)}
                        alt={data.id}
                        loading='lazy'
                      />
                    </ImageListItem>
                  )
                })}
            </ImageList>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                margin: '0 1.5em 0 1.5em',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{ marginTop: '1em' }} variant={'h4'}>
                {data.title}
              </Typography>
              <Divider />
              <Typography sx={{ marginTop: '1em' }} variant={'h6'}>
                {data.description}
              </Typography>
              {data.price && (
                <Typography sx={{ margin: '1em 0em 1em 0em' }} variant={'h3'}>
                  {data.price.value} {data.price.currency}
                </Typography>
              )}
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Quantity</InputLabel>
                <Select
                  sx={{ marginTop: '1.50em' }}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={quantity}
                  label='Quantity'
                  onChange={handleQuantityChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((res) => (
                    <MenuItem key={res} value={res}>
                      {res}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {Array.isArray(data.variations) &&
                data.options &&
                Array.isArray(data.options.available_sizes) && (
                  <FormControl>
                    <InputLabel id='size-select-label'>Size</InputLabel>
                    <Select
                      sx={{ marginTop: '1.50em' }}
                      labelId='size-select-label'
                      id='size-select'
                      value={size}
                      label='Size'
                      onChange={handleSizeChange}
                    >
                      {data.options.available_sizes.map((res: any) => (
                        <MenuItem key={res} value={res}>
                          {res}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              {Array.isArray(data.variations) &&
                data.options &&
                Array.isArray(data.options.available_colors) && (
                  <FormControl>
                    <InputLabel id='demo-simple-select-label'>Color</InputLabel>
                    <Select
                      sx={{ marginTop: '1.50em' }}
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={color}
                      label='Color'
                      onChange={handleColorChange}
                    >
                      {data.options.available_colors.map((res: any) => (
                        <MenuItem key={res} value={res}>
                          {res}
                          {/*<Box sx={{ bgcolor: res, width:"30px", height: "30px", border: "solid white 2px", margin: "0.25em"}}></Box>*/}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              {/*<Box sx={{display: "flex"}}>*/}
              {/**/}
              {/*</Box>*/}
              {/*<Rating*/}
              {/*    sx={{marginTop: "1em"}}*/}
              {/*    name="simple-controlled"*/}
              {/*    value={rating}*/}
              {/*    onChange={(event, newValue) => {*/}
              {/*        setRating(newValue);*/}
              {/*    }}*/}
              {/*/>*/}
              <Button
                onClick={onCartButtonClick}
                sx={{ marginTop: '1em' }}
                variant='outlined'
              >
                Add To Cart
              </Button>
              {
                <ShopSnackbar
                  handleClose={handleSnackBarClose}
                  open={snackBarOpen}
                  message={snackBarMessage}
                />
              }
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}
