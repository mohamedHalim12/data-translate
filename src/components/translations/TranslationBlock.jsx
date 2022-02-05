/* eslint-disable camelcase */
import GradingTwoToneIcon from '@mui/icons-material/GradingTwoTone';
import { Button, Skeleton, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

export function TranslationBlock({ isLoading = false, text_id, text_vo }) {
  return (
    <Stack
      gap={0.5}
      key={text_id}
      className='shadow-sm p-1 shadow-black rounded'
    >
      {isLoading ? (
        <Skeleton
          variant='rectangular'
          className='w-full h-[3.75rem] rounded-lg bg-cyan-100'
          animation='wave'
        />
      ) : (
        <Typography
          key={text_id}
          variant='body1'
          component='p'
          className='p-2 bg-opacity-100 rounded bg-cyan-100 text-center text-2xl'
        >
          {text_vo}
        </Typography>
      )}
      <TextField
        className='w-full text-xl border-0 outline-none'
        sx={{ border: 'none', outline: 'none' }}
      />
      <Button disabled={isLoading} startIcon={<GradingTwoToneIcon />}>
        Ajouter une traduction
      </Button>
    </Stack>
  );
}
