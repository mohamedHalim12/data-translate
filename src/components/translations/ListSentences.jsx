/* eslint-disable camelcase */
import { List, ListItem, Skeleton } from '@mui/material';
import Typography from '@mui/material/Typography';

/**
 * @param {{
 *  values: SentenceData[],
 *  isLoading: boolean,
 *  className: string,
 * }}
 * */
export function ListSentences({ isLoading = false, values, className = '' }) {
  return (
    <List
      className={`bg-white border border-gray-100 w-full flex flex-col ${className}`}
    >
      {isLoading ? (
        <RectangularSkeletonWaves />
      ) : (
        values.map(({ text_vo, text_id, translated_text }) => {
          return (
            <ListItem key={text_id} className='w-full  p-2 flex flex-col'>
              <TextVo
                text_id={text_id}
                text_vo={text_vo}
                translated_text={translated_text}
                className={`w-full focus:bg-cyan-50 border-2 border-transparent
                focus:border-blue-800 hover:bg-cyan-50 p-1 `}
              />
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
        className='w-full h-[3rem] rounded-lg bg-gray-100'
        animation='wave'
      />
    </ListItem>
  ));
}

function TextVo({ text_id, text_vo, translated_text, className = '' }) {
  return (
    <Typography
      key={text_id}
      data-id={text_id}
      tabIndex={0}
      className={`${
        translated_text ? 'bg-cyan-100' : 'bg-red-100'
      } bg-opacity-30 cursor-pointer ${className}`}
    >
      {text_vo}
    </Typography>
  );
}
