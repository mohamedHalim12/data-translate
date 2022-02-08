/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import AutorenewIcon from '@mui/icons-material/Autorenew';
import GradingTwoToneIcon from '@mui/icons-material/GradingTwoTone';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import {
  Button,
  List,
  ListItem,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/styles';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import AppLayout from '@/components/app/AppLayout';
import FZDialog from '@/components/misc/Dialog';
import TextVo from '@/components/translations/TextVo';
import useInfiniteSentences from '@/hooks/useInfiniteSentences';
import emptyList from '@/images/empty-list.svg';

export default function Index() {
  const [open, setOpen] = useState(false);
  const handleClick = useCallback(() => setOpen(!open), [open]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('tablet'));
  useEffect(() => setOpen(matches ? false : open || false), [matches, open]);
  const response = useInfiniteSentences({ limit: 10, startCursor: 1 });
  const { isLoading, data, setSize, size, isReachingEnd } = response;
  const [selected, setSelected] = useState(0);
  /** @type {SentenceDataWithId[]} */
  const sentences = [];
  if (data) data.forEach(({ data: d = [] }) => sentences.push(...d));
  const selectedSentence =
    sentences[selected >= 0 && selected < sentences.length ? selected : 0];

  const UsableListOfSintences = useCallback(
    () => (
      <ListOfSintences
        isLoading={isLoading}
        isReachingEnd={isReachingEnd}
        sentences={sentences}
        selected={selected}
        setSelected={setSelected}
        onLoadMore={() => setSize(size + 1)}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, selected, sentences],
  );

  return (
    <AppLayout>
      <Button
        size='small'
        aria-label='Sentences list'
        onClick={handleClick}
        color='inherit'
        className='self-end my-1'
        startIcon={<MenuOpenRoundedIcon className='text-5xl' />}
        sx={{ display: { tablet: 'none' } }}
      >
        Voir les phrases
      </Button>
      <Box className='grid grid-cols-1 sm:grid-cols-[1fr_0.5fr] gap-2 overflow-hidden'>
        <TextTranslationPane
          isLoading={isLoading}
          selectedSentence={selectedSentence}
        />
        {/* ListSentences rendered in small screen */}
        <FZDialog
          open={open}
          setOpen={setOpen}
          sx={{ display: { xs: 'flex', tablet: 'none' } }}
        >
          <UsableListOfSintences />
        </FZDialog>
        {/* ListSentences Rendered if screen size > 640px */}
        <Box
          sx={{ overflow: 'auto', display: { tablet: 'block', xs: 'none' } }}
        >
          <UsableListOfSintences />
        </Box>
      </Box>
    </AppLayout>
  );
}

function TextTranslationPane({ isLoading, selectedSentence }) {
  return (
    <Box gap={0.5} className='p-3'>
      <Stack gap={0.5} className='shadow-sm p-1 shadow-black rounded'>
        {isLoading ? (
          <Skeleton
            variant='rectangular'
            className='w-full h-[3.75rem] rounded-lg bg-cyan-100'
            animation='wave'
          />
        ) : (
          <Typography
            variant='body1'
            component='p'
            className='p-2 bg-opacity-100 rounded bg-cyan-100 text-center text-2xl'
          >
            {selectedSentence.text_vo}
          </Typography>
        )}
        <TextField
          className='w-full text-xl border-0 outline-none'
          sx={{ border: 'none', outline: 'none' }}
        />
        <Button disabled={isLoading} startIcon={<GradingTwoToneIcon />}>
          Ajouter une traduction
        </Button>
      </Stack>
    </Box>
  );
}

function ListOfSintences({
  isLoading,
  sentences,
  selected,
  setSelected,
  onLoadMore,
  isReachingEnd,
}) {
  const emptyFunction = () => {};
  if (isReachingEnd)
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

  return (
    <List className='bg-white border border-gray-100 w-full flex flex-col'>
      {isLoading ? (
        <RectangularSkeletonWaves length={10} />
      ) : (
        sentences.map(({ text_id, text_vo, translated_text }, index) => (
          <ListItem className='w-full  p-2 flex flex-col' key={text_id}>
            <TextVo
              text_id={text_id}
              text_vo={text_vo}
              translated_text={translated_text}
              isSelected={selected === index}
              onClick={() => setSelected(index)}
              className={`
                      rounded w-full border-2 border-transparent p-1 
                     hover:bg-cyan-50 focus:outline-blue-300 outline-2 
                      focus:outline focus:border-blue-200 focus:bg-yellow-50
                    `}
            />
          </ListItem>
        ))
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

function MoreSentencesIcon() {
  return <GraphicEqIcon className='rotate-90' />;
}

function LoadingAnimateIcon() {
  return <AutorenewIcon className='animate-spin ' />;
}

function RectangularSkeletonWaves({ length = 10 }) {
  return Array.from({ length }).map((_, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <ListItem key={`sk-${i}_${_}`} className='w-full p-2 flex flex-col'>
      <Skeleton
        variant='rectangular'
        className='grow w-[80vw] h-[3rem] rounded-lg bg-gray-100'
        animation='wave'
      />
    </ListItem>
  ));
}
