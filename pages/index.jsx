/* eslint-disable import/no-unresolved */
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import Copyright from '@/components/Copyright';
import Link from '@/components/Link';
import ProTip from '@/components/ProTip';

export default function Index() {
  return (
    <Container maxWidth='sm'>
      <Box sx={{ my: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom className='z-10'>
          Next.js example
        </Typography>
        <Link href='/about' color='secondary'>
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
