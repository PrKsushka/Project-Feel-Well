import React from 'react';
import styles from './citcleButton.module.scss';

type FunctionForButton = () => React.MouseEvent<HTMLInputElement> | void;
interface CircleButtonTypes {
  clickFunc: FunctionForButton;
  children?: React.ReactChildren;
}

const CircleButton: React.FunctionComponent<CircleButtonTypes> = ({ clickFunc }) => {
  return (
    <button onClick={clickFunc} className={styles.openDir}>
      <div className={styles.lineWrapper}>
        <div className={styles.horizontal}></div>
        <div className={styles.vertical}></div>
      </div>
    </button>
  );
};
export default CircleButton;
