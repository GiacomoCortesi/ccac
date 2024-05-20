import { ImageList, ImageListItem } from '@mui/material'
import Box from '@mui/material/Box'
import { Fragment } from 'react'
import { useGetGallery } from '../../services/api-gallery'
import DrawerAppBar from '../AppBar/DrawerAppBar'
import Loading from '../Loading/Loading'

function srcset(image: string, size: number, rows = 1, cols = 1) {
  console.log('rows', rows)
  console.log('columns', cols)
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  }
}

export default function Gallery() {
  const { data, error, isLoading } = useGetGallery()

  const itemData = data?.data?.images?.map((image: string) => ({
    img: image,
    title: image,
    rows: Math.floor(Math.random() * (4 - 1) + 1),
    cols: Math.floor(Math.random() * (4 - 1) + 1),
  }))

  return (
    <Fragment>
      <DrawerAppBar />
      {isLoading && <Loading />}
      {error && 'Error...'}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {itemData && (
          <ImageList
            sx={{ width: '80%', height: '80%' }}
            cols={2}
            // variant={"quilted"}
          >
            {itemData.map((item) => (
              <ImageListItem
                key={item.img}
                // cols={item.cols || 1} rows={item.rows || 1}
              >
                <img
                  {...srcset(item.img, 120, 6, 6)}
                  alt={item.title}
                  loading='lazy'
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
    </Fragment>
  )
}
