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
  return (
    <Container className='absolute top-0 left-0 max-w-none w-full h-full p-0 m-0 overflow-hidden'>
      <Container className='grid max-w-none grid-rows-[auto_1fr] border-l  border-gray-50 p-0 w-full h-full overflow-hidden'>
        <Header />
        <Stack gap={0} className='overflow-hidden'>
          {children}
          <Copyright />
        </Stack>
      </Container>
    </Container>
  );
}