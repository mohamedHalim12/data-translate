import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import AppLayout from '@/components/app/AppLayout';
import FZDialog from '@/components/misc/Dialog';
import DotsLoader from '@/components/spinners/dots';

export default function DialogLayouted() {
  return (
    <AppLayout>
      <DotsLoader alone />
      <FZDialog closeBtnText="D'accord" open closeOnlyOnBtnClick>
        <Box className='flex justify-center items-center p-5 pb-0max-w-md'>
          <Typography
            variant='body1'
            className='text-center text-lg text-[1.3rem]'
          >
            Le contenu de la page demandé n&apos;existe pas.
          </Typography>
        </Box>
      </FZDialog>
    </AppLayout>
  );
}
