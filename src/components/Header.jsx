import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import logoLight from '../../public/images/logoD.png';
import logoDark from '../../public/images/logoL.png';

const Header = () => {
  const [isHovering, setIsHovered] = useState(false);
  const [src, setSrc] = useState(logoDark);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  useEffect(() => {
    if (isHovering) setSrc(logoLight);
    else setSrc(logoDark);
  }, [isHovering]);
  return (
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
                src={src}
                alt='Logo'
                width={250}
                height={160}
                className='w-full h-full '
                objectFit='cover'
                onMouseOver={() => onMouseEnter()}
                onMouseOut={() => onMouseLeave()}
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
};

export default Header;
