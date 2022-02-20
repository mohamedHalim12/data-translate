import Typography from '@mui/material/Typography';

export default function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Copyright © '}
      <Typography color='secondary' component='strong' className='inline-block'>
        SHIKOMORI taradjam
      </Typography>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
