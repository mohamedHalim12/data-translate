/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import style from './burger.module.scss';

export default function BurgerMenu({ onClick, open = true, className = '' }) {
  return (
    <div className={`${style.burger_menu} ${className}`} tabIndex={-1}>
      <input
        type='checkbox'
        id='menu-toggler'
        className={style.burger_menu__checkbox}
        tabIndex={-1}
        checked={open}
      />
      <label
        tabIndex={0}
        onClick={onClick}
        onKeyPress={onClick}
        htmlFor='menu-toggler'
        className={style.burger_menu__label}
        role='button'
      />
    </div>
  );
}
