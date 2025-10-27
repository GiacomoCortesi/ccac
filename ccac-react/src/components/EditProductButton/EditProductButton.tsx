import EditIcon from '@mui/icons-material/Edit'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

interface EditProductProps {
  id: string
}

export default function EditProduct({ id }: EditProductProps) {
  return (
    <Link to={`/admin/warehouse/${id}`}>
      <Box style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <EditIcon color={'primary'} fontSize={'large'} />
      </Box>
    </Link>
  )
}
