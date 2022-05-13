import styles from './card.module.scss';
import React, { ReactNode } from 'react';
import { PlaceElement } from '../../store/types/types';
import '../../pages/recipes/card.css';
import SaveButton from '../../UI/saveButton/saveButton';
import { RecipeTypes } from '../../store/types/recipes.types';

export type Obj = {
  targetElem?: any;
  style?: any;
  param: boolean;
};

interface Card {
  el: RecipeTypes | PlaceElement;
  obj: Obj;
  children?: ReactNode;
}

const Card: React.FunctionComponent<Card> = ({ el, obj, children }) => {
  return (
    <div className={styles.card} style={obj.style ? { marginRight: `${obj.style.margin}px` } : undefined}>
      <div style={{ backgroundImage: `url(${require(`../../${el.image}`)}` }} className={styles.image} />
      {obj.param ? <SaveButton el={el} targetElem={obj.targetElem} /> : null}
      {children}
    </div>
  );
};
export default Card;
