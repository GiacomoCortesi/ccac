import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { IconButton } from '@mui/material'
import { useDeleteProduct } from '../../services/api-product-service'

interface DeleteProductProps {
  id: string
  onProductDelete: (message: string) => void
}

export default function DeleteProduct({ id, onProductDelete }: DeleteProductProps) {
  const { deleteProduct, isDeleting, error } = useDeleteProduct()

  const handleDeleteProductClick = async () => {
    // Handle button click based on row data (e.g., open a dialog, navigate, etc.)
    console.log('Delete button clicked for product ID:', id)
    await deleteProduct(id)
    if (error) {
      console.log('failed to delete product')
      onProductDelete(`Product ${id} deletion failed`)
    } else {
      onProductDelete(`Product ${id} successfully deleted`)
    }
  }

  return (
    <>
      <IconButton
        aria-label={`delete product button`}
        disableRipple={true}
        disabled={isDeleting}
        onClick={() => handleDeleteProductClick()}
      >
        <RemoveCircleOutlineIcon color={'primary'} fontSize={'large'} />
      </IconButton>
    </>
  )
}
