import * as React from 'react'
import { Link } from 'react-router-dom'
import { Box, IconButton } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useGetAllProducts } from '../../services/api-product-service'
import Loading from '../Loading/Loading'
import { IProduct } from '../../models/product'
import AppBar from '../AppBar/AppBar'
import DeleteProduct from '../DeleteProduct/DeleteProduct'
import DeleteProducts from '../DeleteProducts/DeleteProducts'
import EditProductButton from '../EditProductButton/EditProductButton'
import ShopSnackbar from '../SnackBar/SnackBar'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlineOutlined'

export default function WareHouse() {
  const productsResponse = useGetAllProducts()
  const products = productsResponse.data
  const error = productsResponse.error
  const isLoading = productsResponse.isLoading
  const mutate = productsResponse.mutate

  const [snackBarOpen, setSnackBarOpen] = React.useState<boolean>(false)
  const [snackBarMessage, setSnackBarMessage] = React.useState<string>('')
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])

  const handleSelectionChange = (newSelection: any) => {
    setSelectedIds(newSelection)
  }
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'type', headerName: 'Type', width: 200 },
    { field: 'sku', headerName: 'SKU', width: 200 },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      width: 130,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 200,
    },
    {
      field: 'deleteAction',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <>
          <DeleteProduct
            id={params.row.id}
            onProductDelete={(message: string) => {
              setSnackBarOpen(true)
              setSnackBarMessage(message)
              mutate()
            }}
          />
        </>
      ),
    },
    {
      field: 'editAction',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <>
          <EditProductButton id={params.row.id} />
        </>
      ),
    },
  ]

  const rows = (products: IProduct[]) => {
    return products.map((product: IProduct) => {
      let totalQuantity = product.quantity
      if (product.variations?.length > 0) {
        totalQuantity = product.variations.reduce(
          (variationQuantitySum, variation) =>
            variationQuantitySum + variation.quantity,
          0
        )
      }
      return {
        id: product.id,
        type: product.type,
        sku: product.sku,
        quantity: totalQuantity,
        price: product.price.value,
      }
    })
  }
  const handleCellClick = (param: any, event: any) => {
    event.stopPropagation()
  }

  const handleRowClick = (param: any, event: any) => {
    event.stopPropagation()
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
  return (
    <>
      <AppBar />
      {isLoading && <Loading />}
      {error && 'Error...'}
      <Box style={{ margin: '5rem' }}>
        {products?.length === 0 && 'No product available in the shop...'}
        {products && products.length > 0 && (
          <>
            <DataGrid
              rows={products ? rows(products) : []}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              onCellClick={handleCellClick}
              onRowClick={handleRowClick}
              pageSizeOptions={[5, 10]}
              onRowSelectionModelChange={(idList: any) => {
                setSelectedIds(idList)
              }}
              checkboxSelection
              disableRowSelectionOnClick
              hideFooterSelectedRowCount
            />
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <DeleteProducts
                idList={selectedIds}
                onProductDelete={(message: string) => {
                  setSnackBarOpen(true)
                  setSnackBarMessage(message)
                  mutate()
                }}
              />
              <Link to={`/admin/warehouse/create`}>
                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <AddCircleOutlineIcon color={'primary'} fontSize={'large'} />
                </Box>
              </Link>
              <IconButton
                aria-label={`download products button`}
                disableRipple={true}
              >
                <FileDownloadOutlinedIcon
                  color={'primary'}
                  fontSize={'large'}
                />
              </IconButton>
            </Box>
          </>
        )}
      </Box>

      {
        <ShopSnackbar
          handleClose={handleSnackBarClose}
          open={snackBarOpen}
          message={snackBarMessage}
        />
      }
    </>
  )
}
