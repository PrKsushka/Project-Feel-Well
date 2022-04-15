import styles from '../../pages/recipes/recipes.module.scss';
import { Link } from 'react-router-dom';
import links from '../../constants/links';
import React, { MouseEventHandler } from 'react';
import { ProductElement } from '../../store/types';
type Obj = {
  clickFunc: any;
  param: boolean;
};
interface Card {
  el: ProductElement;
  obj: Obj;
}

const Card: React.FunctionComponent<Card> = ({ el, obj }) => {
  return (
    <div className={styles.card}>
      <div style={{ backgroundImage: `url(${require(`../../${el.image}`)}` }} className={styles.image} />
      {obj.param ? <div className="save" onClick={obj.clickFunc(el)} /> : null}
      <Link to={`${links.recipes}/${el._id}`} className={styles.textLink}>
        <div className={styles.mainText}>
          <h3>{el.name}</h3>
          <div className={styles.ratingSec}>
            <p>{el.time}</p>
            <p>{el.rating}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default Card;
