import style from './dots-loaders.module.scss';

export default function DotsLoader({ alone = false }) {
  return (
    <div
      className={`
        relative flex items-center justify-center
        ${alone && ' absolute top-0 left-0 w-full h-full'}
      `}
    >
      <div className='flex items-center gap-[.1rem]'>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className={style.dot} />
          ))}
      </div>
    </div>
  );
}
