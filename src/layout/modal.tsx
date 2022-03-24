import * as React from 'react';
// import { styled, Box } from '@mui/system';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

type Props = {
    children: any
    open: boolean
    setOpen: Function
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 0,
    maxHeight: '500px',
    overflow: 'auto',
  };

export default function ModalBase({ children, open, setOpen }: Props) {
    const handleClose = () => setOpen(false);

    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {children}
        </Box>
      </Modal>
    );
}