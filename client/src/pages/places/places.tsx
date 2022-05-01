import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlaceElement, StoreState } from '../../store/types';
import styles from './places.module.scss';
import { dataAboutPlaces, dataAboutPlacesSortedByPlace } from '../../store/modules/places/places.actions';
import SortMenu from '../../UI/sortMenu/sortMenu';
import Card from '../../components/card/card';

const Places: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const places = useSelector((state: StoreState) => state.places.arrOfPlaces);
  useEffect(() => {
    dispatch(dataAboutPlaces());
  }, []);

  const sortDataAboutPlaces = (e: { target: { textContent: string } }) => {
    dispatch(dataAboutPlacesSortedByPlace(e.target.textContent.toLocaleLowerCase()));
  };
  const objForSortMenu = {
    arr: ['все', 'рестораны', 'кафе', 'магазины'],
    sortFunc: sortDataAboutPlaces,
  };

  return (
    <div className={styles.placesWrapper}>
      <div className={styles.placesBanner}>
        <h3 className={styles.bannerTitle}>Магазины, рестораны, кафе подходящие именно тебе</h3>
        <div className={styles.image}></div>
        <div className={`${styles.rectangles} ${styles.red}`} />
        <div className={`${styles.rectangles} ${styles.darkRed}`} />
        <div className={`${styles.rectangles} ${styles.pink}`} />
      </div>
      <div className={styles.secondWindow}>
        <div className={styles.circleLeaves} />
        <div className={styles.secondWindowText}>
          <h3>Места</h3>
          <p>
            Не можешь найти, где купить эко-продукты, продукты без лактозы, глютена или с низким содержанием углеводов? Тогда ты попал в нужное место.
          </p>
        </div>
        <div className={styles.strawberry} />
      </div>
      <SortMenu obj={objForSortMenu} />
      <div className={styles.places}>
        {places.map((el: PlaceElement, i) => (
          <Card el={el} obj={{ param: false, style: { margin: 70 } }} key={i}>
            <span className={styles.workingHours}>{el.workingHours}</span>
            <span className={styles.title}>{el.title}</span>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Places;
