/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import { Button, Stack, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/styles';
import { useCallback, useEffect, useState } from 'react';
import { useRandomSentences } from 'src/hooks/hooks';

import AppLayout from '@/components/app/AppLayout';
import FZDialog from '@/components/misc/Dialog';
import { ListSentences } from '@/components/translations/ListSentences';
import { TranslationBlock } from '@/components/translations/TranslationBlock';

export default function Index() {
  const result = useRandomSentences({ variant: 'both', start: 1, limit: 10 });
  const {
    data: { data },
    loading,
  } = result;

  const [open, setOpen] = useState(false);
  const handleClick = useCallback(() => setOpen(!open), [open]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('tablet'));
  useEffect(() => setOpen(matches ? false : open || false), [matches, open]);
  return (
    <AppLayout>
      <Button
        size='small'
        aria-label='Navbar menu'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleClick}
        color='inherit'
        className='self-end my-1'
        tooltip='Menu'
        startIcon={<MenuOpenRoundedIcon className='text-5xl' />}
        sx={{ display: { tablet: 'none' } }}
      >
        Voir les phrases
      </Button>
      <Box className='grid grid-cols-1 sm:grid-cols-[1fr_0.5fr] gap-2'>
        <Stack gap={0.5} className='p-3'>
          <TranslationBlock
            isLoading={loading}
            text_id={data && data[0].text_id}
            text_vo={data && data[0].text_vo}
          />
        </Stack>

        {/* ListSentences rendered in small screen */}
        <FZDialog
          open={open}
          setOpen={setOpen}
          sx={{ display: { xs: 'flex', tablet: 'none' } }}
        >
          <ListSentences isLoading={loading} values={data?.data} />
        </FZDialog>

        {/* ListSentences Rendered if screen size > 640px */}
        <Box sx={{ display: { tablet: 'block', xs: 'none' } }}>
          <ListSentences isLoading={loading} values={data} />
        </Box>
        {/* Rendered if screen size  640px */}
      </Box>
    </AppLayout>
  );
}
