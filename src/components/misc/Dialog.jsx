import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useEffect, useRef } from 'react';

import Transition from './Transition';
/**
 * @typedef {import('react').FC} FC
 * @typedef {import('react').ReactNode} ReactNode
 * @param {{setOpen:Dispatch<SetStateAction<boolean>>, open:boolean, children:ReactNode}} props
 * @type {FC}
 */

const FZDialog = ({ open = false, setOpen, children }) => {
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
      >
        <DialogContent className='p-0'>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FZDialog;
