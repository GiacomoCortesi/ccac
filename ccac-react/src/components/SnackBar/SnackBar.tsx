import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ShopSnackBarProps {
    open: boolean
    message: string
    handleClose: any;
}
export default function ShopSnackbar(props: ShopSnackBarProps) {
    const {open, message, handleClose} = props;
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={message}
                action={action}
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            />
        </div>
    );
}
