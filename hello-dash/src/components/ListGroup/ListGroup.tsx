import { useState } from 'react';
import './ListGroup.module.css';
import styles from './ListGroup.module.css'


interface Props{
  items: string[];
  heading: string;
  postSelectedItem : (item:string) => void;
};


export default function ListGroup({ items, heading, postSelectedItem } : Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {items.length == 0 && <p>No items found</p>}
      <ul className={styles.container}>
        {items.map((item, i) => (
          <li
            className={'list-group-item ' + (i == selectedIndex ? 'active' : 'inactive')}
            key={i}
            onClick={e => {
              setSelectedIndex(i);
              postSelectedItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
