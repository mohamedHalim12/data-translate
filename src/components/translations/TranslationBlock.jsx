/* eslint-disable camelcase */
import GradingTwoToneIcon from '@mui/icons-material/GradingTwoTone';
import { Button, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

export function TranslationBlock({ text_id, text_vo }) {
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
      <Button startIcon={<GradingTwoToneIcon />}>Ajouter une traduction</Button>
    </Stack>
  );
}
