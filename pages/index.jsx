/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import { SaveAltRounded } from '@mui/icons-material';
import { Button, List, ListItem, Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';

import BurgerMenu from '@/components/Burger/BurgerMenu';
import Copyright from '@/components/misc/Copyright';
import FZDialog from '@/components/misc/Dialog';

export default function Index() {
  /**
   * @type {{data:QueriedSentences}}
   * */
  const { data } = useSWR('/api/untranslated/sentences?start=45', (url) =>
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
    <Container maxWidth='xl' className='py-6'>
      <Stack gap={2}>
        <Typography
          variant='h4'
          component='h1'
          className='text-white bg-cyan-500 text-[3rem] text-center py-2'
        >
          Data Translate
        </Typography>
        {!isDesktop && <BurgerMenu onClick={handleClick} open={open} />}
        <Box className='grid grid-cols-1 sm:grid-cols-[0.5fr_1fr] gap-3'>
          {isDesktop ? (
            <ListSentences values={data.data} />
          ) : (
            <FZDialog open={open} setOpen={setOpen}>
              <ListSentences values={data.data} />
            </FZDialog>
          )}
          <Stack gap={1}>
            <Translation
              text_id={data.data[0].text_id}
              text_vo={data.data[0].text_vo}
            />
          </Stack>
        </Box>

        <Copyright />
      </Stack>
    </Container>
  );
}

/**
 * @param {{values:QueriedSentences}}
 * */
function ListSentences({ values }) {
  return (
    <List className='bg-white border border-gray-100 w-full'>
      {values.map(({ text_vo, text_id }) => {
        return (
          <ListItem key={text_id} className={`w-full  `}>
            <TextVo
              text_id={text_id}
              text_vo={text_vo}
              className={`w-full focus:bg-cyan-50 focus:outline
                focus:outline-blue-800 hover:bg-cyan-50`}
            />
          </ListItem>
        );
      })}
    </List>
  );
}

function TextVo({ text_id, text_vo, className }) {
  return (
    <Typography
      key={text_id}
      variant='body1'
      component='p'
      data-id={text_id}
      tabIndex={0}
      className={`bg-slate-100 bg-opacity-30 p-2 text-lg  
                cursor-pointer  ${className}`}
    >
      {text_vo}
    </Typography>
  );
}

function Translation({ text_id, text_vo }) {
  return (
    <Stack
      gap={0.5}
      key={text_id}
      className='shadow-sm p-1 shadow-black rounded'
    >
      <Typography
        key={text_id}
        variant='body1'
        component='p'
        className='p-2 bg-opacity-100 rounded bg-cyan-100 text-center text-2xl'
      >
        {text_vo}
      </Typography>
      <TextField
        className='w-full text-xl border-0 outline-none'
        sx={{ border: 'none', outline: 'none' }}
      />
      <Button startIcon={<SaveAltRounded />}>Enregistrer</Button>
    </Stack>
  );
}
