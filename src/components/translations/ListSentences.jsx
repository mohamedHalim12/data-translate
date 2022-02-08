/* eslint-disable camelcase */
import { List, ListItem, Skeleton } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useSentences } from '@/hooks/useDataFetching';

import TextVo from './TextVo';

/**
 * @param {{
 *  values: SentenceData[],
 *  isLoading: boolean,
 *  className: string,
 * }}
 * */
export function ListSentences({ className = '' }) {
  const [start, setStart] = useState(58);
  const observer = useRef();

  const { isLoading, data } = useSentences({
    variant: 'both',
    start,
    limit: 10,
  });
  const [sentences, setSentences] = useState([]);
  useEffect(() => {
    if (data)
      setSentences([...new Set([...sentences, ...(data ? data.data : [])])]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const lastSentenceRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setStart(start + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, start],
  );
  return (
    <List
      className={`bg-white border border-gray-100 w-full flex flex-col ${className}`}
    >
      {isLoading ? (
        <RectangularSkeletonWaves />
      ) : (
        sentences.map(({ text_vo, text_id, translated_text }, index) => {
          return (
            <ListItem key={text_id} className='w-full  p-2 flex flex-col'>
              {index === sentences.length - 1 ? (
                <TextVo
                  elRef={lastSentenceRef}
                  text_id={text_id}
                  text_vo={text_vo}
                  translated_text={translated_text}
                  className={`w-full focus:bg-cyan-50 border-2 border-transparent
                focus:border-blue-800 hover:bg-cyan-50 p-1 `}
                />
              ) : (
                <TextVo
                  text_id={text_id}
                  text_vo={text_vo}
                  translated_text={translated_text}
                  className={`w-full focus:bg-cyan-50 border-2 border-transparent
                focus:border-blue-800 hover:bg-cyan-50 p-1 `}
                />
              )}
            </ListItem>
          );
        })
      )}
    </List>
  );
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
