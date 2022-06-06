import React from 'react';
import styles from './loader.module.scss';

const Loader: React.FunctionComponent = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
};
export default Loader;
