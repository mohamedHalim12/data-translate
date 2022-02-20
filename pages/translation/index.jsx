/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import 'dayjs/locale/fr';

import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import { Box, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useCallback, useEffect, useState } from 'react';

import AppLayout from '@/components/app/AppLayout';
import FZDialog from '@/components/misc/Dialog';
import ListOfSentences from '@/components/translations/ListOfSentences';
import TextTranslationPane from '@/components/translations/TextTranslationPane';
import useInfiniteSentences from '@/hooks/useInfiniteSentences';

dayjs.extend(relativeTime);
dayjs.locale('fr');

export default function Index() {
  const [open, setOpen] = useState(false);
  const handleClick = useCallback(() => setOpen(!open), [open]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('tablet'));
  useEffect(() => setOpen(matches ? false : open || false), [matches, open]);
  const response = useInfiniteSentences({ limit: 10, startCount: 1 });
  const { isLoading, data, setSize, size, isReachingEnd } = response;

  const sentencesRes = useSentences(data);
  const [selectedSentence, sentences, selected, setSelected] = sentencesRes;
  const UsableListOfSentences = useCallback(
    () => (
      <ListOfSentences
        isLoading={isLoading}
        isReachingEnd={isReachingEnd}
        sentences={sentences}
        selected={selected}
        setSelected={setSelected}
        onLoadMore={() => {
          setSize(size + 1);
          localStorage.setItem('size', size);
        }}
        onClick={() => setOpen(false)}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sentences],
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
          <UsableListOfSentences />
        </FZDialog>
        {/* ListSentences Rendered if screen size > 640px */}
        <Box
          sx={{ overflow: 'auto', display: { tablet: 'block', xs: 'none' } }}
        >
          <UsableListOfSentences />
        </Box>
      </Box>
    </AppLayout>
  );
}

/** @param {ResponseSentences[]} dataSentences */
function useSentences(dataSentences = []) {
  /** @type {SentenceDataWithId[]} */
  const sentences = [];
  let selectedIndex;
  if (typeof window !== 'undefined') {
    selectedIndex = Number(localStorage.getItem('selectedIndex')) || 0;
  }
  const [selected, setSelected] = useState(selectedIndex ?? 0);
  dataSentences.forEach(({ data }) => sentences.push(...data));
  const selectedSentence =
    sentences[selected >= 0 && selected < sentences.length ? selected : 0];
  return [selectedSentence, sentences, selected, setSelected];
}
