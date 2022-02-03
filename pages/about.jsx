import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Copyright from '@/components/misc/Copyright';
import Link from '@/components/misc/Link';

export default function About() {
  return (
    <Container maxWidth='sm'>
      <Box sx={{ my: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Next.js example
        </Typography>
        <Button variant='contained' component={Link} noLinkStyle href='/'>
          Go to the main page
        </Button>
        <Copyright />
      </Box>
    </Container>
  );
}
