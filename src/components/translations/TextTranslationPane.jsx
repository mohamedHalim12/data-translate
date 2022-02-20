/* eslint-disable camelcase */
import { List, Skeleton, Stack, Typography } from '@mui/material';

import { RectangularSkeletonWaves } from '@/components/misc/Skeletons';
import { useProposedTranslation } from '@/hooks/useDataFetching';

import AddProposition from './AddProposition';
import ProposedTranslation from './ProposedTranslation';

/**
 * @param {{
 *   isLoading:boolean,
 *   selectedSentence:SentenceDataWithId
 * }} props
 * */
export default function TextTranslationPane({
  isLoading: textLoading,
  selectedSentence,
}) {
  const res = useProposedTranslation({ tid: selectedSentence?.text_id });
  const { data: proposed, isLoading: propositionLoading, error, mutate } = res;
  return (
    <Stack gap={2} className='p-3 overflow-auto'>
      <Stack gap={0.5} className='shadow-sm p-1 shadow-black rounded'>
        {textLoading ? (
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
        <AddProposition
          textLoading={textLoading}
          selectedSentence={selectedSentence}
          mutate={mutate}
          propositionLoading={propositionLoading}
        />
      </Stack>
      <List className='overflow-y-auto bg-white border border-gray-100 p-0 w-full flex flex-col rounded'>
        {propositionLoading || error ? (
          <RectangularSkeletonWaves length={10} />
        ) : (
          proposed?.propositions?.map(
            ({ propId, translated_by, translated_text, translation_date }) => (
              <ProposedTranslation
                key={propId}
                propId={propId}
                translated_text={translated_text}
                translated_by={translated_by}
                translation_date={translation_date}
              />
            ),
          )
        )}
      </List>
    </Stack>
  );
}
