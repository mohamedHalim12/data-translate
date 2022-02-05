/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import { Button, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';

import AppLayout from '@/components/app/AppLayout';
import FZDialog from '@/components/misc/Dialog';
import { ListSentences } from '@/components/translations/ListSentences';
import { TranslationBlock } from '@/components/translations/TranslationBlock';

export default function Index() {
  /**
   * @type {{data:QueriedSentences}}
   * */
  const { data } = useSWR('/api/untranslated/sentences?start=1', (url) =>
    fetch(url).then((res) => res.json()),
  );
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const handleClick = useCallback(() => {
    setOpen(!open);
  }, [open]);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 640px)');
    const swithLayout = (m) => {
      if (m.matches) {
        setOpen(false);
        setIsDesktop(true);
      } else {
        setOpen(open || false);
        setIsDesktop(false);
      }
    };
    media.addEventListener('change', swithLayout);
    swithLayout(media);
  });
  if (!data) return <div>Loading...</div>;
  return (
    <AppLayout>
      {!isDesktop && (
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
        >
          Voir les phrases
        </Button>
      )}
      <Box className='grid grid-cols-1 sm:grid-cols-[1fr_0.5fr] gap-2'>
        <Stack gap={0.5} className='p-3'>
          <TranslationBlock
            text_id={data.data[0].text_id}
            text_vo={data.data[0].text_vo}
          />
        </Stack>
        {isDesktop ? (
          <Box>
            <ListSentences values={data.data} />
          </Box>
        ) : (
          <FZDialog open={open} setOpen={setOpen}>
            <ListSentences values={data.data} />
          </FZDialog>
        )}
      </Box>
    </AppLayout>
  );
}
