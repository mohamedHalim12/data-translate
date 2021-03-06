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
 * @typedef {import("react").FC} FC
 * @typedef {import("react").ReactNode} ReactNode
 * @param {{
 *  setOpen:Dispatch<SetStateAction<boolean>>,
 *  open:boolean,
 *  children:ReactNode,
 *  title:string,
 *  sx?:import("@mui/material").SxProps<import("@mui/material").Theme>
 *  closeBtnText?:string,
 *  CloseButtonComponent?: Button | typeof Button,
 *  closeOnlyOnBtnClick?:boolean
 * }} props
 */

const FZDialog = ({
  open = false,
  setOpen = () => {},
  children,
  title = '',
  sx,
  closeBtnText = 'Fermer',
  CloseButtonComponent = Button,
  closeOnlyOnBtnClick = false,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
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
    <Dialog
      open={open}
      onClose={!closeOnlyOnBtnClick ? handleClose : () => {}}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
      TransitionComponent={Transition}
      className='bg-black bg-opacity-20'
      sx={sx}
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
        <CloseButtonComponent onClick={handleClose} className='font-bold'>
          {closeBtnText}
        </CloseButtonComponent>
      </DialogActions>
    </Dialog>
  );
};

export default FZDialog;
