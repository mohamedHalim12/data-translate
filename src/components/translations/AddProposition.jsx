import GradingTwoToneIcon from '@mui/icons-material/GradingTwoTone';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * @param {{
 *  textLoading: boolean,
 *  propositionLoading: boolean,
 *  selectedSentence:SentenceDataWithId,
 *  mutate: import('swr').KeyedMutator<WaitingQueueData>
 * }} props
 */

export default function AddProposition({
  textLoading,
  selectedSentence,
  mutate,
  propositionLoading,
}) {
  /** @type {import('react').MutableRefObject<HTMLFormElement>} */
  const formRef = useRef(null);
  const [proposedTranslation, setProposedTranslation] = useState('');
  const [exists, setExists] = useState(false);
  useEffect(() => {
    setProposedTranslation(formRef?.current?.proposed.value || '');
  }, []);
  const author = 'Anonyme';
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const data = {
        idText_vo: selectedSentence.text_id,
        translated_text: proposedTranslation,
        translated_by: author,
      };
      /** @type {import('axios').AxiosResponse} */
      let response;
      try {
        response = await axios.post('/api/sentences/proposed', data);
        if ([200, 202].includes(response.status)) {
          setProposedTranslation('');
          e.target.reset();
          mutate();
        }
      } catch (err) {
        // eslint-disable-next-line no-unused-expressions
        String(err.message).endsWith('409') && setExists(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [proposedTranslation, selectedSentence?.text_id],
  );
  return (
    <Box
      autoComplete='off'
      onSubmit={proposedTranslation ? onSubmit : undefined}
      component='form'
      className='flex flex-col gap-0 mt-1'
      ref={formRef}
    >
      <TextField
        className='w-full text-xl border-0 outline-none'
        autoFocus
        sx={{ border: 'none', outline: 'none' }}
        disabled={textLoading || propositionLoading}
        name='proposed'
        type='text'
        defaultValue={proposedTranslation}
        error={exists}
        placeholder='Proposer une traduction'
        onChange={(e) => {
          // eslint-disable-next-line no-unused-expressions
          exists && setExists(false);
          setProposedTranslation(e.target.value);
        }}
        label='Proposer une traductions'
        variant='outlined'
      />
      <Button
        disabled={propositionLoading || !proposedTranslation}
        startIcon={<GradingTwoToneIcon />}
        type='submit'
      >
        Ajouter une traduction
      </Button>
    </Box>
  );
}
