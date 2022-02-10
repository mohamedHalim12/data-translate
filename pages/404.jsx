import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';

import AppLayout from '@/components/app/AppLayout';
import notFOundImg from '@/images/404-dark.svg';

export default function NotFoundPage() {
  return (
    <AppLayout className='bg-cyan-50 overflow-hidden' contentOverflow>
      <Stack className=' p-8 justify-start items-center lgh:justify-center'>
        <Stack className='gap-6 items-center'>
          <Box
            className={`
              flex items-center justify-center relative max-w-[50rem]
              p-4 w-4/5 rounded-xl bg-yellow-200 text-center 
              after:content-[" "] after:flex after:border-[15px] after:absolute
              after:-bottom-7 after:border-transparent after:border-t-yellow-200
              after:ml-[6rem]
            `}
          >
            <Typography variant='h1' component='h1' fontSize='2rem'>
              <span> Vous venez de prendre un</span>{' '}
              <span className='text-blue-500 font-normal'>chemin</span> qui{' '}
              <span className='text-red-400 font-normal'>
                n&apos;existe pas
              </span>{' '}
              !
            </Typography>
          </Box>

          <Box className='relative w-full'>
            <Image
              src={notFOundImg}
              width={450}
              height={350}
              alt='404 page not found'
            />
          </Box>

          <Box
            className={`
              flex items-center justify-center relative max-w-[50rem]
              p-4 w-4/5 rounded-xl bg-cyan-200 text-center 
              before:content-[" "] before:flex before:border-[15px] before:absolute
              before:-top-7 before:border-transparent before:border-b-cyan-200
              before:ml-[6rem]
            `}
          >
            <Typography variant='h1' component='h1' fontSize='2rem'>
              <span> Ourengué </span>{' '}
              <span className='text-blue-500 font-normal'>ndziya</span> amba{' '}
              <span className='text-red-600 font-normal'> kaysi existé</span> !
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </AppLayout>
  );
}
