import Image from 'next/image';
import Link from 'next/link';

import logo from '../../public/images/logoBG.png';

const Header = () => (
  <header className='w-full'>
    <nav className='flex justify-between items-center w-full px-4 bg-cyan-50'>
      <div className='text-lg flex gap-3 font-bold'>
        <Link href='/'>
          <a className='nav-element'>Traduire</a>
        </Link>
        <Link href='/'>
          <a className='nav-element'>Valider Traduction</a>
        </Link>
      </div>
      <div>
        <Link href='/'>
          <a className='relative w-[30px] h-[20px]'>
            <Image
              src={logo}
              alt='Logo'
              width={250}
              height={160}
              className='w-full h-full '
              objectFit='cover'
            />
          </a>
        </Link>
      </div>
      <div className='text-lg flex gap-3 font-bold'>
        <Link href='/'>
          <a className='nav-element'>À propos</a>
        </Link>
        <Link href='/'>
          <a className='nav-element'>Contact</a>
        </Link>
      </div>
    </nav>
  </header>
);
export default Header;
