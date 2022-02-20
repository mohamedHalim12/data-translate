import { Container } from '@mui/material';

import Header from '@/components/header/Header';
import LandPage from '@/components/home/LandPage';

export default function Main() {
  return (
    <Container className='max-w-none absolute top-0 left-0 h-full smh:overflow-hidden overflow-auto p-0 w-full bg-hero-pattern bg-no-repeat bg-fixed'>
      <Header />
      <LandPage />
    </Container>
  );
}
