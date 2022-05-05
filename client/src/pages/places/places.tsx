import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlaceElement, StoreState } from '../../store/types';
import styles from './places.module.scss';
import { dataAboutPlaces, getDataSortedByCityOrPlace } from '../../store/modules/places/places.actions';
import SortMenu from '../../UI/sortMenu/sortMenu';
import Card from '../../components/card/card';
import SelectGroup from '../../UI/selectGroup/selectGroup';
import Warn from '../../components/warn/warn';
import { placesDetailsModalActivation } from '../../store/modules/modals/modal.actions';
import ModalForPlacesDetails from '../../components/modals/module/modalForPlacesDetails/modalForPlacesDetails';

const Places: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const currentElement = useRef() as React.MutableRefObject<PlaceElement>;
  const places = useSelector((state: StoreState) => state.places.arrOfPlaces);
  const [currentPlace, setCurrentPlace] = useState<string>('');
  const [currentCity, setCurrentCity] = useState<string>('');

  useEffect(() => {
    dispatch(dataAboutPlaces());
  }, []);
  useEffect(() => {
    dispatch(getDataSortedByCityOrPlace(currentPlace, currentCity));
  }, [currentCity, currentPlace]);

  const openModalForDetails = (el: PlaceElement) => {
    currentElement.current = el;
    dispatch(placesDetailsModalActivation(true));
  };
  const sortDataAboutPlaces = (e: any) => {
    setCurrentPlace(e.target.textContent.toLocaleLowerCase());
  };
  const sortDataByCity = (e: any) => {
    setCurrentCity(e.target.value);
  };
  const objForSortMenu = {
    arr: ['все', 'рестораны', 'кафе', 'магазины'],
    sortFunc: sortDataAboutPlaces,
  };

  const objForSelectGroup = {
    onChangeFunc: sortDataByCity,
    arr: ['все', 'Минск', 'Солигорск', 'Гродно', 'Брест', 'Могилев'],
  };
  const modalForDetails = useSelector((state: StoreState) => state.modal.placesDetails);
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
      <div className={styles.sort}>
        <SelectGroup obj={objForSelectGroup} />
        <SortMenu obj={objForSortMenu} />
      </div>
      <div className={styles.places}>
        {places.length > 0 ? (
          places.map((el: PlaceElement, i) => (
            <Card el={el} obj={{ param: false, style: { margin: 70 } }} key={i}>
              <div className="cardMainText">
                <h3 className="cardTitle" onClick={() => openModalForDetails(el)}>
                  {el.name}
                </h3>
                <span className={styles.workingHours}>{el.workingHours}</span>
                <span className={styles.title}>{el.title}</span>
              </div>
            </Card>
          ))
        ) : (
          <Warn />
        )}
      </div>
      {modalForDetails ? <ModalForPlacesDetails obj={currentElement} /> : null}
    </div>
  );
};
export default Places;
