import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { IconButton } from '@mui/material'
import { useDeleteProduct } from '../../services/api-product-service'

interface DeleteProductsProps {
  idList: string[]
  onProductDelete: (message: string) => void
}

export default function DeleteProducts({ idList, onProductDelete }: DeleteProductsProps) {
  const { deleteProduct, isDeleting, error } = useDeleteProduct()
  const deleteSingleProduct = async (id: string) => {
    await deleteProduct(id)
    if (error) {
      console.log('failed to delete product')
      onProductDelete(`Product ${id} deletion failed`)
    } else {
      onProductDelete(`Product ${id} successfully deleted`)
    }
  }
  const handleDeleteProductsClick = (idList: string[]) => {
    console.log('delete selected clicked ', idList)
    idList.map((id: string) => {
      deleteSingleProduct(id)
    })
  }

  return (
    <>
      <IconButton
        aria-label={`delete products button`}
        disableRipple={true}
        disabled={isDeleting}
        onClick={() => handleDeleteProductsClick(idList)}
      >
        <RemoveCircleOutlineIcon color={'primary'} fontSize={'large'} />
      </IconButton>
    </>
  )
}
