import React, { useEffect } from 'react'
import { Button, Box, Tabs, Tab } from '@mui/material'
import {
  useGetProduct,
  useEditProduct,
  useCreateProduct,
} from '../../services/api-product-service'
import { useParams } from 'react-router-dom'
import { IProduct } from '../../models/product'
import Loading from '../Loading/Loading'
import AppBar from '../AppBar/AdminAppBar'
import AdminProductTab from './AdminProductTab'
import ShopSnackbar from '../SnackBar/SnackBar'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import SaveIcon from '@mui/icons-material/Save'
import { useNavigate } from 'react-router-dom'

const emptyProduct = {
  id: '',
  sku: '',
  rating: 0,
  type: '',
  categories: [],
  title: '',
  description: '',
  images: [],
  price: {
    value: '0',
    currency: 'EUR',
  },
  options: {
    color: '',
    size: '',
    available_colors: [],
    available_sizes: [],
  },
  quantity: 0,
  variations: [],
}

const createProductPath = 'create'

const AdminProduct = () => {
  // retrieve product ID from URL path
  const { id } = useParams()
  // fetch product information for existing product
  // init to empty product for a brand new product
  const productResponse = id !== createProductPath ? useGetProduct(id) : { data: emptyProduct, error: null, isLoading: false }
  const product = productResponse.data
  const error = productResponse.error
  const isLoading = productResponse.isLoading

  const { editProduct, error: editProductError, isUpdating } = useEditProduct()
  const {
    createProduct,
    error: createProductError,
    isCreating,
  } = useCreateProduct()
  const [updatedProduct, setUpdatedProduct] =
    React.useState<IProduct>(emptyProduct)

  const [snackBarOpen, setSnackBarOpen] = React.useState<boolean>(false)

  const [selectedTab, setSelectedTab] = React.useState(0)

  const navigate = useNavigate()

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  const onProductVariationChange = (variation: IProduct, index: number) => {
    const newVariations = [...updatedProduct.variations]
    newVariations[index] = variation
    setUpdatedProduct({
      ...updatedProduct,
      variations: newVariations,
    })
  }

  const onProductChange = (product: IProduct) => {
    setUpdatedProduct(product)
  }

  // initialize form data with fetched product information
  useEffect(() => {
    if (product) {
      console.log('updating product data ', product)
      setUpdatedProduct(product)
    }
  }, [product])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (id === createProductPath) {
      console.log('creating product: ', updatedProduct)
      await createProduct(updatedProduct)
    } else {
      console.log('updating product: ', updatedProduct)
      await editProduct(id!, updatedProduct)
    }
    setSnackBarOpen(true)
  }

  const handleAddProductVariationClick = () => {
    const newVariations = [...updatedProduct.variations]
    newVariations.push(emptyProduct)
    setUpdatedProduct({
      ...updatedProduct,
      variations: newVariations,
    })
  }
  const handleDeleteProductVariationClick = () => {
    const newVariations = updatedProduct.variations.filter(
      (_, index: number) => index !== selectedTab
    )
    setUpdatedProduct({
      ...updatedProduct,
      variations: newVariations,
    })
    setSelectedTab(selectedTab - 1)
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

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const renderSnackBar = () => {
    let errorMessage
    if ((createProductError as any)?.message) {
      errorMessage = `Product creation failed: ${(createProductError as any).message}`
    }
    if ((editProductError as any)?.message) {
      errorMessage = `Product update failed: ${(editProductError as any).message}`
    }
    const message = errorMessage || 'Product updated succesfully'
    if (!createProductError && !editProductError && snackBarOpen) {
      setTimeout(() => navigate('/admin/warehouse'), 3000)
    }
    return (
      <ShopSnackbar
        handleClose={handleSnackBarClose}
        open={snackBarOpen}
        message={message}
      />
    )
  }

  return (
    <>
      {isLoading && <Loading />}
      {error && 'Error...'}
      {updatedProduct && product && (
        <>
          <AppBar />
          <form style={{ margin: '2rem' }} onSubmit={handleSubmit}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              aria-label='basic tabs example'
            >
              <Tab label='Main product' {...a11yProps(0)} />
              {updatedProduct.variations &&
                updatedProduct.variations.map((variation, index) => (
                  <Tab
                    key={index}
                    label={`Variation ${index}`}
                    {...a11yProps(index)}
                  />
                ))}
            </Tabs>
            {selectedTab === 0 && (
              <AdminProductTab
                product={updatedProduct}
                onProductChange={onProductChange}
              />
            )}
            {updatedProduct.variations &&
              updatedProduct.variations.map((variation, index) => (
                <Box key={index + 1}>
                  {selectedTab === index + 1 && (
                    <AdminProductTab
                      product={variation}
                      onProductChange={(updatedProduct) => {
                        onProductVariationChange(updatedProduct, index)
                      }}
                    />
                  )}
                </Box>
              ))}
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <Button disabled={isCreating || isUpdating} type='submit'>
                Update Product
                <SaveIcon />
              </Button>
              <Button onClick={handleAddProductVariationClick}>
                Add Product variation
                <AddCircleOutlineIcon />
              </Button>
              <Button
                style={{ display: selectedTab === 0 ? 'none' : undefined }}
                onClick={handleDeleteProductVariationClick}
              >
                Delete Product variation
                <DeleteForeverOutlinedIcon />
              </Button>
            </Box>
          </form>
        </>
      )}
      {renderSnackBar()}
    </>
  )
}

export default AdminProduct
