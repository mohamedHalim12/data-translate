/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import { SaveAltRounded } from '@mui/icons-material';
import { Button, List, ListItem, Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import useSWR from 'swr';

import Copyright from '@/components/Copyright';
import ProTip from '@/components/ProTip';

export default function Index() {
  /**
   * @type {{data:QueriedSentences}}
   * */
  const { data } = useSWR('/api/untranslated/sentences?start=45', (url) =>
    fetch(url).then((res) => res.json()),
  );
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
        <Box className='grid grid-cols-[0.5fr_1fr] gap-3'>
          <List className='bg-white border border-gray-100 w-full'>
            {data.data.map(({ text_vo, text_id }, index) => {
              return (
                <ListItem key={text_id} className='w-full'>
                  <TextVo
                    text_id={text_id}
                    text_vo={text_vo}
                    className={`w-full ${
                      index && 'border-gray-100'
                    } cursor-pointer focus:bg-cyan-50 focus:outline focus:outline-blue-800 hover:bg-cyan-50 hover:`}
                  />
                </ListItem>
              );
            })}
          </List>
          <Stack gap={1}>
            <Translation
              text_id={data.data[0].text_id}
              text_vo={data.data[0].text_vo}
            />
          </Stack>
        </Box>

        <ProTip />
        <Copyright />
        <Button>Clickez moi</Button>
      </Stack>
    </Container>
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
      className={`bg-slate-50 bg-opacity-40 p-2 text-lg ${className}`}
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
