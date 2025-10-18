import React from 'react';

import styles from './Button.module.css'

interface Props {
  children: string;
  color?: 'primary' | 'secondary' | 'danger' | 'info';
  onClick? : ()=>void;
}

export default function Button({children=" ", color="primary", onClick} : Props){
  return <button
    type="button"
    className={ [ styles.btn, styles['btn-' + color]].join(' ')}
    // className= {"btn btn-" + color}
    onClick={onClick}
  >
    {children}
  </button>;
};