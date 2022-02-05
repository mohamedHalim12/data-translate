import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useEffect, useRef } from 'react';

import Transition from './Transition';
/**
 * @typedef {import('react').FC} FC
 * @typedef {import('react').ReactNode} ReactNode
 * @param {{setOpen:Dispatch<SetStateAction<boolean>>, open:boolean, children:ReactNode, title:string}} props
 */

const FZDialog = ({ open = false, setOpen, children, title = '' }) => {
  const handleClose = () => setOpen(false);
  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <div className='dialog'>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        TransitionComponent={Transition}
        className='bg-black bg-opacity-20'
      >
        {title && (
          <DialogTitle>
            <Typography Typography variant='h6'>
              {title}
            </Typography>
          </DialogTitle>
        )}
        <DialogContent className='p-0'>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className='font-bold'>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FZDialog;
