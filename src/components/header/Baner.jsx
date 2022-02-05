import { Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import logoDark from '@/images/logoDark.png';
import logoLight from '@/images/logoLight.png';

export default function Baner() {
  const [isHovering, setIsHovered] = useState(false);
  const [src, setSrc] = useState(logoDark);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  useEffect(() => {
    if (isHovering) setSrc(logoLight);
    else setSrc(logoDark);
  }, [isHovering]);
  return (
    <Typography
      variant='h4'
      component='h1'
      className='flex justify-center items-center text-cyan-600 bg-cyan-50 text-[2rem] font-bold text-center p-2 m-0'
    >
      <Link href='/'>
        <a className='flex gap-2'>
          <div className='relative w-[110px] flex items-center justify-center'>
            <Image
              src={src}
              alt='Data translate logo'
              className='w-full h-full min-w-full object-cover'
              layout='intrinsic'
              onMouseOver={onMouseEnter}
              onMouseOut={onMouseLeave}
            />
          </div>
          <span className='flex items-center justify-center'>
            Data Translate
          </span>
        </a>
      </Link>
    </Typography>
  );
}
