/* eslint-disable camelcase */
import AutorenewIcon from '@mui/icons-material/Autorenew';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import Image from 'next/image';

import TextVo from '@/components/translations/TextVo';
import emptyList from '@/images/empty-list.svg';

import { RectangularSkeletonWaves } from '../misc/Skeletons';

export default function ListOfSentences({
  isLoading,
  sentences,
  selected,
  setSelected,
  onLoadMore,
  isReachingEnd,
  onClick,
}) {
  const emptyFunction = () => {};
  if (isReachingEnd) return <EmptyListIllustration />;
  return (
    <List className='bg-white border border-gray-100 w-full flex flex-col'>
      {isLoading ? (
        <RectangularSkeletonWaves length={10} />
      ) : (
        sentences.map(({ text_id, text_vo, translated_text }, index) => {
          return (
            <ListItem className='w-full  p-2 flex flex-col' key={text_id}>
              <TextVo
                text_id={text_id}
                text_vo={text_vo}
                translated_text={translated_text}
                isSelected={selected === index}
                onClick={() => {
                  setSelected(index);
                  localStorage.setItem('selectedIndex', index);
                  localStorage.setItem('text_id', text_id);
                  onClick();
                }}
                className={`
                      rounded w-full border-2 border-transparent p-1 
                     hover:bg-cyan-50 focus:outline-blue-300 outline-2 
                      focus:outline focus:border-blue-200 focus:bg-yellow-50
                    `}
              />
            </ListItem>
          );
        })
      )}
      <ListItem className='flex-col p-0 text-center flex justify-center w-full '>
        <Button
          disabled={isLoading}
          variant='text'
          startIcon={isLoading ? <LoadingAnimateIcon /> : <MoreSentencesIcon />}
          onClick={isLoading ? emptyFunction : onLoadMore}
          className={`text-[.82rem] text-cyan-600 hover:bg-cyan-100 
              hover:text-cyan-700 w-full 
              ${isLoading && 'cursor-not-allowed'}`}
        >
          {isLoading ? 'Chargement...' : 'Charger plus de phrases'}
        </Button>
      </ListItem>
    </List>
  );
}

function EmptyListIllustration() {
  return (
    <Box className='border-gray-100 relative w-full h-full flex flex-col justify-center items-center '>
      <Box className='absolute z-20 p-2 bg-opacity-70'>
        <Typography className='text-center text-md font-bold w-full'>
          La liste des phrases est vide.
        </Typography>
      </Box>
      <Box className='relative p-4 flex items-center justify-center bg-cyan-50  bg-opacity-25'>
        <Box className='overlay absolute top-0 left-0 w-full h-full bg-cyan-50 z-10 bg-opacity-20' />
        <Image
          src={emptyList}
          alt='Empty list illustration'
          className='object-contain w-full h-full bg-opacity-50'
        />
      </Box>
    </Box>
  );
}

function MoreSentencesIcon() {
  return <GraphicEqIcon className='rotate-90' />;
}

function LoadingAnimateIcon() {
  return <AutorenewIcon className='animate-spin ' />;
}
