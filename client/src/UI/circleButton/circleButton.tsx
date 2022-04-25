import React from 'react';
import styles from './citcleButton.module.scss';

interface CircleButtonTypes {
  id?: number;
  clickFunc(id?: number): (e?: React.SyntheticEvent) => void;
  children?: React.ReactChildren;
}

const CircleButton: React.FunctionComponent<CircleButtonTypes> = ({ clickFunc, id }) => {
  return (
    <button onClick={clickFunc(id)} className={styles.openDir}>
      <div className={styles.lineWrapper}>
        <div className={styles.horizontal}></div>
        <div className={styles.vertical}></div>
      </div>
    </button>
  );
};
export default CircleButton;
