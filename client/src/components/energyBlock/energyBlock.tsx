import styles from './energyBlock.module.scss';
import React, { ReactNode } from 'react';
import { RecipeTypes } from '../../store/types/recipes.types';

interface EnergyBlockTypes {
  findRecipe: RecipeTypes;
  children?: ReactNode;
}

const EnergyBlock: React.FunctionComponent<EnergyBlockTypes> = ({ findRecipe }) => {
  return (
    <div className={styles.energyWrapper}>
      <div className={styles.title}>ЭНЕРГЕТИЧЕСКАЯ ЦЕННОСТЬ НА ПОРЦИЮ</div>
      <div className={styles.wrapperForEnergyBlock}>
        <div className={styles.energyBlock}>
          <span>калорийность</span>
          <span className={styles.count}>{findRecipe.kcal}</span>
          <span>ккал</span>
        </div>
        <div className={styles.energyBlock}>
          <span>жиры</span>
          <span className={styles.count}>{findRecipe.fats}</span>
          <span>грамм</span>
        </div>
        <div className={styles.energyBlock}>
          <span>белки</span>
          <span className={styles.count}>{findRecipe.proteins}</span>
          <span>грамм</span>
        </div>
        <div className={styles.energyBlock}>
          <span>углеводы</span>
          <span className={styles.count}>{findRecipe.carbohydrate}</span>
          <span>грамм</span>
        </div>
      </div>
    </div>
  );
};
export default EnergyBlock;
