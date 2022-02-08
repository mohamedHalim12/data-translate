/* eslint-disable camelcase */
import Typography from '@mui/material/Typography';
/**
 * @param {{
 * elRef:import('react').RefObject<HTMLParagraphElement>,
 * text_id:string,
 * text_vo:string,
 * translated_text:string,
 * className:string
 * isSelected:boolean
 * onClick:import('react').Dispatch<import('react').SetStateAction<number>>
 * }} props
 */
export default function TextVo({
  elRef,
  text_id,
  text_vo,
  translated_text,
  className = '',
  isSelected,
  onClick,
}) {
  return (
    <Typography
      key={text_id}
      data-id={text_id}
      id={text_id}
      lang='fr'
      tabIndex={0}
      component='p'
      ref={elRef}
      className={`
      ${translated_text ? 'bg-cyan-100' : 'bg-red-100'} 
      ${isSelected && `bg-yellow-100 border-yellow-200 `}
      bg-opacity-30 cursor-pointer ${className}
        
        `}
      onClick={onClick}
    >
      {text_vo}
    </Typography>
  );
}
