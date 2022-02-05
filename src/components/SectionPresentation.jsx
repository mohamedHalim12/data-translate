import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Image from 'next/image';

import Link from '@/components/Link';

import mainImage from '../../public/images/mainImage2.png';

const SectionPresentation = () => {
  return (
    <Stack className='w-full p-1 xl:flex-row'>
      <section className='flex flex-col gap-5 p-3 '>
        <div className='flex flex-col '>
          <h1 className='text-2xl font-mono text-white'>
            <span className='text-6xl text-amber-500'>SHIKOMORI</span>
            Taradjam
          </h1>
          <p className='font-serif text-white italic'>
            Une platforme pour la création de donnée en langue comorienne
          </p>
        </div>
        <div className='flex flex-col gap-1 md:max-w-[90%] '>
          <p className='font-serif text-white text-xl  font-medium' text-white>
            Ce projet consiste, à partir de phrases en langues français, de
            recevoir des propositions de traduction en langue comorienne, pour
            crée un <span>dataset </span> de données des deux langues.
          </p>
          <p className='font-serif text-white italic'>
            Pour savoir un peu plus sur l&apos;utilité de tels données, consulté
            cette articles;
          </p>
        </div>
        <div className='self-center'>
          <Button variant='contained' component={Link} noLinkStyle href='/'>
            Commencer la traduction
          </Button>
        </div>
      </section>
      <section className='w-full flex  p-3'>
        <div className='relative w-full flex  grow justify-center lg:w-9/12  '>
          <Image
            className='w-full object-cover  '
            src={mainImage}
            alt='Illustration du processus'
          />
        </div>
      </section>
    </Stack>
  );
};

export default SectionPresentation;
