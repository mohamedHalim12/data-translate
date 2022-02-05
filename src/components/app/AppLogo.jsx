import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Link from 'next/link';
// jsdoc import for SxProps<Theme>

/**
 * @typedef { import('@mui/material').SxProps<Theme> } SxProps
 *
 * @param {{sx?:SxProps, size?: "small"|"medium"|"large"|"xlarge"|"2xl", borderBase?:boolean, className?:string}} props
 */

export default function AppLogo({
  sx,
  size = 'small',
  borderBase = false,
  className = '',
}) {
  const logoClass = {
    small: {
      parent: ' gap-[0.5]',
      title: 'text-xl',
      subTitle: 'text-[.78rem]',
    },
    medium: {
      parent: 'gap-2',
      title: 'text-3xl',
      subTitle: 'text-xl',
    },
    large: {
      parent: 'gap-2',
      title: 'text-4xl',
      subTitle: 'text-2xl',
    },
    xlarge: {
      parent: 'gap-2',
      title: 'text-5xl',
      subTitle: 'text-2xl',
    },
    '2xl': {
      parent: 'gap-2',
      title: 'text-6xl',
      subTitle: 'text-2xl',
    },
  };

  const clsParent = logoClass[size].parent;
  const clsTitle = logoClass[size].title;
  const clsSubTitle = logoClass[size].subTitle;
  return (
    <Box sx={sx}>
      <Link href='/'>
        <a className='flex justify-center items-center'>
          <Typography
            variant='h1'
            className={`flex justify-center items-baseline font-bold 
            font-mono text-center text-white
            ${borderBase && 'border-r-2 pr-2 border-slate-100'}  
             ${clsParent}  ${className} `}
          >
            <span className={`${clsTitle} text-amber-400 `}>SHIKOMORI</span>
            <small className={`${clsSubTitle} font-normal`}>Taradjam</small>
          </Typography>
        </a>
      </Link>
    </Box>
  );
}
