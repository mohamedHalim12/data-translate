/* eslint-disable camelcase */
import { List, ListItem } from '@mui/material';
import Typography from '@mui/material/Typography';

/**
 * @param {{values:SentenceData[]}}
 * */
export function ListSentences({ values, className = '' }) {
  return (
    <List
      className={`bg-white border border-gray-100 w-full flex flex-col ${className}`}
    >
      {values.map(({ text_vo, text_id, translated_text }) => {
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
      })}
    </List>
  );
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
