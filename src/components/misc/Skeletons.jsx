import { ListItem, Skeleton } from '@mui/material';

export function RectangularSkeletonWaves({ length = 10 }) {
  return Array.from({ length }).map((_, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <ListItem key={`sk-${i}_${_}`} className='w-full p-2 flex flex-col'>
      <Skeleton
        variant='rectangular'
        className='grow w-full h-[3rem] rounded-lg bg-gray-100'
        animation='wave'
      />
    </ListItem>
  ));
}
