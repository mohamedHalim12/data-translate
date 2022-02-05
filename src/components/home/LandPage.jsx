import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import GTranslateOutlinedIcon from '@mui/icons-material/GTranslateOutlined';
import { Box, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { useState } from 'react';

import Link from '@/components/misc/Link';
import mainImage from '@/images/mainImage2.png';

import FZDialog from '../misc/Dialog';

const LandPage = () => {
  return (
    <Stack className='w-full xl:flex-row h-full p-2'>
      <section className='flex flex-col gap-3 px-3 h-full items-center smh:justify-center'>
        <Stack>
          <Typography
            variant='h1'
            className=' m-0 p-0 flex gap-2 justify-center items-end text-xl font-bold foont-mono text-center text-white '
          >
            <span className='text-3xl text-amber-500'>SHIKOMORI</span>
            <small>Taradjam</small>
          </Typography>
          <Typography
            variant='body2'
            className='text-[0.98rem] font-mono text-center text-slate-100'
          >
            Une platforme pour la création de donnée en langue comorienne
          </Typography>
        </Stack>
        <Stack className='self-center justify-center gap-1'>
          <Button
            variant='contained'
            component={Link}
            noLinkStyle
            href='/'
            className='bg-green-600 hover:bg-blue-800 font-bold'
            startIcon={<GTranslateOutlinedIcon />}
          >
            Commencer la traduction
          </Button>
          <ExplainModal />
        </Stack>
        <Stack gap={1} className=' md:max-w-[90%] items-center '>
          <Typography
            variant='body2'
            className='font-serif text-center text-xl text-slate-100'
          >
            Ce projet consiste, à partir de phrases en langues{' '}
            <span className='text-yellow-400 font-semibold text-[1.2rem]'>
              française
            </span>
            , de recevoir des propositions de traduction en langue{' '}
            <span className='text-green-400 font-semibold text-[1.2rem]'>
              comorienne
            </span>
            , pour crée un dataset de données des deux langues.
          </Typography>
        </Stack>
      </section>
    </Stack>
  );
};

export default LandPage;
function ExplainModal() {
  const [open, setOpen] = useState(false);
  return (
    <Box className='flex justify-center'>
      <Button
        variant='oulined'
        onClick={() => setOpen(true)}
        startIcon={<EmojiObjectsOutlinedIcon />}
        className=' bg-opacity-60 text-white text-[.68rem] hover:bg-yellow-500 font-bold hover:text-white w-max'
      >
        Comment ça marche ?
      </Button>
      <FZDialog setOpen={setOpen} open={open} title='Comment ça marche?'>
        <section className='w-full flex p-3 bg-cyan-800'>
          <div className='relative w-full flex  grow justify-center lg:w-9/12  '>
            <Image
              className='w-full object-cover  '
              src={mainImage}
              alt='Illustration du processus'
            />
          </div>
        </section>
      </FZDialog>
    </Box>
  );
}
