import styles from './energyBlock.module.scss';
import React, { ReactNode } from 'react';
import { ProductElement } from '../../store/types';

interface EnergyBlockTypes {
  findRecipe: ProductElement,
  children?: ReactNode;
}

const EnergyBlock: React.FunctionComponent<EnergyBlockTypes> = ({ findRecipe }) => {
  return (
    <div className={styles.energyWrapper}>

      <div className={styles.title}>ЭНЕРГЕТИЧЕСКАЯ ЦЕННОСТЬ НА ПОРЦИЮ</div>
      <div className={styles.energyBlock}>
        <span>калорийность</span>
        <span>{findRecipe.kcal}</span>
        <span>ккал</span>
      </div>
      <div className={styles.energyBlock}>
        <span>калорийность</span>
        <span>{findRecipe.kcal}</span>
        <span>ккал</span>
      </div>
      <div className={styles.energyBlock}>
        <span>калорийность</span>
        <span>{findRecipe.kcal}</span>
        <span>ккал</span>
      </div>
      <div className={styles.energyBlock}>
        <span>калорийность</span>
        <span>{findRecipe.kcal}</span>
        <span>ккал</span>
      </div>
    </div>
  );
};
export default EnergyBlock;