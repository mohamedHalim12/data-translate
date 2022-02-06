/* eslint-disable camelcase */
import Typography from '@mui/material/Typography';
/**
 * @param {{
 * elRef:import('react').RefObject<HTMLParagraphElement>,
 * text_id:string,
 * text_vo:string,
 * translated_text:string,
 * className:string
 * }} props
 */
export default function TextUntranslated({
  elRef,
  text_id,
  text_vo,
  translated_text,
  className = '',
}) {
  return (
    <Typography
      key={text_id}
      data-id={text_id}
      tabIndex={0}
      component='p'
      ref={elRef}
      className={`${
        translated_text ? 'bg-cyan-100' : 'bg-red-100'
      } bg-opacity-30 cursor-pointer ${className}`}
    >
      {text_vo}
    </Typography>
  );
}
