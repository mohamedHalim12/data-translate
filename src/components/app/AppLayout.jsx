import { Stack } from '@mui/material';
import Container from '@mui/material/Container';

import Header from '@/components/header/Header';
import Copyright from '@/components/misc/Copyright';

/**
 * import th FC from react jsdoc
 * @typedef {import('react').ReactChildren} Children
 * @param {{children: Children, isLoading?:boolean}} props
 */

export default function AppLayout({ children /* , isLoading = false */ }) {
  // if (!isLoading) return <div>Loading...</div>;
  return (
    <Container className='absolute top-0 left-0 w-full h-full p-0 m-0 '>
      <Container className='grid grid-rows-[auto_1fr] p-0 w-full'>
        <Header />
        <Stack gap={0}>
          {children}
          <Copyright />
        </Stack>
      </Container>
    </Container>
  );
}
