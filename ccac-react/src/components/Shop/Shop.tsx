import { Typography, useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import * as React from 'react'
import { Fragment } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useGetAllProducts } from '../../services/api-product-service'
import AppBar from '../AppBar/AppBar'
import ImageHover from '../ImageHover/ImageHover'
import Loading from '../Loading/Loading'
import { IProduct } from '../../models/product'

export default function Shop() {
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
  const matchesLG = useMediaQuery(theme.breakpoints.down('lg'))
  const { data, error, isLoading } = useGetAllProducts()
  const getImageListCols = () => {
    if (matchesSM) {
      return 1
    } else if (matchesLG) {
      return 2
    } else {
      return 2
    }
  }
  return (
    <Fragment>
      <AppBar />
      {isLoading && <Loading />}
      {error && 'Error...'}
      {data?.length === 0 && 'No product available in the shop...'}
      {data && (
        <ImageList cols={getImageListCols()}>
          {Array.isArray(data) &&
            data.map((item: IProduct, index: number) => (
              <Box key={index} sx={{ margin: '5em 0 5em 0' }}>
                <ImageListItem key={index}>
                  <RouterLink
                    style={{ display: 'flex', justifyContent: 'center' }}
                    to={`/products/${item.id}`}
                  >
                    <ImageHover src={item.images[0]} title={item.title} />
                  </RouterLink>
                  <ImageListItemBar
                    subtitle={
                      <span
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <Typography variant={'body2'}>
                          {item.description}
                        </Typography>
                      </span>
                    }
                    position='below'
                    title={
                      <span
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <Typography variant={'body1'}>{item.title}</Typography>
                      </span>
                    }
                  />
                </ImageListItem>
              </Box>
            ))}
        </ImageList>
      )}
    </Fragment>
  )
}
